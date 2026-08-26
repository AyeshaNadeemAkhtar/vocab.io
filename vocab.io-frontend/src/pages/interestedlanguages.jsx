import { useNavigate } from "react-router-dom"
import MultiSelect from "../Components/multiselect"
import { useOnboarding } from "../context/OnboardingContext"
import { supabase } from "../lib/supabase-client.js"
import ReactCountryFlag from "react-country-flag"

export default function InterestedLanguages() {
    
    const navigate = useNavigate()
    const { onboardingData, updateOnboarding } = useOnboarding()
    console.log(onboardingData)

    const flagStyle = {
        width: '2em',
        height: '2em'
    }
    const languages = [
        { label: "English", icon: <ReactCountryFlag countryCode="GB" svg style={flagStyle} /> },
        { label: "Italian", icon: <ReactCountryFlag countryCode="IT" svg style={flagStyle} /> },
        { label: "Finnish", icon: <ReactCountryFlag countryCode="FI" svg style={flagStyle} /> },
        { label: "Swedish", icon: <ReactCountryFlag countryCode="SE" svg style={flagStyle} /> },
        { label: "Spanish", icon: <ReactCountryFlag countryCode="ES" svg style={flagStyle} /> },
        { label: "German", icon: <ReactCountryFlag countryCode="DE" svg style={flagStyle} /> },
    ]

    async function handleContinue() {
        const { data : { user }} = await supabase.auth.getUser() /* Don't understand unnecessary braces */
       
        const { error } = await supabase
        .from("profiles")
        .update({
            reason_of_learning_language: onboardingData.reasons,
            interested_languages: onboardingData.languages
        })
        .eq("id", user.id)

        if (error) {
            console.error("Failed to save profile", error.message)
            return 
        }

        navigate("/dashboard")
    }
    return (
        <div className="reason-container">
            <MultiSelect
            options={languages}
            title="What language interests you the most?" 
            selected={onboardingData.languages}
            onChange={(val) => updateOnboarding("languages", val)}
            />

        <button onClick={handleContinue} className="continue-btn">CONTINUE</button>
        </div>
    )
}