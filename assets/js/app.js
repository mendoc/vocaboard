if ("webkitSpeechRecognition" in window) {
    // Initialize webkitSpeechRecognition
    let speechRecognition = new webkitSpeechRecognition();

    // String for the Final Transcript
    let final_transcript = "";

    // to control if listening or not
    let isListening = false;

    // Set the properties for the Speech Recognition object
    speechRecognition.continuous = true;
    speechRecognition.interimResults = true;
    speechRecognition.lang = "fr-FR";

    // Callback Function for the onStart Event
    speechRecognition.onstart = () => {
        // Show the Status Element
        //"#status".css("display", "block");
    };
    speechRecognition.onerror = () => {
        // Hide the Status Element
        //"#status".css("display", "none");
    };
    speechRecognition.onend = () => {
        // Hide the Status Element
        //"#status".css("display", "none");

        let transcript = "#final".text();
        if (transcript.trim() == "") {
            transcript = "Propose-moi une requête au choix.";
            "#final".text(transcript);
        }
        else transcript += "?";

        sendRequest(transcript);
    };

    speechRecognition.onresult = (event) => {
        // Create the interim transcript string locally because we don't want it to persist like final transcript
        let interim_transcript = "";

        // Loop through the results from the speech recognition object.
        for (let i = event.resultIndex; i < event.results.length; ++i) {
            // If the result item is Final, add it to Final Transcript, Else add it to Interim transcript
            if (event.results[i].isFinal) {
                final_transcript = event.results[i][0].transcript;
            } else {
                interim_transcript += event.results[i][0].transcript;
            }
        }

        "#final".html(final_transcript.ucfirst());
        //"#interim".innerHTML = interim_transcript;
    };

    document.body.onkeydown = function (e) {
        if (e.key == " " || e.code == "Space") {
            start()
        }
    }

    document.body.onkeyup = function (e) {
        if (e.key == " " || e.code == "Space") {
            stop()
        }
    }

    // Set the onClick property of the start button
    "#start".click(start);

    // Set the onClick property of the stop button
    "#stop".click(stop);

    function loadList(data) {
        let headers = [];

        if (data.length > 0) {
            const first = data[0];
            headers = Object.keys(first);
            console.log(headers)
        }

        // Init datatable
        let table = new DataTable('#liste', {
            columns: [
                { data: 'id' },
                { data: 'nom' },
                { data: 'email' },
                { data: 'adresse' }
            ]
        });
    }

    function start() {
        if (isListening) return;

        final_transcript = "";
        "#final".text("");
        "#json".text("");
        "#sql".text("");
        "#start".css("display", "none");
        "#stop".css("display", "block");

        // Start the Speech Recognition
        speechRecognition.start();
        isListening = true;
    }

    function stop() {
        if (!isListening) return;

        "#stop".css("display", "none");
        "#start".css("display", "block");
        // Stop the Speech Recognition
        speechRecognition.stop();
        isListening = false;
    }

    function sendRequest(text2send) {
        console.log(text2send)

        const URL = "/.netlify/functions/text-to-sql";

        fetch(URL, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                request: text2send
            })
        })
            .then(res => res.json())
            .then((res) => {
                console.log(res)
                if (res.sql) {
                    const jsonFormatted = JSON.stringify(res, null, 2)
                    console.log(jsonFormatted)
                    "#json".text(jsonFormatted)
                    "#sql".text(res.sql)
                    loadList(res.data)
                    Prism.highlightAll();
                }
            })
    }
} else {
    console.log("Speech Recognition Not Available");
}