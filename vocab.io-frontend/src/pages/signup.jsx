import { useNavigate } from "react-router-dom"
import { supabase } from "../lib/supabase-client"
import { useState } from "react"
import Lottie from "lottie-react"
import signUp from "../animation/Signup.json"

export default function SignUp() {
  const navigate = useNavigate()
  
  const [loading, setLoading] = useState(false)


  async function handleSubmit(e) {
    e.preventDefault()

    if (loading) return

    setLoading(true)
   
    const form = e.target 
    const name = form.name.value 
    const email = form.email.value 
    const password = form.password.value 


    /* Latest */
    const {data, error} = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    console.log("Data is this from signup page: ", data) /* bp */

    await supabase.from("profiles").insert([
      {
        id: data.user.id,
         name: name
      }
    ]);

    if (error) {
      console.log(error.message)
      setLoading(false)
      return
    }

    
    setLoading(false)
    console.log("User created: ", data.user)

     navigate("/onboarding/reason")
  }

    return (
      <div className="container">
          <form onSubmit={handleSubmit} method="POST" className="sign-up-form">
            <h2>Sign Up with vocab.io</h2>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" autoComplete="on"/>

            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" autoComplete="on"/>

            <label htmlFor="pwd">Password</label>
            <input type="password" id="pwd" name="password" autoComplete="on"/>

            <button type="submit" disabled={loading}>
              {loading ? "Signing up..." : "Sign Up"}
            </button>
            <p>Already have an account?<span onClick={() => navigate('/login')}>Login</span></p>
          </form>
        

        <div className="signup-illustration">
          <Lottie animationData={signUp} loop={true} className="lottie"/>
        </div>
      </div>
    )
}