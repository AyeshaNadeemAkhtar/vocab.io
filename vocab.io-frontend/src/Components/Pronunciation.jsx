export default function Pronunciation() {
    return (
        <div className="pronunciation-card">
            <div className="exercise-label">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="6" y="2" width="6" height="8" rx="3" stroke="#0099FF" strokeWidth="1.5"/><path d="M3 9a6 6 0 0 0 12 0" stroke="#0099FF" strokeWidth="1.5" strokeLinecap="round"/><path d="M9 15v1.5" stroke="#0099FF" strokeWidth="1.5" strokeLinecap="round"/><path d="M13 4.5c.8.5 1.5 1.5 1.5 2.5" stroke="#0099FF" strokeWidth="1.3" strokeLinecap="round"/><path d="M15 3c1.2 1 2 2.5 2 4" stroke="#0099FF" strokeWidth="1.3" strokeLinecap="round"/></svg>
                    Pronunciation
            </div>
            <div className="content">
                <div>
                    <p>See you tomorrow.</p>
                    <button className="speak-button">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                            <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
                            <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
                       </svg>
                     Push to speak
                    </button>
                </div>
                <div>
                    <p>Ciao! Mi Chiamo Ayesha. Non c'e male</p>
                    <button className="speak-button">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                            <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
                            <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
                       </svg>
                     Push to speak
                    </button>
                </div>
                <div>
                    <p>Buongiorno Dottor Rossi</p>
                    <button className="speak-button">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                            <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
                            <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
                       </svg>
                     Push to speak
                    </button>
                </div>
                <div>
                    <div className="exercise-4">
                        <button className="speak-button microphone-button">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                                <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
                                <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
                        </svg>
                        </button>
                        <input type="text" />
                    </div>
                    <button className="speak-button">Check</button>
                </div>
            </div>
        </div>
    )
}