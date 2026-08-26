export default function Test() {
    return (
        <div className="test-card">
            <div className="exercise-label">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M3 4h12M3 7.5h12M3 11h8M3 14.5h6" stroke="#FF4D6D" strokeWidth="1.5" strokeLinecap="round"/></svg>
                    Test
            </div>
            <div className="content">
                <div className="header">
                    <div className="icons">
                        <h3>Term</h3>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#1A1A1E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                                    <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
                                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
                        </svg>
                    </div>
                    <p>10 of 20</p>
                </div>
                <p className="question">How is it going?</p>
                <p>Choose an answer</p>
                <div className="mcqs">
                    <button>Come sta?</button>
                    <button>Come Stai?</button>
                    <button>Come Va?</button>
                    <button>Buonasera</button>
                </div>
            </div>
        </div>
    )
}