import { useState } from "react"
import { recordFeedback } from "../utils/progress.js"

// Another custom hook — bundles up the "answer, check, next" logic that
// every quiz-style game needs, so Learn/Test/MCQs/etc. don't each
// reimplement their own version of checking answers and moving forward.
export function useAnswerFeedback(questions, index, setIndex) {
    // questions/index/setIndex come from OUTSIDE — this hook doesn't
    // fetch or own the question list itself, just operates on it

    const [answer, setAnswer] = useState('')     // whatever the user has typed so far
    const [feedback, setFeedback] = useState(null)   // null | 'correct' | 'wrong'

    const current = questions[index]   // the one question currently being shown

    // Cleans a string so minor typing differences don't count as wrong
    const normalize = (str) => str
        .trim()                              // remove leading/trailing spaces
        .toLowerCase()                       // ignore capitalization
        .normalize("NFD")                    // split accented letters into base + accent mark
        .replace(/[\u0300-\u036f]/g, "")     // strip the accent mark off

    // Compares the user's answer to the correct one, after normalizing both
    const checkAnswer = (userInput) => {
        setFeedback(normalize(userInput) === normalize(current.answer) ? 'correct' : 'wrong')
    }

    // Runs when user clicks "Next" — saves the result, then resets for the next question
    const handleNext = async () => {
        await recordFeedback(current.id, feedback === 'correct')
        // records this word as correct/incorrect in Supabase (word_progress table)

        setAnswer('')          // clear the input box
        setFeedback(null)      // clear correct/wrong state
        setIndex(i => i + 1)   // move to the next question
    }

    // Everything a game component needs to render + handle one question
    return { current, answer, setAnswer, feedback, checkAnswer, handleNext }
}