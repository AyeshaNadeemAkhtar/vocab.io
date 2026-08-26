import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { supabase } from "../lib/supabase-client"
import loginIllustration from "../animation/Login illustration.json"
import Lottie from "lottie-react"


export default function Login() {
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)

  const signInWithGoogle = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: 'http://localhost:5173/dashboard'
      }
    })

    if (error) console.error("Error authenticating using google: ", error.message)
  }

  async function handleSubmit(e) {
    e.preventDefault()

    setLoading(true)

    const form = e.target
    const email  = form.email.value 
    const password = form.password.value 

    const { data , error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) {
      console.log("Sign in failed: ", error.message)
      setLoading(false)
      return 
    }

    setLoading(false)
    navigate("/dashboard")
  }
    return (
      <div className="container">
        <div className="signup-illustration">
          <Lottie animationData={loginIllustration}
           Loop={true}
           className="lottie" 
          />
        </div>

        <form onSubmit={handleSubmit} className="sign-up-form">
           <h2>Login to vocab.io</h2>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" autoComplete="on"/>

          <label htmlFor="pwd">Password</label>
          <input type="password" id="pwd" name="password" autoComplete="on"/>

          <button type="submit" disabled={loading}>
            { loading ? "Logging in..." : "Login"}
          </button>

          <button onClick={signInWithGoogle} className="continue-with-google">
               Continue with Google
           </button>

          <p>Don't have an account?<span onClick={() => navigate('/signup')}>Sign Up</span></p>

        </form>

        
      </div>
    )
}