// import { GoogleGenerativeAI } from "@google/generative-ai";

// const apiKey = import.meta.env.VITE_GEMINI_API_KEY || "inser the api key here"; // Fixed process.env issue for Vite

// const genAI = new GoogleGenerativeAI(apiKey);

// const model = genAI.getGenerativeModel({
//   model: "gemini-2.0-flash",
// });

// const generationConfig = {
//   temperature: 1,
//   topP: 0.95,
//   topK: 40,
//   maxOutputTokens: 20,
//   responseMimeType: "text/plain",
// };

// async function run(prompt) {
//   const chatSession = model.startChat({
//     generationConfig,
//     history: [],
//   });

//   const result = await chatSession.sendMessage(prompt);
//   return result.response.text();
// }

// export default run;






import { GoogleGenerativeAI } from "@google/generative-ai";

// ✅ Only from environment, no fallback key
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("GEMINI API Key not found! Please set VITE_GEMINI_API_KEY in .env file.");
}

const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 20,
  responseMimeType: "text/plain",
};

async function run(prompt) {
  const chatSession = model.startChat({
    generationConfig,
    history: [],
  });

  const result = await chatSession.sendMessage(prompt);
  return result.response.text();
}

export default run;
