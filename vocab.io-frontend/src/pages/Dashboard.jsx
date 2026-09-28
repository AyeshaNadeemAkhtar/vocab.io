// import { useEffect } from "react"
// import { supabase } from "../lib/supabase-client.js"
// import { useNavigate } from "react-router-dom"
// import ReactCountryFlag from "react-country-flag"
// import plusIcon from "../assets/plus-icon.svg"
// import Sidebar from "../Components/sidebar.jsx"

// export default function Dashboard() {

//     const navigate = useNavigate()

//     useEffect(() => {
//    supabase.auth.onAuthStateChange((event, session) => {
//     if (event == "SIGNED_IN") {
//         console.log("User is logged in: ")
//         }
//     })
//     }, [])

//     const flagStyle = {
//         width: '3em',
//         height: '3em'
//     }

//     return (
//         <div className="dashboard">
//             <Sidebar />
//             <main className="main">
//                <div className="welcome-card">
//                     <div className="welcome-text">
//                         <p className="greeting">Welcome!</p>
//                         <h2>Ayesha Nadeem</h2>
//                         <p className="subtext">Ready to learn something new today? Start a lesson, practice exercises or review your word bank.</p>
//                     </div>
//                     <div className="welcome-illustration">
//                         Lottie Animation
//                     </div>
//                </div>

//                <div className="language-card">
//                  <div>
//                     <div>
//                         <h3>Italian</h3>
//                         <p>23 Words</p>
//                     </div>
//                     <ReactCountryFlag countryCode="IT" svg style={flagStyle} />
//                  </div>

//                  <div>
//                     <div>
//                         <h3>French</h3>
//                         <p>46 Words</p>
//                     </div>
//                     <ReactCountryFlag countryCode="FR" svg style={flagStyle} />
//                  </div>

//                  <div>
//                     <div>
//                         <h3>German</h3>
//                         <p>15 Words</p>
//                     </div>
//                     <ReactCountryFlag countryCode="DE" svg style={flagStyle} />
//                  </div>
//                </div>

//                <div className="lessons-list">
//                 <div>
//                     <h2>Lessons</h2>
//                     <button>
//                         <img src={plusIcon} alt="Add-btn" width="30" height="30" />
//                     </button>  
//                 </div>
//                 <div className="lesson">
//                     <h3>Art History in Mesopatomia</h3>
//                     <button className="label">English</button>
//                     <ReactCountryFlag countryCode="IT" svg style={flagStyle} />
//                     <div>
//                         <p>Pronunciation</p>
//                     </div>
                    
//                 </div>
                 
//                </div>
//             </main>
//             <aside className="progress-sidebar">
//                 Sidebar
//             </aside>
//         </div>
//     )
// }

import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase-client.js"
import { useNavigate } from "react-router-dom"
import ReactCountryFlag from "react-country-flag"
import plusIcon from "../assets/plus-icon.svg"
import Sidebar from "../Components/sidebar.jsx"
import Lottie from "lottie-react"

// Hosted Lottie JSON, avoids bundling a local asset
const WELCOME_ANIMATION_URL =
    "https://assets9.lottiefiles.com/packages/lf20_touohxv0.json"

// Languages shown on dashboard, mapped to ISO codes for flags
const LANGUAGES = [
    { code: "IT", name: "Italian" },
    { code: "FR", name: "French" },
    { code: "DE", name: "German" },
]

export default function Dashboard() {
    const navigate = useNavigate()
    const [name, setName] = useState("")
    const [wordCounts, setWordCounts] = useState({})
    const [streak, setStreak] = useState(0)
    const [animationData, setAnimationData] = useState(null)

    useEffect(() => {
        // Reload data if user signs in after initial mount
        supabase.auth.onAuthStateChange((event) => {
            if (event === "SIGNED_IN") loadDashboard()
        })
        loadDashboard()

        // Fetch animation JSON once on mount
        fetch(WELCOME_ANIMATION_URL)
            .then(res => res.json())
            .then(setAnimationData)
            .catch(() => setAnimationData(null)) // fail silently, animation just won't show
    }, [])

    async function loadDashboard() {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) return // not logged in, nothing to load

        // --- Name + streak ---
        try {
            const { data: profile } = await supabase
                .from("profiles")
                .select("*")
                .eq("id", user.id)
                .single()

            // Chain of fallbacks in case column names differ
            setName(
                profile?.full_name ||
                profile?.name ||
                user.user_metadata?.full_name ||
                user.email ||
                "there"
            )
            setStreak(profile?.streak ?? 0)
        } catch {
            // profiles table/row missing — fall back to auth data
            setName(user.user_metadata?.full_name || user.email || "there")
        }

        // --- Keyword counts per language ---
        try {
            const { data: keywords, error } = await supabase
                .from("keywords")
                .select("language")
                .eq("user_id", user.id)

            if (error) throw error

            // Tally keywords per language code
            const counts = {}
            keywords.forEach(k => {
                const lang = (k.language || "").toUpperCase()
                counts[lang] = (counts[lang] || 0) + 1
            })
            setWordCounts(counts)
        } catch (err) {
            // Table/columns missing — counts stay at 0, don't crash the page
            console.warn("Could not load keyword counts:", err.message)
        }
    }

    const flagStyle = { width: '3em', height: '3em' }

    return (
        <div className="dashboard">
            <Sidebar />
            <main className="main">
                {/* Greeting + streak animation */}
                <div className="welcome-card">
                    <div className="welcome-text">
                        <p className="greeting">Welcome!</p>
                        <h2>{name || "..."}</h2>
                        <p className="subtext">Ready to learn something new today? Start a lesson, practice exercises or review your word bank.</p>
                    </div>
                    <div className="welcome-illustration">
                        {animationData && (
                            <Lottie animationData={animationData} loop style={{ width: 120, height: 120 }} />
                        )}
                    </div>
                </div>

                {/* Word count per language */}
                <div className="language-card">
                    {LANGUAGES.map(lang => (
                        <div key={lang.code}>
                            <div>
                                <h3>{lang.name}</h3>
                                <p>{wordCounts[lang.code] || 0} Words</p>
                            </div>
                            <ReactCountryFlag countryCode={lang.code} svg style={flagStyle} />
                        </div>
                    ))}
                </div>

                {/* Lessons section — prompts user to create one, no static content */}
                <div className="lessons-list">
                    <div>
                        <h2>Lessons</h2>
                        <button type="button" onClick={() => navigate("/input")}>
                            <img src={plusIcon} alt="Add-btn" width="25" height="25" />
                        </button>
                    </div>
                    <div className="lesson-prompt">
                        <p>No lessons yet — start your first one!</p>
                        <button type="button" className="label" onClick={() => navigate("/input")}>
                            + Create a lesson
                        </button>
                    </div>
                </div>
            </main>

            {/* Streak sidebar */}
            <aside className="progress-sidebar">
                <h3>Streak</h3>
                <p className="streak-count">🔥 {streak}</p>
            </aside>
        </div>
    )
}