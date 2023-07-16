<?php

namespace Vocaboard;

use GuzzleHttp\Client;

class LLMManager
{
    private $llmname;

    public function __construct($llmname)
    {
        $this->llmname = $llmname;
    }

    public function text2SQL($prompt)
    {
        $client = new Client([
            'base_uri' => 'https://api.openai.com/v1/engines/text-davinci-003/'
        ]);

        $rawResponse = $client->post('completions', [
            'headers' => [
                'Authorization' => 'Bearer ' . varenv("LLM_API_KEY"),
                'Content-Type' => 'application/json',
            ],
            'verify' => false,
            'json' => [
                "prompt" => $prompt,
                "max_tokens" => 500,
                "temperature" => 0.2
            ]
        ]);

        $response = json_decode($rawResponse->getBody());

        return $response->choices[0]->text;
    }
}
