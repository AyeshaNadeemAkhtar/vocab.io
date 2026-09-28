import { useState, useEffect } from "react"
import { supabase } from "../lib/supabase-client.js"
import { recordFeedback } from "../utils/progress.js"

export default function Flashcard({ className = "flashcards", preview = false}) {

    const [wordBank, setWordBank] = useState([])
    const [loading, setLoading] = useState(true) /* How used? */
    const [index, setIndex] = useState(0) // How used?
    const [flipped, setFlipped] = useState(false)

    useEffect(() => {

        if (preview) {
            setWordBank([{word: "ciao", translation: "hello"}])
            setLoading(false)
            return
        }
        /* useEffect can't be async bcz async returns a promise, however
        useEffect expects a function, so we write a function and then
        calls it */
        const loadWords = async () => {
            const { data: { user } } = await supabase.auth.getUser()

            if (!user) {
                setLoading(false)
                return
            }

            const { data, error } = await supabase
                .from("keywords")
                .select("id, word, translation")
                .eq("user_id", user.id)
                .order("created_at", { ascending: false })

            if (error) {
                console.error("Failed to fetch keywords: ", error.message)
            } else {
                setWordBank(data)
            }
            setLoading(false)
        }

        /* Call the same function */
        loadWords()
    }, [])

    
    const handleNext = () => {
        /* Show the word side of card */
        setFlipped(false)
        /* (0 => 0 + 1 % 4) => 1 Moves from 0 to next index which is 1 */
        setIndex((prev) => (prev + 1) % wordBank.length)
    }

    const handlePrev = () => {
        setFlipped(false)

        /* (0 - 1 + 4) = 3 % 4 = 3 Moves backwards from 0 to last index 3 */
        setIndex((prev) => (prev - 1 + wordBank.length) % wordBank.length)
    }

    const handleFlip = () => setFlipped(!flipped)

    const handleSpeak = (e) => {
        e.stopPropagation() /* stop the click from bubbling upto flashcard div, so that it don't flip */
        
        /* Create a speech request using browser's web speech API */
        const utterance = new SpeechSynthesisUtterance(current.word)

        /* Hands it to browser speech engine to read it aloud */
        speechSynthesis.speak(utterance)
    }

    /* If user say "I know it" */
    const handleFeedback = async (wasCorrect) => {
        /* Word is true so send its id and wasCorrect = true */
         await recordFeedback(current.id, wasCorrect)
    
         /* Spaced Repitition in case of incorrect word */
         if (!wasCorrect) {
            /* Move the incorrect word to few positions ahead so it shows up soon */
            const word = wordBank[index]

            const newBank = [...wordBank]
            newBank.splice(index, 1) // remove the current word from it's index
            newBank.splice(index + 3, 0, word) // remove nothing and from 3 places to the current index, place the word which is incorrect.
            setWordBank(newBank)
        }

         handleNext() // Move to the next word
    }

    /* If words are not yet loaded , Do you need it ? */
    if (loading) {
        return (
            // DO YOU NEED THE SIDEBAR HERE? 
             <div className="flashcards-page"> 
                <div className="flashcards-main">
                    <p>Loading your words...</p>
                </div>
            </div>
        )
    }

    /* If there are no words yet */
    if (wordBank.length === 0) {
    return (
      <div className="flashcards-page">
        <div className="flashcards-main">
          <p>No words yet — extract some keywords on the Input Text page first.</p>
        </div>
      </div>
    )
  }

    const current = wordBank[index] // just the index of the word in array

    const content = (
        <div className={className}>
                <div className="header">
                    <div className="exercise-name">
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="1" y="4" width="13" height="10" rx="2" stroke="#FF4D6D" strokeWidth="1.5"/>
                            <rect x="4" y="2" width="13" height="10" rx="2" stroke="#FF4D6D" strokeWidth="1.5" fill="white"/>
                            <path d="M8 6h5M8 9h3" stroke="#FF4D6D" strokeWidth="1.5" strokeLinecap="round"/>
                        </svg>
                        <p>Flashcards</p>   
                    </div>

                    {/* Speak button */}
                    <svg onClick={handleSpeak} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#0099FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                        <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
                        <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
                    </svg>
                </div>

                    {/* Word itself and translation  */}
                <h2 onClick={handleFlip}>{ flipped ? current.translation : current.word }</h2>

                <div className="footer">
                    {/* Moves backward */}
                    <svg onClick={handlePrev} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="#0099FF">
                        <path d="M11.7 3.3a1 1 0 0 1 0 1.4L5.83 10.5H20a1 1 0 0 1 0 2H5.83l5.87 5.8a1 1 0 0 1-1.4 1.4l-7.6-7.5a1 1 0 0 1 0-1.4l7.6-7.5a1 1 0 0 1 1.4 0z"/>
                    </svg>
                    <span>{ index + 1} /{wordBank.length }</span>

                    {/* Moves forward */}
                    <svg onClick={handleNext} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="#0099FF">
                        <path d="M12.3 3.3a1 1 0 0 0 0 1.4l5.87 5.8H4a1 1 0 0 0 0 2h14.17l-5.87 5.8a1 1 0 0 0 1.4 1.4l7.6-7.5a1 1 0 0 0 0-1.4l-7.6-7.5a1 1 0 0 0-1.4 0z"/>
                    </svg>
                    <svg onClick={handleFlip} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#0099FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
                        <polyline points="3 3 3 8 8 3"/>
                    </svg>
                </div>

                <div className="feedback">
                    {/* These are default true and false values in case of either buttons */}
                    <button className="feedback-btn no" onClick={() => handleFeedback(false)}>Still Learning</button>
                    <button className="feedback-btn yes" onClick={() => handleFeedback(true)}>I knew it</button>
                </div>
        </div>
    )

    if (preview) return content /* Same content without the styles of wrapper that cause empty space */
    return (
         <div className="flashcard-page">
            {content}
        </div>
    )
}