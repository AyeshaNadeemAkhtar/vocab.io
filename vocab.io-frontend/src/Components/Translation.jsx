// export default function Translation() {
//     return (
//         <div className="translation-card">
//             <div className="exercise-label">
//                     <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M2 4h8M6 2v2M4 4c0 3 2 5 5 6" stroke="#FF4D6D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M8 9c1 1 3 2 4 2" stroke="#Ff4d6d" strokeWidth="1.5" strokeLinecap="round"/><path d="M10 14l2-5 2 5M11 12.5h2" stroke="#FF4d6d" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M16 4H8l-1 3" stroke="#FF4d6d" strokeWidth="1.5" strokeLinecap="round"/></svg>
//                     Translation
//             </div>

//             <div className="content">
//                 <div className="translation-text">
//                     <p className="statement">Sebbene il professore avesse spiegato chiaramente l'argomento durante la lezione, molti studenti non sono riusciti a superare l'esame finale, che si è rivelato molto più difficile del previsto.</p>
//                     <p className="translated">Although the professor had clearly explained the topic during the lesson, many students were unable to pass the final exam, which proved to be much more difficult than expected.</p>
//                 </div>

//                 <div className="translation-text">
//                     <p className="statement">Se avessi saputo in anticipo che il treno avrebbe subito un ritardo così lungo a causa di un guasto tecnico, sarei sicuramente andato a prendere i miei genitori all'aeroporto con la macchina.</p>
//                     <p className="translated">f I had known in advance that the train would be delayed for so long due to a technical breakdown, I certainly would have gone to pick up my parents at the airport with the car.</p>
//                 </div>

//                 <div className="translation-text">
//                     <p className="statement">Dopo aver trascorso diverse settimane a pianificare il viaggio perfetto attraverso le città più affascinanti della Toscana, ho finalmente deciso di prenotare un piccolo agriturismo circondato da vigneti.</p>
//                     <p className="translated">After spending several weeks planning the perfect trip through the most fascinating cities of Tuscany, I have finally decided to book a small farmhouse surrounded by vineyards</p>
//                 </div>
                
//             </div>
//         </div>
//     )
// }

// Old static version, kept commented out for reference — this was the
// original hardcoded prototype before the real dynamic data was wired in
// export default function Translation() {
//     ... (unchanged, staying commented out)
// }

import { useState } from "react"
import { useLearnSession } from "../hooks/useLearnSession.js"
import { useAnswerFeedback } from "../hooks/useAnswerFeedback.js"

export default function Translation({ preview = false }) {
    // preview mode — small hardcoded card, no real fetching, no
    // interactivity, used only for the Exercises overview page
    if (preview) {
        return (
            <div className="translation-card">
                <div className="exercise-label">Translation</div>
                <div className="translation-text">
                    <div className="statement">cane</div>   {/* fake word */}
                    <div className="translated">dog</div>   {/* fake translation */}
                </div>
            </div>
        )
    }

    // ↓ real game logic, only runs when preview is false ↓

    const [index, setIndex] = useState(0)
    // which question we're currently on — owned here, passed into both hooks

    const { questions, loading } = useLearnSession('translation')
    // fetch this user's latest session + keywords, generate questions via
    // Flask, keep only the ones tagged type 'translation'

    const { current, answer, setAnswer, feedback, checkAnswer, handleNext } = useAnswerFeedback(questions, index, setIndex)
    // same shared answer-checking logic used by MCQs/Test — here it also
    // gives us `answer`/`setAnswer` since this game needs a text input,
    // unlike MCQs/Test which only need button clicks

    if (loading) return <div className="translation-card"><p>Loading...</p></div>
    // still fetching — avoid rendering broken/empty content early

    if (!current) return <div className="translation-card"><p>Session complete! 🎉</p></div>
    // ran out of translation-type questions — nothing left to show

    return (
        <div className="translation-card">
            <div className="exercise-label">Translation</div>

            <div className="writing-1">
                <h2>{current.prompt}</h2>
                {/* the word/phrase to translate, shown as the heading */}

                <p>Your answer:</p>   {/* static label above the input */}

                <input
                    type="text"
                    value={answer}
                    // controlled input — box always reflects the `answer` state

                    onChange={(e) => setAnswer(e.target.value)}
                    // updates `answer` on every keystroke
                />

                <button className="check-button" onClick={() => checkAnswer(answer)}>
                    Check
                </button>
                {/* grades whatever the user typed against current.answer */}
            </div>

            {feedback && (
                // only shows once the user has clicked Check at least once
                <div className={`learn-feedback ${feedback}`}>
                    {/* becomes "learn-feedback correct" or "learn-feedback wrong" */}

                    <p>{feedback === 'correct' ? '✔ Correct!' : `✘ Answer: ${current.answer}`}</p>
                    {/* success message, or reveals the correct answer if wrong */}

                    <button onClick={handleNext}>Next</button>
                    {/* saves result to Supabase, clears input, advances forward */}
                </div>
            )}
        </div>
    )
}