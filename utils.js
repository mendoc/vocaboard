require('dotenv').config(); // Charge les variables d'environnement à partir du fichier .env
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// Fonction pour envoyer une requête à ChatGPT
async function chatGPT(message) {
    try {
        const completion = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: message,
            temperature: 0.2, // Contrôle le degré de diversité de la réponse (0.2 à 1.0)
            n: 1, // Génère une seule réponse
            max_tokens: 500
        });

        return completion.data.choices[0].text.trim();
    } catch (error) {
        if (error.response) {
            console.log(error.response.status);
            console.log(error.response.data);
        } else {
            console.log(error.message);
        }
        return null;
    }
}

exports.text2SQL = chatGPT;