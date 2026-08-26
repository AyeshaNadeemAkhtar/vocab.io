import { useNavigate } from "react-router-dom"
import MultiSelect from "../Components/multiselect.jsx"
import { useOnboarding } from "../context/OnboardingContext" /* Don't understand the import */
import { GiAirplaneDeparture, GiMusicalNotes, GiBookCover, GiEarthAmerica, GiMicrophone, GiPaintBrush} from "react-icons/gi"

export default function Reason() {
    const navigate = useNavigate()
    const { onboardingData, updateOnboarding} = useOnboarding()

    const reasons = [
        { label: "Hobby", icon: <GiPaintBrush /> },
        { label: "Study Abroad", icon: <GiBookCover /> },
        { label: "Culture", icon: <GiEarthAmerica /> },
        { label: "Music", icon: <GiMusicalNotes /> },
        { label: "Travel", icon: <GiAirplaneDeparture/> },
        { label: "Vocals", icon: <GiMicrophone/> }
    ]
    
    return (
        <div className="reason-container">
            <MultiSelect 
                options={reasons}
                title="Why are you learning language?"
                selected={onboardingData.reasons} /* Don't understand these both lines */
                onChange={(val) => updateOnboarding("reasons", val)}
            />

            <button onClick={() => navigate("/onboarding/languages")} className="continue-btn">CONTINUE</button>
        </div>
    )
}