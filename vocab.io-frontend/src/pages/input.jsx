import { useState } from "react"
import Sidebar from "../Components/sidebar.jsx"

export default function Input() {
  /* By Default, 'Input' is the active tab */
  const [activeTab, setActiveTab] = useState('input')
  const [aiStage, setAiStage] = useState('prompt') // 'response'
  const [text, setText] = useState('') // Shared Textarea content
  const [language, setLanguage] = useState('')
  const [keywords, setKeywords] = useState([]) // List of dicts of words and meanings
  const [loading, setLoading] = useState(false) // for button showing that AI response is coming
  const [error, setError] = useState('') 
  const [lastProcessedText, setLastProcessedText] = useState('') // Store the last text so that the user can't send a request for the same paragraph.

  const callApi = async (endpoint, body, onSuccess) => {
    /* It is checking language usestate here */
    if (!language) {
      setError("Please select a language")
      return
    }

    setError('')
    setLoading(true)

    try {
      const response = await fetch(`http://127.0.0.1:5000${endpoint}`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(body) /* Here prompt, text and language will be passed */
      });

      const data = await response.json()
      if (!response.ok) {
        setError(data.error || "Something went wrong")
        return
      }

      /* What this function will refer to */
      onSuccess(data)
    } catch(err) {
      setError("Request failed - is the server running?")
    } finally {
      setLoading(false)
    }

  }


  const generateAIText = () => {
    callApi('/api/generate_text', {prompt: text, language}, (data) => {
      /* This function will be called onSuccess(data) and the text will appear in textarea */
      setText(data.text)
      setAiStage('response')
    })
  }

  const extractKeywords = (sourceText) => {
    if (sourceText === lastProcessedText) return
    callApi('/api/keywords', {text: sourceText, language}, (data) => {
      setKeywords(data.keywords)
      setLastProcessedText(sourceText)
    })
  }
  const handleTabClick = (tab) => {
    setActiveTab(tab); // 'generate' or 'input' according to button clicked.
    if (tab === 'generate') {
      setAiStage('prompt')
      setText('') // clear the text when switching tabs
      setKeywords([])
    }
  };

  const handleButtonClick = async () => {
    if (activeTab === 'input') {
      console.log("Generate keywords from ", text)
      console.log("JSON version: ", JSON.stringify({text, language}))

      extractKeywords(text)
    }
    else if (activeTab == 'generate' && aiStage == 'prompt') {
      generateAIText()
    }
    else {
      extractKeywords(text)
    }
 }

  const buttonLabel = 
    /* Loading ? True : False where true and false themselves contain conditions */
    loading ? 
    (activeTab === 'generate' && aiStage === 'prompt') ? "Generating...": "Extracting..." :
    (activeTab === 'input' || aiStage === 'response' ? 'Generate' : 'Prompt')

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
                  placeholder= {activeTab === 'input' ? "Enter your text" : "Write a paragraph about home in italian."}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  readOnly={activeTab === 'generate' && aiStage === 'response'} // Can't delete or edit the ai response
              />
            </div>
              <button onClick={handleButtonClick} 
              className="prompt-button"
              disabled={loading}
              
              >{buttonLabel}</button>

              {error && <p style={{ color: "red" }}>{error}</p>}

              {keywords.length > 0 && (
                <table className="keywords-table">
                  <thead>
                    <tr>
                      <th>Words</th>
                      <th>Meanings</th>
                    </tr>
                  </thead>
                  <tbody>
                    {keywords.map((k, i) => (
                      <tr key={i}>
                        <td>{k.word}</td>
                        <td>{k.meaning}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
              
          </div>
        </div>
    )
  }
   



// La mia casa è un luogo molto accogliente e luminoso dove posso rilassarmi dopo una lunga giornata.Al centro della casa c'è la cucina, uno spazio caldo dove amiamo cucinare e mangiare insieme.Il soggiorno è comodo, con un grande divano e libri per riposare in tranquillità.