const { text2SQL } = require("../../utils");
const { preprompt } = require("../../preprompt");

exports.handler = async function (event, context) {
    let request = "";

    if (event.httpMethod == "POST") {
        request = JSON.parse(event.body).request;
    } else {
        request = "Bonjour";
    }
    console.log(request);

    const response = await text2SQL(preprompt + request);
    console.log('Réponse de ChatGPT:');
    console.log(response);

    return {
        statusCode: 200,
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify({ data: response }),
    };
};
