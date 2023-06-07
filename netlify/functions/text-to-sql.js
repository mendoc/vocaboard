const { text2SQL, execSQL } = require("../../utils");
const { preprompt } = require("../../preprompt");

exports.handler = async function (event, context) {
    let request = "";

    if (event.httpMethod == "POST") {
        request = JSON.parse(event.body).request;
    } else {
        request = "Propose-moi une requête au choix.";
    }
    console.log(request);

    let response = await text2SQL(preprompt + request);

    try {
        response = response.substring(response.indexOf("{"));
        let jsonResponse = JSON.parse(response);

        const result = await execSQL(jsonResponse.sql);
        console.log("result", result);
        let data = result.data;
        data.splice(10);

        jsonResponse.data = data;

        console.log('Réponse de ChatGPT:');
        console.log(jsonResponse);
        return {
            statusCode: 200,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify({ ...jsonResponse }),
        };
    } catch (error) {
        console.log(error);
        return {
            statusCode: 200,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify({ ...error }),
        };
    }
};
