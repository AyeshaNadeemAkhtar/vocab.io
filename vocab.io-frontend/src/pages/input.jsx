import { useState } from "react"
import Sidebar from "../Components/sidebar.jsx"

export default function Input() {
  /* By Default, 'Input' is the active tab */
  const [activeTab, setActiveTab] = useState('input')
  const [aiStage, setAiStage] = useState('prompt') // 'response'
  const [text, setText] = useState('') // Shared Textarea content
  const [language, setLanguage] = useState('')

  const handleTabClick = (tab) => {
    setActiveTab(tab); // 'generate' or 'input' according to button clicked.
    if (tab === 'generate') {
      setAiStage('prompt')
      setText('') // clear the text when switching tabs
    }
  };

  const handleButtonClick = async () => {
    if (activeTab === 'input') {
      console.log("Generate keywords from ", text)
      console.log("JSON version: ", JSON.stringify({text, language}))

      /* Only pass text with language selected */
      if (!language) {
        console.error("Please select a language")
        return
      }

      try {
        const response = await fetch('http://127.0.0.1:5000/api/keywords', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify( {text, language} )
        });

        const data = await response.json();
        console.log("Data: ", data)

        if (!response.ok) {
          console.error("Error: ", data.error);
          return;
        }

        console.log("Keywords: ", data.keywords)
      } catch(err) {
        console.log("Request failed: ", err)
      }
    }
    else if (aiStage === 'prompt') {
      console.log("Sending prompt to AI", text)
      setText("The response came back")
      setAiStage('response')
    }
    else
    {
      console.log("Generating keywords from AI response")
    }
  }
  
  const buttonLabel = 
    activeTab === 'input' || aiStage === 'response' ? 'Generate' : 'Prompt'

    return (
        <div className="input-panel">
          <Sidebar />
          <div className="input-main">
            <h1>Input/Generate Text</h1>
            <select 
              className="language-dropdown"
              name="language-options"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              
            >
              <option value="">Select a language</option>
              <option value="english">English</option>
              <option value="spanish">Spanish</option>
              <option value="finnish">Finnish</option>
              <option value="italian">Italian</option>
            </select>
            <div className="input-enter-part">
              <div className="input-tabs">
                <button  
                  className={activeTab === 'input' ? 'active-tab' : 'tab'}
                  onClick={() => handleTabClick('input')}
                >
                  Input Text
                </button> 
                <button 
                  className={activeTab === 'generate' ? 'active-tab' : 'tab'}
                  onClick={() => handleTabClick('generate')}
                >
                  Generate text with AI
                </button>
              </div>
              <textarea 
                  placeholder= {activeTab === 'input' ? "Enter your text" : "Give me a prompt"}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  readOnly={activeTab === 'generate' && aiStage === 'response'} // Can't delete or edit the ai response
              />
            </div>
              <button onClick={handleButtonClick} className="prompt-button">{buttonLabel}</button>
              
          </div>
        </div>
    )
  }
   



// La mia casa è un luogo molto accogliente e luminoso dove posso rilassarmi dopo una lunga giornata.Al centro della casa c'è la cucina, uno spazio caldo dove amiamo cucinare e mangiare insieme.Il soggiorno è comodo, con un grande divano e libri per riposare in tranquillità.