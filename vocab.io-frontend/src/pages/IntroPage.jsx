import { useNavigate } from "react-router-dom"
import Lottie from "lottie-react"
import study from "../animation/study.json"
import language from "../animation/Language Translator.json"
import sectionTwoAnimation from "../animation/Education Blue.json"
import bookStack from "../animation/Books stack.json"


export default function IntroPage() {
    const navigate = useNavigate()
    return (
        <>
            <header className="intro-page">
                <h3>vocab.io</h3>

                <div>
                    <button onClick={() => navigate("/signup")} className="signup-button">SignUp</button>
                    <button onClick={() => navigate("/login")} className="login-button">Login</button>
                </div>
            </header>

            <div className="hero">
                <div className="text">
                    <h1>Your New Favorite Word Game</h1>
                    <p>Learn vocabulary from your own text quickly,
                        through personalized exercises giving realtime
                        feedback and track your progress in your Favorite
                        languages.
                    </p>
                    <button onClick={() => navigate("/signup")}>Get Started</button>
                </div>

                <div className="illustration">
                    <Lottie animationData={language} loop={true} className="hero"/>
                </div>
            </div>

            <section className="feature">
                <Lottie animationData={study} loop={true} className="section-animation"/>

                <div>
                    <h2>Memorizing words from any text</h2>
                    <p>Give your own text or ask AI to give you text on
                        favorite topic in desired language.
                    </p>
                </div>
            </section>

            <section className="feature feature-two">
                <div>
                    <h2>Practice vocabulary through Exercises</h2>
                    <p>Practice important keywords in a fun way through 
                        different games & exercises. 
                    </p>
                </div>
                 <Lottie animationData={sectionTwoAnimation} loop={true} className="section-animation"/>
            </section>

            <section className="feature">
                <Lottie animationData={bookStack} loop={true} className="section-animation"/>
                <div>
                    <h2>Words are saved for you!</h2>
                    <p>Review words from my lesson anytime in your 
                        Word Bank page.
                    </p>
                </div>
            </section>

            <section className="skills">
                <span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-book-open-text-icon lucide-book-open-text"><path d="M12 7v14"/><path d="M16 12h2"/><path d="M16 8h2"/><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/><path d="M6 12h2"/><path d="M6 8h2"/></svg>
                    Reading
                </span>

                <span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-pencil-line-icon lucide-pencil-line"><path d="M13 21h8"/><path d="m15 5 4 4"/><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/></svg>
                    Writing
                </span>

                <span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-volume2-icon lucide-volume-2"><path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z"/><path d="M16 9a5 5 0 0 1 0 6"/><path d="M19.364 18.364a9 9 0 0 0 0-12.728"/></svg>
                    Speaking
                </span>

                <span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-audio-lines-icon lucide-audio-lines"><path d="M2 10v3"/><path d="M6 6v11"/><path d="M10 3v18"/><path d="M14 8v7"/><path d="M18 5v13"/><path d="M22 10v3"/></svg>
                    Listening
                </span>
            </section>

            <section className="CTA">
                <h2>Learn Vocabulary fast with vocab.io</h2>
                <button onClick={() => navigate("/signup")}>Begin Today</button>
            </section>
            {/* Add Language Animated Barrier here */}
            {/* Add FAQs section here */}
            <footer>
                2026 &copy; vocab.io development. All rights reserved.
            </footer>
        </>
    )
}