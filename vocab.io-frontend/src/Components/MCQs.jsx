export default function MCQs() {
    return (
        <div className="mcqs-card">
            <div className="exercise-label">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="4" cy="5" r="2" stroke="#FF4D6D" strokeWidth="1.5"/><circle cx="4" cy="5" r="0.8" fill="#FF4D6D"/><path d="M8 5h7" stroke="#FF4D6D" strokeWidth="1.5" strokeLinecap="round"/><circle cx="4" cy="9.5" r="2" stroke="#FF4D6D" strokeWidth="1.5"/><path d="M8 9.5h7" stroke="#FF4D6D" strokeWidth="1.5" strokeLinecap="round"/><circle cx="4" cy="14" r="2" stroke="#FF4D6D" strokeWidth="1.5"/><path d="M8 14h7" stroke="#FF4D6D" strokeWidth="1.5" strokeLinecap="round"/></svg>
                MCQ's
            </div>

            <div className="content">
                <div className="mcqs-type">
                    <p>I met Professor Melani in Evening. What should i say to her?</p>
                    <div className="mcqs-buttons">
                        <button>Buongiorno</button>
                        <button>Buonanotte</button>
                        <button>Buonasera</button>
                        <button>Come va</button>
                    </div>
                </div>
                <div>
                    <p>My name is Ayesha.</p>
                    <div className="mcqs-buttons">
                        <button>Mi Chiamo Ayesha</button>
                        <button>Come va Ayesha</button>
                        <button>Come stai Ayesha</button>
                        <button>Buongiorno Ayesha</button>
                    </div>
                </div>
                <div>
                    <div className="audio-mcqs-option">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#0099FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                                <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
                                <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
                        </svg>
                        <p>Answer the questio from audio</p>
                    </div>
                    <div className="mcqs-buttons">
                        <button>Abito a Roma</button>
                        <button>Non Abito</button>
                        <button>Non lo so</button>
                        <button>Lei Viva a Roma</button>
                    </div>
                </div>
                <div>
                    <p>Cosa hai mangiato a colazione?</p>
                    <div className="mcqs-buttons">
                        <button>Ho dormito</button>
                        <button>Sono andato a fare una passeggiata</button>
                        <button>Ho Mangiato pane e uova</button>
                        <button>non avevo fame</button>
                    </div>
                </div>
            </div>
        </div>
    )
}