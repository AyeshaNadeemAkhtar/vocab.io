// export default function Test() {
//     return (
//         <div className="test-card">
//             <div className="exercise-label">
//                   <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M3 4h12M3 7.5h12M3 11h8M3 14.5h6" stroke="#FF4D6D" strokeWidth="1.5" strokeLinecap="round"/></svg>
//                     Test
//             </div>
//             <div className="content">
//                 <div className="header">
//                     <div className="icons">
//                         <h3>Term</h3>
//                         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#1A1A1E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                                     <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
//                                     <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
//                                     <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
//                         </svg>
//                     </div>
//                     <p>10 of 20</p>
//                 </div>
//                 <p className="question">How is it going?</p>
//                 <p>Choose an answer</p>
//                 <div className="mcqs">
//                     <button>Come sta?</button>
//                     <button>Come Stai?</button>
//                     <button>Come Va?</button>
//                     <button>Buonasera</button>
//                 </div>
//             </div>
//         </div>
//     )
// }

import { useState } from "react"
import { useLearnSession } from "../hooks/useLearnSession.js"
import { useAnswerFeedback } from "../hooks/useAnswerFeedback.js"

export default function Test({ preview = false }) {
    // preview mode — hardcoded fake question, no real data, no clicks work
    // used only for the small card shown on the Exercises overview page
    if (preview) {
        return (
            <div className="test-card">
                <div className="exercise-label">Test</div>
                <div className="content">
                    <p className="question">How is it going?</p>   {/* fake prompt */}
                    <div className="mcqs">
                        <button>Come sta?</button><button>Come Stai?</button>
                        <button>Come Va?</button><button>Buonasera</button>
                        {/* fake options, purely decorative here */}
                    </div>
                </div>
            </div>
        )
    }

    // ↓ real game logic, only runs when preview is false ↓

    const [index, setIndex] = useState(0)
    // which question we're on — owned here, shared between both hooks below

    const { questions, loading } = useLearnSession('mcq')
    // fetch this user's latest session + keywords, generate questions via
    // Flask, keep only the ones Flask tagged as type 'mcq'

    const { current, feedback, checkAnswer, handleNext } = useAnswerFeedback(questions, index, setIndex)
    // shared answer-checking logic — same hook MCQs.jsx uses, so grading
    // behavior stays identical across both games

    if (loading) return <div className="test-card"><p>Loading...</p></div>
    // still fetching — avoid rendering broken content before data arrives

    if (!current) return <div className="test-card"><p>Session complete! 🎉</p></div>
    // index has run past the last available question — nothing left to show

    return (
        <div className="test-page">
            <div className="test-card">
                <div className="exercise-label">Test</div>

                <div className="content">
                    <p className="question">{current.prompt}</p>
                    {/* the real question text for this specific word */}

                    <div className="mcqs">
                        {current.options.map((option, i) => (
                            // one button per option, however many this question has
                            <button
                                key={i}
                                // required unique identifier for React's list tracking

                                disabled={feedback !== null}
                                // locks every button once the user has already answered

                                className={feedback && option === current.answer ? 'correct' : ''}
                                // highlights the right answer, but only after checking

                                onClick={() => checkAnswer(option)}
                                // grades this specific button's text as the chosen answer
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                </div>

                {feedback && (
                    // this whole banner only appears once an answer's been submitted
                    <div className={`learn-feedback ${feedback}`}>
                        {/* becomes "learn-feedback correct" or "learn-feedback wrong" */}

                        <p>{feedback === 'correct' ? '✔ Correct!' : `✘ Answer: ${current.answer}`}</p>
                        {/* success message, or the correct answer if they got it wrong */}

                        <button onClick={handleNext}>Next</button>
                        {/* saves the result to Supabase, resets state, moves forward */}
                    </div>
                )}
            </div>
        </div>
    )
}