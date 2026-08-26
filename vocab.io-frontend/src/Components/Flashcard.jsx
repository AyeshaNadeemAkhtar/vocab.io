export default function Flashcard() {
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