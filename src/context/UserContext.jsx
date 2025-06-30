import { useState, useEffect } from "react";
import run from "../gemini";
import datacontext from "./DataContext";
import PropTypes from "prop-types";

function UserContextProvider({ children }) {
  let [speaking, setSpeaking] = useState(false);
  let [prompt, setPrompt] = useState("Listening...");
  let [response, setResponse] = useState(false);
  let [voices, setVoices] = useState([]);

  // ✅ Ensure voices are loaded properly
  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);
    };
    
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  function speak(text) {
    let text_speak = new SpeechSynthesisUtterance(text);
    text_speak.volume = 1;
    text_speak.rate = 1;
    text_speak.pitch = 1;
    text_speak.lang = "en-US"; 

    // ✅ Ensure voices are set before speaking
    text_speak.voice =
      voices.find(
        (voice) =>
          voice.name.includes("Zira") ||
          voice.name.includes("Female") ||
          voice.name.includes("Google US English")
      ) || voices[0];

    window.speechSynthesis.speak(text_speak);
  }

  async function aiResponse(prompt) {
    let text = await run(prompt);
    let newText = text
    .replaceAll("google", "Syeda Qurrat")
    .replaceAll("Google", "Syeda Qurrat")
    .replaceAll("I am a large language model", "I am Anna, your AI assistant") 
    .replaceAll("I am an AI model", "I am Anna, your AI assistant")
    .replaceAll("I am an AI", "I am Anna, your AI assistant")
    .replaceAll("As a large language modle i don't", "I am Anna, your AI assistant");

    setPrompt(newText);
    speak(newText);
    setResponse(true);

    setTimeout(() => {
      setSpeaking(false);
    }, 5000);
  }

  let speechRecognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition ||
    window.mozSpeechRecognition ||
    window.msSpeechRecognition ||
    window.oSpeechRecognition;

  let recognition = new speechRecognition();
  recognition.continuous = false; // ✅ Stop after one sentence
  recognition.onresult = (e) => {
    let currentindex = e.resultIndex;
    let transcript = e.results[currentindex][0].transcript;
    setPrompt(transcript);
    takeCommond(transcript.toLowerCase())
  };



  function takeCommond(commond) {
    if (commond.includes("open") && commond.includes("google")) {
      window.open("https://www.google.com", "_blank");
      speak("Opening Google");
      setPrompt("Opening Google...");
      setResponse(true);
    } 
    else if (commond.includes("open") && commond.includes("youtube")) {
      window.open("https://www.youtube.com", "_blank");
      speak("Opening YouTube");
      setPrompt("Opening YouTube...");
      setResponse(true);
    } 
    else if (commond.includes("open") && commond.includes("facebook")) {
      window.open("https://www.facebook.com", "_blank");
      speak("Opening Facebook");
      setPrompt("Opening Facebook...");
      setResponse(true);
    } 
    else if (commond.includes("time")) {
      let time = new Date().toLocaleTimeString(undefined, {
        hour: "numeric",
        minute: "numeric",
      });
      speak(`The time is ${time}`);
      setPrompt(`The time is ${time}`);
      setResponse(true);
    } 
    else if (commond.includes("date")) {
      let date = new Date().toLocaleDateString(undefined, {
        year: "numeric",
        month: "numeric",
        day: "numeric",
      });
      speak(`Today's date is ${date}`);
      setPrompt(`Today's date is ${date}`);
      setResponse(true);
    } 
    else if (
      commond.includes("say thanks my mentor") || 
      commond.includes("say thanks my teacher")
    ) {
      let thanksMessage =
        "I would like to express my gratitude to my mentors: Sir Ameen Alam, Sir Daniyal Nagori, Sir Zia Khan, Miss Hina Naseer, Sir Ali Jawwad, and Sir Fahim. Thank you for your guidance and support.";
      speak(thanksMessage);
      setPrompt(thanksMessage);
      setResponse(true);
    } 
    else if (commond.includes("what is your name") || commond.includes("tell me your name")) {
      let nameMessage = "My name is Anna. I am your AI assistant.";
      speak(nameMessage);
      setPrompt(nameMessage);
      setResponse(true);
    }
    else {
      aiResponse(commond);
    }
  
    setTimeout(() => {
      setSpeaking(false);
    }, 5000);
  }
  



  let value = {
    recognition,
    speaking,
    setSpeaking,
    speak,
    prompt,
    setPrompt,
    response,
    setResponse,
  };

  return <datacontext.Provider value={value}>{children}</datacontext.Provider>;
}

UserContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { UserContextProvider };




