import { useEffect } from "react"
import { supabase } from "../lib/supabase-client.js"
import { useNavigate } from "react-router-dom"
import ReactCountryFlag from "react-country-flag"
import plusIcon from "../assets/plus-icon.svg"
import Sidebar from "../Components/sidebar.jsx"

export default function Dashboard() {

    const navigate = useNavigate()

    useEffect(() => {
   supabase.auth.onAuthStateChange((event, session) => {
    if (event == "SIGNED_IN") {
        console.log("User is logged in: ")
        }
    })
    }, [])

    const flagStyle = {
        width: '3em',
        height: '3em'
    }

    return (
        <div className="dashboard">
            <Sidebar />
            <main className="main">
               <div className="welcome-card">
                    <div className="welcome-text">
                        <p className="greeting">Welcome!</p>
                        <h2>Ayesha Nadeem</h2>
                        <p className="subtext">Ready to learn something new today? Start a lesson, practice exercises or review your word bank.</p>
                    </div>
                    <div className="welcome-illustration">
                        Lottie Animation
                    </div>
               </div>

               <div className="language-card">
                 <div>
                    <div>
                        <h3>Italian</h3>
                        <p>23 Words</p>
                    </div>
                    <ReactCountryFlag countryCode="IT" svg style={flagStyle} />
                 </div>

                 <div>
                    <div>
                        <h3>French</h3>
                        <p>46 Words</p>
                    </div>
                    <ReactCountryFlag countryCode="FR" svg style={flagStyle} />
                 </div>

                 <div>
                    <div>
                        <h3>German</h3>
                        <p>15 Words</p>
                    </div>
                    <ReactCountryFlag countryCode="DE" svg style={flagStyle} />
                 </div>
               </div>

               <div className="lessons-list">
                <div>
                    <h2>Lessons</h2>
                    <button>
                        <img src={plusIcon} alt="Add-btn" width="30" height="30" />
                    </button>  
                </div>
                <div className="lesson">
                    <h3>Art History in Mesopatomia</h3>
                    <button className="label">English</button>
                    <ReactCountryFlag countryCode="IT" svg style={flagStyle} />
                    <div>
                        <p>Pronunciation</p>
                    </div>
                    
                </div>
                 
               </div>
            </main>
            <aside className="progress-sidebar">
                Sidebar
            </aside>
        </div>
    )
}