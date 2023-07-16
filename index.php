<?php

require_once __DIR__ . "/vendor/autoload.php";

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->safeLoad();

use Vocaboard\Utils;
use Vocaboard\LLMController;
use Steampixel\Route;

initbdd();

Route::add('/', function () {
    return Utils::view("home");
});

Route::add('/process-request', function () {
    return LLMController::processRequest();
}, 'post');

Route::pathNotFound(function ($path) {
    header('HTTP/1.0 404 Not Found');
    echo 'La page que vous demandez "' . $path . '" est introuvable.';
});

Route::run('/');