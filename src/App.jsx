
import "./App.css";
import { useContext } from "react";
import datacontext from "./context/DataContext"; 
import { CiMicrophoneOn } from "react-icons/ci";
import va from "./assets/Anna.jpeg";
import speak from "./assets/speak.gif";
import aigif from "./assets/aiVoice.gif";

function App() {
  const { recognition, speaking , setSpeaking , prompt , response , setPrompt , setResponse } = useContext(datacontext); // ✅ Now it works

  return (
    <div className="main">
      <img  src={va} alt="AI Assistant" id="Anna"  />
      <span>I am Anna, your Advanced Virtual Assistant</span>

       {!speaking?
       <button onClick={() => {
        setPrompt("Listening...")
        setSpeaking (true);
        setResponse(false)
        recognition.start(); // ✅ Now Mic will open
        
      }}> 
        Click Here <CiMicrophoneOn />
      </button> 
      :
      <div className="response">
        {!response?
         <img src={speak} alt="" id= "speak" />
        :
         <img src={aigif} alt="" id= "aigif" />
        }
        
        <p>{prompt}</p>
      </div>
      }
      
    </div>
  );
}

export default App;





