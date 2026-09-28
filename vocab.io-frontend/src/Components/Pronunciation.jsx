// export default function Pronunciation() {
//     return (
//         <div className="pronunciation-card">
//             <div className="exercise-label">
//                 <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="6" y="2" width="6" height="8" rx="3" stroke="#0099FF" strokeWidth="1.5"/><path d="M3 9a6 6 0 0 0 12 0" stroke="#0099FF" strokeWidth="1.5" strokeLinecap="round"/><path d="M9 15v1.5" stroke="#0099FF" strokeWidth="1.5" strokeLinecap="round"/><path d="M13 4.5c.8.5 1.5 1.5 1.5 2.5" stroke="#0099FF" strokeWidth="1.3" strokeLinecap="round"/><path d="M15 3c1.2 1 2 2.5 2 4" stroke="#0099FF" strokeWidth="1.3" strokeLinecap="round"/></svg>
//                     Pronunciation
//             </div>
//             <div className="content">
//                 <div>
//                     <p>See you tomorrow.</p>
//                     <button className="speak-button">
//                         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                             <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
//                             <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
//                             <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
//                        </svg>
//                      Push to speak
//                     </button>
//                 </div>
//                 <div>
//                     <p>Ciao! Mi Chiamo Ayesha. Non c'e male</p>
//                     <button className="speak-button">
//                         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                             <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
//                             <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
//                             <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
//                        </svg>
//                      Push to speak
//                     </button>
//                 </div>
//                 <div>
//                     <p>Buongiorno Dottor Rossi</p>
//                     <button className="speak-button">
//                         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                             <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
//                             <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
//                             <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
//                        </svg>
//                      Push to speak
//                     </button>
//                 </div>
//                 <div>
//                     <div className="exercise-4">
//                         <button className="speak-button microphone-button">
//                             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                                 <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
//                                 <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
//                                 <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
//                         </svg>
//                         </button>
//                         <input type="text" />
//                     </div>
//                     <button className="speak-button">Check</button>
//                 </div>
//             </div>
//         </div>
//     )
// }

import { useState } from "react"
import { useLearnSession } from "../hooks/useLearnSession.js"
import { useAnswerFeedback } from "../hooks/useAnswerFeedback.js"

export default function Pronunciation({ preview = false }) {
    // preview mode — static, non-functional card for the Exercises
    // overview page; button doesn't actually speak, input isn't wired
    if (preview) {
        return (
            <div className="pronunciation-card">
                <div className="exercise-label">Pronunciation</div>
                <div className="content">
                    <div className="exercise-4">
                        <button className="speak-button microphone-button">🔊</button>
                        {/* no onClick — purely decorative in preview */}
                        <input type="text" placeholder="Say it out loud" />
                        {/* just a placeholder hint, no real state behind it */}
                    </div>
                </div>
            </div>
        )
    }

    // ↓ real game logic, only runs when preview is false ↓

    const [index, setIndex] = useState(0)
    // which question we're on — owned here, shared between both hooks

    const { questions, loading } = useLearnSession('pronunciation')
    // fetch this user's latest session + keywords, generate questions via
    // Flask, keep only the ones tagged type 'pronunciation'

    const { current, answer, setAnswer, feedback, checkAnswer, handleNext } = useAnswerFeedback(questions, index, setIndex)
    // same shared grading logic as Translation — gives us answer/setAnswer
    // since this game also needs a text input (what the user typed after
    // hearing the word)

    const handleSpeak = () => {
        const utterance = new SpeechSynthesisUtterance(current.audioWord || current.prompt)
        // reads current.audioWord if it exists, otherwise falls back to
        // current.prompt — a safety net in case the field name differs
        // slightly depending on how Flask built this question

        speechSynthesis.speak(utterance)
        // hands it to the browser's built-in text-to-speech engine
    }

    if (loading) return <div className="pronunciation-card"><p>Loading...</p></div>
    // still fetching — avoid rendering before data arrives

    if (!current) return <div className="pronunciation-card"><p>Session complete! 🎉</p></div>
    // ran out of pronunciation-type questions — nothing left to show

    return (
        <div className="pronunciation-card">
            <div className="exercise-label">Pronunciation</div>

            <div className="content">
                <div className="exercise-4">
                    <button className="speak-button microphone-button" onClick={handleSpeak}>
                        🔊
                    </button>
                    {/* now wired — clicking actually reads the word aloud */}

                    <input
                        type="text"
                        value={answer}
                        // controlled input — box reflects the `answer` state

                        onChange={(e) => setAnswer(e.target.value)}
                        // updates `answer` on every keystroke, user types what they heard
                    />

                    <button className="check-button" onClick={() => checkAnswer(answer)}>
                        Check
                    </button>
                    {/* grades typed answer against current.answer */}
                </div>
            </div>

            {feedback && (
                // only shows after Check has been clicked at least once
                <div className={`learn-feedback ${feedback}`}>
                    {/* becomes "learn-feedback correct" or "learn-feedback wrong" */}

                    <p>{feedback === 'correct' ? '✔ Correct!' : `✘ Answer: ${current.answer}`}</p>
                    {/* success message, or the correct answer if wrong */}

                    <button onClick={handleNext}>Next</button>
                    {/* saves result to Supabase, clears input, advances */}
                </div>
            )}
        </div>
    )
}