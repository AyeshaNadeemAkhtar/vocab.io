// export default function MCQs() {
//     return (
//         <div className="mcqs-card">
//             <div className="exercise-label">
//                 <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="4" cy="5" r="2" stroke="#FF4D6D" strokeWidth="1.5"/><circle cx="4" cy="5" r="0.8" fill="#FF4D6D"/><path d="M8 5h7" stroke="#FF4D6D" strokeWidth="1.5" strokeLinecap="round"/><circle cx="4" cy="9.5" r="2" stroke="#FF4D6D" strokeWidth="1.5"/><path d="M8 9.5h7" stroke="#FF4D6D" strokeWidth="1.5" strokeLinecap="round"/><circle cx="4" cy="14" r="2" stroke="#FF4D6D" strokeWidth="1.5"/><path d="M8 14h7" stroke="#FF4D6D" strokeWidth="1.5" strokeLinecap="round"/></svg>
//                 MCQ's
//             </div>

//             <div className="content">
//                 <div className="mcqs-type">
//                     <p>I met Professor Melani in Evening. What should i say to her?</p>
//                     <div className="mcqs-buttons">
//                         <button>Buongiorno</button>
//                         <button>Buonanotte</button>
//                         <button>Buonasera</button>
//                         <button>Come va</button>
//                     </div>
//                 </div>
//                 <div>
//                     <p>My name is Ayesha.</p>
//                     <div className="mcqs-buttons">
//                         <button>Mi Chiamo Ayesha</button>
//                         <button>Come va Ayesha</button>
//                         <button>Come stai Ayesha</button>
//                         <button>Buongiorno Ayesha</button>
//                     </div>
//                 </div>
//                 <div>
//                     <div className="audio-mcqs-option">
//                         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#0099FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                                 <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
//                                 <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
//                                 <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
//                         </svg>
//                         <p>Answer the questio from audio</p>
//                     </div>
//                     <div className="mcqs-buttons">
//                         <button>Abito a Roma</button>
//                         <button>Non Abito</button>
//                         <button>Non lo so</button>
//                         <button>Lei Viva a Roma</button>
//                     </div>
//                 </div>
//                 <div>
//                     <p>Cosa hai mangiato a colazione?</p>
//                     <div className="mcqs-buttons">
//                         <button>Ho dormito</button>
//                         <button>Sono andato a fare una passeggiata</button>
//                         <button>Ho Mangiato pane e uova</button>
//                         <button>non avevo fame</button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }


import { useState } from "react"
import { useLearnSession } from "../hooks/useLearnSession.js"
import { useAnswerFeedback } from "../hooks/useAnswerFeedback.js"

export default function MCQs({ preview = false }) {
    // preview mode — shows fake hardcoded data, no Supabase/Flask calls,
    // used for the small non-interactive card on the Exercises page
    if (preview) {
        return (
            <div className="mcqs-card">
                <div className="exercise-label">MCQ's</div>
                <div className="content">
                    <div>
                        <p>cane</p>   {/* fake question, just for display */}
                        <div className="mcqs-buttons">
                            <button>dog</button><button>cat</button>
                            <button>bird</button><button>fish</button>
                            {/* fake options, none of these are clickable/functional */}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    // ↓ everything below only runs when preview is false (the real game) ↓

    const [index, setIndex] = useState(0)
    // tracks which question we're currently on — owned HERE, not inside
    // the hooks, since both hooks below need to read/update the same index

    const { questions, loading } = useLearnSession('mcq')
    // fetches this user's latest session, keywords, generates questions
    // via Flask, and filters down to ONLY the 'mcq'-type ones

    const { current, feedback, checkAnswer, handleNext } = useAnswerFeedback(questions, index, setIndex)
    // handles "what's the current question", "did they get it right",
    // and "move to the next one" — shared logic, same hook other games will use

    if (loading) return <div className="mcqs-card"><p>Loading...</p></div>
    // still fetching — show a placeholder instead of a broken/empty page

    if (!current) return <div className="mcqs-card"><p>Session complete! 🎉</p></div>
    // ran out of mcq-type questions (index moved past the end) — done

    return (
        <div className="mcqs-page">
            <div className="mcqs-card">
                <div className="exercise-label">MCQ's</div>

                <div className="content">
                    <div>
                        <p>{current.prompt}</p>   {/* the actual question text for this round */}

                        <div className="mcqs-buttons">
                            {current.options.map((option, i) => (
                                // loop through however many options this question has
                                <button
                                    key={i}
                                    // React needs a unique key per list item

                                    disabled={feedback !== null}
                                    // lock all buttons once an answer's been checked

                                    className={feedback && option === current.answer ? 'correct' : ''}
                                    // highlight the correct one green, but only after checking

                                    onClick={() => checkAnswer(option)}
                                    // grade this specific option as the user's pick
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {feedback && (
                    // only show this banner once the user has answered something
                    <div className={`learn-feedback ${feedback}`}>
                        {/* className becomes "learn-feedback correct" or "learn-feedback wrong" */}

                        <p>{feedback === 'correct' ? '✔ Correct!' : `✘ Answer: ${current.answer}`}</p>
                        {/* show success message, or reveal the right answer if wrong */}

                        <button onClick={handleNext}>Next</button>
                        {/* records the result, resets state, advances to next question */}
                    </div>
                )}
            </div>
        </div>
    )
}