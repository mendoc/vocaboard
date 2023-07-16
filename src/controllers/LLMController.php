<?php

namespace Vocaboard;

use Vocaboard\LLMManager;
use Illuminate\Database\Capsule\Manager as BDDProjet;

class LLMController
{
    public static function processRequest()
    {
        // Get POST data
        $params = post_json();
        $request = $params["request"];

        $llm = new LLMManager("default");
        $llmResponse = $llm->text2SQL(Utils::getPreprompt() . $request);
        $cleanResponse = trim(substr($llmResponse, strpos($llmResponse, "{")));
        $jsonResponse = json_decode($cleanResponse, true);

        $result = BDDProjet::select($jsonResponse["sql"]);

        if (!$result or count($result) === 0) {
            return json('{"error": "true", "message": "Data not found."}');
        }

        $jsonResponse["data"] = $result;

        return json_encode($jsonResponse);
    }
}
