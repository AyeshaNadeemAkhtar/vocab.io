import  Sidebar from "../Components/sidebar.jsx"
import Flashcard from "../Components/Flashcard.jsx"
import Learn from "../Components/Learn.jsx"
import Test from "../Components/Test.jsx"
import Match from "../Components/Match.jsx"
import MCQs from "../Components/MCQs.jsx"
import Pronunciation from "../Components/Pronunciation.jsx"
import Listening from "../Components/Listening.jsx"
import Translation from "../Components/Translation.jsx"
import FillInTheBlanks from "../Components/FillInTheBlanks.jsx"
import { useNavigate } from "react-router-dom"

export default function Exercises() {
    const navigate = useNavigate()

    return (
        <div className="exercises-page">
        <Sidebar />
        <main className="exercises-main">
            <div className="exercises-start-buttons">
                <button onClick={() => navigate("/flashcards")}>
                   <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <rect x="1" y="4" width="13" height="10" rx="2" stroke="#0099FF" strokeWidth="1.5"/>
                     <rect x="4" y="2" width="13" height="10" rx="2" stroke="#0099FF" strokeWidth="1.5" fill="white"/>
                     <path d="M8 6h5M8 9h3" stroke="#0099FF" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                    Flashcards
                </button>

                <button onClick={() => navigate("/learn")}>
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 2L2 5.5l7 3.5 7-3.5L9 2z" stroke="#0099FF" strokeWidth="1.5" strokeLinejoin="round"/>
                    <path d="M2 5.5v5M16 5.5v5" stroke="#0099FF" strokeWidth="1.5" strokeLinecap="round"/><path d="M5 8.5v3.5a4 4 0 0 0 8 0V8.5" stroke="#0099FF" strokeWidth="1.5" strokeLinecap="round"/></svg>
                    Learn
                </button>

                <button onClick={() => navigate("/test")}>
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M3 4h12M3 7.5h12M3 11h8M3 14.5h6" stroke="#0099FF" strokeWidth="1.5" strokeLinecap="round"/></svg>
                    Test
                </button>

                <button onClick={() => navigate("/match")}>
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="1.5" y="2.5" width="5" height="4" rx="1" stroke="#0099FF" strokeWidth="1.5"/><rect x="11.5" y="5.5" width="5" height="4" rx="1" stroke="#0099FF" strokeWidth="1.5"/><rect x="1.5" y="11.5" width="5" height="4" rx="1" stroke="#0099FF" strokeWidth="1.5"/><rect x="11.5" y="11.5" width="5" height="4" rx="1" stroke="#0099FF" strokeWidth="1.5"/><path d="M6.5 4.5C8.5 4.5 9.5 7.5 11.5 7.5" stroke="#0099FF" strokeWidth="1.2" strokeLinecap="round" strokeDasharray="1.5 1.5"/><path d="M6.5 13.5C8.5 13.5 9.5 13.5 11.5 13.5" stroke="#0099FF" strokeWidth="1.2" strokeLinecap="round" strokeDasharray="1.5 1.5"/></svg>
                    Match
                </button>

                <button onClick={() => navigate("/mcqs")}>
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="4" cy="5" r="2" stroke="#0099FF" strokeWidth="1.5"/><circle cx="4" cy="5" r="0.8" fill="#0099FF"/><path d="M8 5h7" stroke="#0099FF" strokeWidth="1.5" strokeLinecap="round"/><circle cx="4" cy="9.5" r="2" stroke="#0099FF" strokeWidth="1.5"/><path d="M8 9.5h7" stroke="#0099FF" strokeWidth="1.5" strokeLinecap="round"/><circle cx="4" cy="14" r="2" stroke="#0099FF" strokeWidth="1.5"/><path d="M8 14h7" stroke="#0099FF" strokeWidth="1.5" strokeLinecap="round"/></svg>
                    MCQ's
                </button>

                <button onClick={() => navigate("/pronunciation")}>
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="6" y="2" width="6" height="8" rx="3" stroke="#0099FF" strokeWidth="1.5"/><path d="M3 9a6 6 0 0 0 12 0" stroke="#0099FF" strokeWidth="1.5" strokeLinecap="round"/><path d="M9 15v1.5" stroke="#0099FF" strokeWidth="1.5" strokeLinecap="round"/><path d="M13 4.5c.8.5 1.5 1.5 1.5 2.5" stroke="#0099FF" strokeWidth="1.3" strokeLinecap="round"/><path d="M15 3c1.2 1 2 2.5 2 4" stroke="#0099FF" strokeWidth="1.3" strokeLinecap="round"/></svg>
                    Pronunciation
                </button>

                {/* <button>
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 7a7 7 0 0 1 14 0v3a3 3 0 0 1-3 3h-1" stroke="#0099FF" strokeWidth="1.5" strokeLinecap="round"/><rect x="1.5" y="7" width="3" height="5" rx="1.5" stroke="#0099FF" strokeWidth="1.5"/><rect x="13.5" y="7" width="3" height="5" rx="1.5" stroke="#0099FF" strokeWidth="1.5"/><path d="M9 13v2.5M7 15.5h4" stroke="#0099FF" strokeWidth="1.5" strokeLinecap="round"/></svg>
                    Listening
                </button> */}

                <button onClick={() => navigate("/translation")}>
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M2 4h8M6 2v2M4 4c0 3 2 5 5 6" stroke="#0099FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M8 9c1 1 3 2 4 2" stroke="#0099FF" strokeWidth="1.5" strokeLinecap="round"/><path d="M10 14l2-5 2 5M11 12.5h2" stroke="#0099FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M16 4H8l-1 3" stroke="#0099FF" strokeWidth="1.5" strokeLinecap="round"/></svg>
                    Translation
                </button>

                <button onClick={() => navigate("/fill-in-the-blanks")}>
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="1.5" y="4" width="15" height="10" rx="2" stroke="#0099FF" strokeWidth="1.5"/><path d="M5 9h2M11 9h2" stroke="#0099FF" strokeWidth="1.5" strokeLinecap="round"/><path d="M8 7.5v3" stroke="#0099FF" strokeWidth="2" strokeLinecap="round"/><path d="M10 7.5v3" stroke="#0099FF" strokeWidth="2" strokeLinecap="round"/></svg>
                    Fill-in-the-blanks
                </button>

            </div>
           <Flashcard />
           <Learn />
           <Test />
           <Match />
           <MCQs />
           <Pronunciation />
           <Translation />
           <FillInTheBlanks />
        </main>
        </div>
    )
}