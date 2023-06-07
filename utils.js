require('dotenv').config(); // Charge les variables d'environnement à partir du fichier .env
const { Configuration, OpenAIApi } = require("openai");
const mysql = require("mysql2/promise");

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

async function execSQL(sql) {
    const con = await mysql.createConnection({
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASS
    });
    
    if (con) {
        let [result] = await con.execute(sql);

        if (result) {
            console.log(result.length);
            return { error: false, data: result };
        } else {
            return { error: true, message: "Impossible de récupérer le classement" };
        }
    } else {
        return { error: true, message: "Impossible de se connecter à la base de données" };
    }
}

exports.execSQL = execSQL;
exports.text2SQL = chatGPT;