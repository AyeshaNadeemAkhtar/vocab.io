export default function Translation() {
    return (
        <div className="translation-card">
            <div className="exercise-label">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M2 4h8M6 2v2M4 4c0 3 2 5 5 6" stroke="#FF4D6D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M8 9c1 1 3 2 4 2" stroke="#Ff4d6d" strokeWidth="1.5" strokeLinecap="round"/><path d="M10 14l2-5 2 5M11 12.5h2" stroke="#FF4d6d" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M16 4H8l-1 3" stroke="#FF4d6d" strokeWidth="1.5" strokeLinecap="round"/></svg>
                    Translation
            </div>

            <div className="content">
                <div className="translation-text">
                    <p className="statement">Sebbene il professore avesse spiegato chiaramente l'argomento durante la lezione, molti studenti non sono riusciti a superare l'esame finale, che si è rivelato molto più difficile del previsto.</p>
                    <p className="translated">Although the professor had clearly explained the topic during the lesson, many students were unable to pass the final exam, which proved to be much more difficult than expected.</p>
                </div>

                <div className="translation-text">
                    <p className="statement">Se avessi saputo in anticipo che il treno avrebbe subito un ritardo così lungo a causa di un guasto tecnico, sarei sicuramente andato a prendere i miei genitori all'aeroporto con la macchina.</p>
                    <p className="translated">f I had known in advance that the train would be delayed for so long due to a technical breakdown, I certainly would have gone to pick up my parents at the airport with the car.</p>
                </div>

                <div className="translation-text">
                    <p className="statement">Dopo aver trascorso diverse settimane a pianificare il viaggio perfetto attraverso le città più affascinanti della Toscana, ho finalmente deciso di prenotare un piccolo agriturismo circondato da vigneti.</p>
                    <p className="translated">After spending several weeks planning the perfect trip through the most fascinating cities of Tuscany, I have finally decided to book a small farmhouse surrounded by vineyards</p>
                </div>
                
            </div>
        </div>
    )
}