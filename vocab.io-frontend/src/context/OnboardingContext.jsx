import { createContext, useContext, useState} from "react"

const OnboardingContext = createContext()

export function OnboardingProvider({ children }) {
    const [onboardingData, setOnboardingData] = useState({
        reasons: [],
        languages: []
    })

    /* why do we made a function instead of just <changing> */
    /* what is this function doing */
    const updateOnboarding = (key, value) => {
        setOnboardingData(prev => ({...prev, [key]: value}))
    }

    return (
        <OnboardingContext.Provider value={{ onboardingData, updateOnboarding}}>
           {children}
        </OnboardingContext.Provider>
    )
}

export function useOnboarding() {
    return useContext(OnboardingContext)
}
