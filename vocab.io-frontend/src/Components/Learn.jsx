import { useState, useEffect } from "react"
import { supabase } from "../lib/supabase-client.js"
import { recordFeedback } from "../utils/progress.js"


export default function Learn({ preview = false }) {
    const [questions, setQuestions] = useState([])
    const [index, setIndex] = useState(0)
    const [answer, setAnswer] = useState('')
    const [feedback, setFeedback] = useState(null)
    const [loading, setLoading] = useState(true)
 
    /* Session is basically paragraph that we are going to fetch */
    useEffect(() => {
        if (preview) {
          setQuestions([{
            type: "translation",
            id: "preview",
            prompt: "cane",
            translation: "dog"
          }])
          setLoading(false)
          return
        }

        /* useEffect can't be async bcz it doesn't expect a promise to
        be returned so we make a separate function inside */
        const loadSession = async() => {
            const { data: { user }} = await supabase.auth.getUser()

            const { data: session, error: sessionError} = await supabase
                .from("sessions")
                .select("*")
                .eq("user_id", user.id)
                .order("created_at", { ascending: false }) /* Write the most recent one at the top */
                .limit(1) /* Only want the top one row */
                .single() /* as only object {} not array of object [{}] */

                if (sessionError) {
                    console.error("No session found", sessionError.message)
                    setLoading(false)
                    return
                }

                /* Get the session's keywords */
                const { data: keywords, error: keywordsError } = await supabase
                    .from("keywords")
                    .select("id, word, translation")
                    .eq("session_id", session.id)

                if (keywordsError) {
                    console.error("Failed to fetch keywords: ", keywordsError.message)
                    setLoading(false)
                    return
                }

                try {
                // Send a POST request to our Flask backend's /api/learn-session route,
                // and pause here until the server responds
                const response = await fetch('http://127.0.0.1:5000/api/learn-session', {
                    method: 'POST',                                 
                    headers: { 'Content-Type': 'application/json' }, 
                    body: JSON.stringify({                           // convert this JS object into a JSON string to send over the network
                    keywords,                                      
                    original_text: session.source_text,         
                    language: session.language                   
                    })
                })

                // response.json() reads the response body and parses it from JSON text
                // back into a real JS object — also needs await, since reading the body
                // is itself an async operation
                const data = await response.json()

                // data.questions is the array Flask built (mcq/translation/pronunciation
                // questions) — store it in state so the component can render it
                setQuestions(data.questions)

                } catch (err) {
                console.error("Failed to load learn session:", err)

                } finally {
                // Runs no matter what — success or failure — so the loading
                // spinner always turns off and the user isn't stuck waiting forever
                setLoading(false)
                }

        }   // end of the loadSession function

            loadSession()   
                                
    }, [])            // dependency empty array = only run this whole useEffect once,
                                // right when the component first mounts
      
    
    // if questions = [{type: "mcq", ...}, {type: "translation", ...}]
    // and index = 0, then current = {type: "mcq", ...} — the first question.
    const current = questions[index]

    // A helper function that "cleans up" a string so two answers can be
    // fairly compared, even if the user typed things slightly differently
    // than expected (extra spaces, wrong capitalization, or accent marks).
    const normalize = (str) => {
      return   str
        .trim()                              // removes leading/trailing spaces
                                            // example: "  ciao  " → "ciao"

        .toLowerCase()                       // makes everything lowercase, so
                                            // "Ciao" and "ciao" count as the same
                                            // example: "CIAO" → "ciao"

        .normalize("NFD")                    // splits accented characters into
                                            // a base letter + a separate accent mark
                                            // example: "perché" → "perche" + "´" (as separate pieces internally)
        
        // /regex pattern/ [the characters] g is global means check whole string
        .replace(/[\u0300-\u036f]/g, "")     // removes those separated accent marks entirely
                                          // example: "perche" + accent-mark → "perche" (clean, no accent)
    }
   
    // userInput = "PERCHE " → normalize → "perche"
    //          current.answer = "perché"       → normalize → "perche"
    //          → these match, so isCorrect = true
    const checkAnswer = (userInput) => {
        const isCorrect = normalize(userInput) === normalize(current.answer)
        setFeedback(isCorrect ? 'correct' : 'wrong')   // store the result so the UI can show it
    }

    // Runs when the user moves to the next question
    const handleNext = async () => {
    // feedback === 'correct' becomes a plain true/false to pass along
    // Example: feedback = "correct" → true, feedback = "wrong" → false
    await recordFeedback(current.id, feedback === 'correct')

    setAnswer('')       // clear the text box — example: "perche" → ""
    setFeedback(null)   // clear the correct/wrong indicator for the next question
    setIndex(i => i + 1)   // move forward — example: index 3 → 4
    }

    // Reads the current word out loud using the browser's built-in
    const handleSpeak = () => {
        const utterance = new SpeechSynthesisUtterance(current.audioWord)
        speechSynthesis.speak(utterance)
    }

    // While the session is still being fetched from Supabase/Flask,
    // show a placeholder instead of a blank or broken page.
    // Example: loading = true right after the page opens → shows this
    if (loading) {
    return (
        <div className="learn-page">
        <p>Loading session...</p>
        </div>
    )
    }

    // `current` is questions[index] — if index has moved past the last
    // question, questions[index] is undefined, meaning there's nothing
    // left to show.
    if (!current) {
    return (
        <div className="learn-page">
        <p>Session complete! 🎉</p>
        </div>
    )
    }


    const content = (
      <div className="learn-card">   {/* Outer wrapper — holds the whole question card, styling from your CSS */}

            <div className="exercise-label">   {/* Small header row with icon + "Learn" text, same every question */}
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 2L2 5.5l7 3.5 7-3.5L9 2z" stroke="#0099FF" strokeWidth="1.5" strokeLinejoin="round"/>
                <path d="M2 5.5v5M16 5.5v5" stroke="#0099FF" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M5 8.5v3.5a4 4 0 0 0 8 0V8.5" stroke="#0099FF" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                <p>Learn</p>   
            </div>

        {current.type === 'mcq' && (
          <div className="mcqs">   
            <p>{current.prompt}</p>   {/* The question text itself, pulled from the current question object */}

            <div className="mcqs-options">   
              {current.options.map((option, i) => (
                /* .map() loops through every string in current.options,
                  `opt` = the option text itself, `i` = its position (0, 1, 2...) */
                <button
                  key={i}
                  /* key — React requires a unique identifier per item in a list,
                    so it can track which button is which across re-renders */

                  disabled={feedback !== null}
                  /* disabled — turns the button unclickable once feedback exists,
                    i.e. after the user has already answered this question */

                  className={feedback && option === current.answer ? 'correct' : ''}
                  /* className — conditionally adds the 'correct' CSS class,
                    but ONLY once feedback is set AND this specific option
                    happens to be the right answer — highlights it green (or
                    whatever your CSS defines) after checking */

                  onClick={() => checkAnswer(option)}
                  /* onClick — when clicked, runs checkAnswer with THIS button's
                    specific option text as the user's chosen answer */
                >
                  <span>{i + 1}.</span>   {/* Shows "1.", "2.", "3." — i starts at 0, so +1 makes it human-numbered */}
                  {option}   {/* The actual answer text shown on the button */}
                </button>
              ))}
            </div>
          </div>
        )}

        
        {current.type === 'translation' && (
          <div className="writing-exercises">   
            <div className="writing-1">  
              <h2>{current.prompt}</h2>   {/* The word/phrase to translate, shown as the heading */}
              <p>Your answer:</p>   
              <input
                type="text"

                value={answer}
                /* value — makes this a "controlled input": the box always shows
                  whatever is currently stored in the `answer` state variable */

                onChange={(e) => setAnswer(e.target.value)}
                /* onChange — fires on every keystroke; e.target.value is
                  whatever the input currently contains, and we save it into
                  state so `value` above stays in sync as the user types */
              />
              <button className="check-button" onClick={() => checkAnswer(answer)}>
                {/* onClick — passes the user's typed answer into checkAnswer for grading */}
                Check
              </button>
            </div>
          </div>
        )}

        {current.type === 'pronunciation' && (
          <div className="writing-exercises">
            <div className="writing-2">   
              <button className="check-button voice-button" onClick={handleSpeak}>
                {/* onClick — plays the target word aloud using text-to-speech */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#FFF0F3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                  <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
                </svg>
              </button>
              <input
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
              />
              <button className="check-button" onClick={() => checkAnswer(answer)}>
                Check
              </button>
            </div>
          </div>
        )}

        {feedback && (
          <div className={`learn-feedback ${feedback}`}>
            {/* className uses a template string to combine two classes:
              "learn-feedback" (always) + either "correct" or "wrong"
              (whatever `feedback` currently holds) — e.g. "learn-feedback correct" */}

            <p>{feedback === 'correct' ? '✔ Correct!' : `✘ Answer: ${current.answer}`}</p>

            <button onClick={handleNext}>Next</button>
            {/* onClick — records this word's result, resets state, and
              advances to the next question in the array */}
          </div>
        )}

              </div>
    )

    if (preview) return content



  return (
    <div className="learn-page">
        {content}
    </div>
          )
    
}