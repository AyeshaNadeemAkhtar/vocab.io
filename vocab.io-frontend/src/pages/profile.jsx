import  Sidebar from "../Components/sidebar.jsx"
import { FiEdit2 } from "react-icons/fi"
import { GiProgression } from "react-icons/gi"
import masterpiece from "../images/masterpiece 4.png"
import profile1 from "../images/profile1.png"

export default function Profile() {
    return (
        <div className="profile-page">
            <Sidebar />

            <main>
                <div className="profile-header">
                    <div className="profile-image">
                        <img src={profile1} alt="Not Available" />
                    </div>
                    <FiEdit2 className="edit-icon" size={25}/>
                </div>
                <h3>Ayesha Nadeem</h3>
                <div className="interested-languages-card">
                    <h3>Interested Languages</h3>
                    <button>English</button>
                    <button>Italian</button>
                    <button>French</button>
                </div>
                <div className="reason-language-card">
                    <h3>Reason of Learning Language</h3>
                    <button>Hobby</button>
                    <button>Travel</button>
                </div>
                <div className="profile-progress-report">
                    <div className="language-progress-card language-1-progress-card">
                        <div className="upper-part">
                            <div>A1</div>
                            <h3>English</h3>
                            <p>Beginner</p>
                        </div>
                        <p className="lower-part">Learned <span>50</span> words</p>
                    </div>
                    <div className="language-progress-card">
                        <div className="upper-part">
                            <div>C1</div>
                            <h3>French</h3>
                            <p>Internediate</p>
                        </div>
                        <p className="lower-part">Learned <span>25</span> words</p>
                    </div>
                    <div className="total-words-learned-card">
                        <p>Total Words Learned</p>
                        <div className="child">
                            <h3>350</h3>
                            <GiProgression className="progress-icon"/>
                        </div>
                    </div>
                    <div className="current-streak-card">
                        <p>Current Streak</p>
                        <div className="child">
                            <h3>Seven days</h3>
                            <GiProgression className="progress-icon" />
                        </div>
                    </div>
                </div>
                <button className="log-out-button">LogOut</button>
            </main>

        </div>
    )
}