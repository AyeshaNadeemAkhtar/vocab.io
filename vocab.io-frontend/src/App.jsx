import IntroPage from './pages/IntroPage'
import Login from "./pages/login"
import SignUp from "./pages/signup"
import Reason from "./pages/reason"
import InterestedLanguages  from './pages/interestedlanguages'
import Dashboard from "./pages/Dashboard"
import Exercises from "./pages/exercises"
import Input from "./pages/input"
import Profile from "./pages/profile"
import WordBank from "./pages/WordBank"
import Flashcards from "./Components/Flashcard.jsx"
import Learn from "./Components/Learn.jsx"
import Test from "./Components/Test.jsx"
import Match from "./Components/Match.jsx"
import MCQs from "./Components/MCQs.jsx"
import Pronunciation from "./Components/Pronunciation.jsx"
import Translation from "./Components/Translation.jsx"
import FillInTheBlanks from "./Components/FillInTheBlanks.jsx"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { OnboardingProvider } from "./context/OnboardingContext"



export default function App() {
  

  return (
    <BrowserRouter>
     <Routes>
      <Route path="/" element={<IntroPage />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />

      <Route path="/onboarding/reason" 
      element={
       <OnboardingProvider>
        <Reason /> 
        </OnboardingProvider>}
      />

      <Route path="/onboarding/languages" 
      element={
        <OnboardingProvider>
      <InterestedLanguages />
      </OnboardingProvider>}
     />
    
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/input" element={<Input />} />
      <Route path="/exercises" element={<Exercises />} />
      <Route path="/profile" element={<Profile /> } />
      <Route path="/wordbank" element={<WordBank />} />
      <Route path="/flashcards" element={<Flashcards />} />
      <Route path="/learn" element={<Learn />} />
      <Route path="/test" element={<Test />}/>
      <Route path="/match" element={<Match />} />
      <Route path="/mcqs" element={<MCQs />} />
      <Route path="/pronunciation" element={<Pronunciation />} />
      <Route path="/translation" element={<Translation />} />
      <Route path="/fill-in-the-blanks" element={<FillInTheBlanks />} />
  
     </Routes>
    </BrowserRouter>
  )
}