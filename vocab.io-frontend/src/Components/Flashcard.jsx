import { useState, useEffect } from "react"
import { supabase } from "../lib/supabase-client.js"


export default function Flashcard() {

    const [wordBank, setWordBank] = useState([])
    const [loading, setLoading] = useState(true) /* How used? */
    const [index, setIndex] = useState(0) // How used?
    const [flipped, setFlipped] = useState(false)

    useEffect(() => {

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

    const recordFeedback = async (keywordId, wasCorrect) => {
        const { data: { user } } = await supabase.auth.getUser()

        /* If the data about a keyword already exists */
        const { data: existing } = await supabase
            .from("word_progress")
            .select("*")
            .eq("user_id", user.id)
            .eq("keyword_id", keywordId)
            .maybeSingle() /* Expect one row or null */

        /* Update the data for existing keyword */
        if (existing) {
            await supabase
                .from("word_progress")
                /* These are the columns of table, hence dictionary */
                .update({
                    correct_count: existing.correct_count + (wasCorrect ? 1 : 0),
                    incorrect_count: existing.incorrect_count + (wasCorrect ? 0 : 1)
                })
                .eq("id", existing.id)
        } else {
            /* If it's the first time a keyword is reviewed */
            await supabase.from("word_progress").insert({
                user_id: user.id,
                keyword_id: keywordId,
                correct_count: wasCorrect ? 1 : 0,
                incorrect_count: wasCorrect ? 0 : 1,
                last_reviewed_at: new Date().toISOString()
            })
        }
    }
    
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

    return (
         <div className="flashcard">
               <div className="header">
                    <div className="exercise-name">
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="1" y="4" width="13" height="10" rx="2" stroke="#FF4D6D" strokeWidth="1.5"/>
                            <rect x="4" y="2" width="13" height="10" rx="2" stroke="#FF4D6D" strokeWidth="1.5" fill="white"/>
                            <path d="M8 6h5M8 9h3" stroke="#FF4D6D" strokeWidth="1.5" strokeLinecap="round"/>
                        </svg>
                        <p>Flashcards</p>   
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#0099FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                        <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
                        <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
                    </svg>
                </div>
                <h2>See you Tomorrow</h2>
                <div className="footer">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="#0099FF">
                        <path d="M11.7 3.3a1 1 0 0 1 0 1.4L5.83 10.5H20a1 1 0 0 1 0 2H5.83l5.87 5.8a1 1 0 0 1-1.4 1.4l-7.6-7.5a1 1 0 0 1 0-1.4l7.6-7.5a1 1 0 0 1 1.4 0z"/>
                    </svg>
                    <span>6/33</span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="#0099FF">
                        <path d="M12.3 3.3a1 1 0 0 0 0 1.4l5.87 5.8H4a1 1 0 0 0 0 2h14.17l-5.87 5.8a1 1 0 0 0 1.4 1.4l7.6-7.5a1 1 0 0 0 0-1.4l-7.6-7.5a1 1 0 0 0-1.4 0z"/>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#0099FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
                        <polyline points="3 3 3 8 8 3"/>
                    </svg>
                </div>
            </div>
    )
}