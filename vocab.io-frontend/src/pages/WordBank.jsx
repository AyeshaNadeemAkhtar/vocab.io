import Sidebar from "../Components/sidebar.jsx"

export default function WordBank() {
    return (
        <div className="word-bank-page">
            <Sidebar />
            <main>
               <div className="lesson">
                    <div className="topic">
                        <h3>Lesson 1</h3>
                        <p>Spanish</p>
                    </div>
                    <div className="keywords">
                        <button>Hola</button>
                        <button>Hello</button>
                        <button>Adios</button>
                        <button>Por Favor</button>
                        <button>Gracias</button>
                        <button>Thank You</button>
                        <button>Amor</button>
                        <button>Love</button>
                        <button>Agua</button>
                        <button>Water</button>
                        <button>Amigo</button>
                        <button>Friend</button>
                        <button>Casa</button>
                        <button>House</button>
                        <button>Sol</button>
                        <button>Sun</button>
                        <button>Tiempo</button>
                        <button>Time</button>
                    </div>
               </div>
               <div className="lesson">
                    <div className="topic">
                        <h3>Lesson 2</h3>
                        <p>Italian</p>
                    </div>
                    <div className="keywords">
                        <button>Ciao</button>
                        <button>Hello</button>
                        <button>Bello</button>
                        <button>Beautiful</button>
                        <button>Conto</button>
                        <button>Bill</button>
                        <button>Tracotanza</button>
                        <button>Arrogance</button>
                        <button>Astruso</button>
                        <button>Difficult</button>
                        <button>Invece</button>
                        <button>Instead</button>
                        <button>Proprio</button>
                        <button>Exactly</button>
                    </div>
               </div>
               <div className="lesson">
                    <div className="topic">
                        <h3>Lesson 3</h3>
                        <p>Finnish</p>
                    </div>
                    <div className="keywords">
                        <button>Moi</button>
                        <button>Hi</button>
                        <button>Kittos</button>
                        <button>Thank You</button>
                        <button>Kylla</button>
                        <button>Yes</button>
                        <button>Ei</button>
                        <button>No</button>
                        <button>Anteeksi</button>
                        <button>Sorry</button>
                        <button>Kahvi</button>
                        <button>Coffee</button>
                        <button>Mina</button>
                        <button>I</button>
                        <button>Sina</button>
                        <button>You</button>
                    </div>
               </div>
               <div className="lesson">
                    <div className="topic">
                        <h3>Lesson 4</h3>
                        <p>Swedish</p>
                    </div>
                    <div className="keywords">
                        <button>Hej</button>
                        <button>Hello</button>
                        <button>Tack</button>
                        <button>Please</button>
                        <button>Fika</button>
                        <button>Break</button>
                        <button>Skai</button>
                        <button>Cheers</button>
                        <button>Forlat</button>
                        <button>Sorry</button>
                    </div>
               </div>
            </main>
        </div>

    )
}