export default function Learn() {
    return (
        <div className="learn-card">
            <div className="exercise-label">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 2L2 5.5l7 3.5 7-3.5L9 2z" stroke="#0099FF" strokeWidth="1.5" strokeLinejoin="round"/>
                    <path d="M2 5.5v5M16 5.5v5" stroke="#0099FF" strokeWidth="1.5" strokeLinecap="round"/><path d="M5 8.5v3.5a4 4 0 0 0 8 0V8.5" stroke="#0099FF" strokeWidth="1.5" strokeLinecap="round"/></svg>
                <p>Learn</p>
            </div>
            <div className="mcqs">
                <p>Come si Chiama?</p>
                <div className="mcqs-options">
                    <button>
                        <span>1.</span>
                        What is your name?</button>
                    <button>
                        <span>2.</span>
                        My name is</button>
                    <button>
                        <span>3.</span>
                        Goodbye</button>
                    <button>
                        <span>4.</span>
                        See you</button>
                </div>
            </div>
            <div className="writing-exercises">
                <div className="writing-1">
                    <h2>See you tomorrow</h2>
                    <p>Your answer:</p>
                    <input type="text" />
                    <button className="check-button">Check</button>
                </div>
                <div className="writing-2">
                    <button className="check-button voice-button">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#FFF0F3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                                <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
                                <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
                            </svg>
                    </button>
                    <input type="text" />
                    <button className="check-button">Check</button>
                </div>
            </div>
        </div>
    )
}