<?php

use Illuminate\Database\Capsule\Manager as BDDProjet;

function initbdd()
{
    $capsule = new BDDProjet();
    $capsule->addConnection([
        'driver'    => 'mysql',
        'host'      => varenv('DB_HOST'),
        'database'  => varenv('DB_NAME'),
        'username'  => varenv('DB_USER'),
        'password'  => varenv('DB_PASS'),
        'charset'   => 'utf8',
        'collation' => 'utf8_unicode_ci',
        'prefix'    => '',
    ]);

    // Make this Capsule instance available globally via static methods... (optional)
    $capsule->setAsGlobal();

    // Setup the Eloquent ORM... (optional; unless you've used setEventDispatcher())
    $capsule->bootEloquent();
}

function varenv($varname)
{
    return $_ENV[$varname];
}

function d($var)
{
    var_dump($var);
}

function dd(...$var)
{
    var_dump($var);
    die;
}

function redirect($ressource)
{
    header("Location: $ressource");
    exit();
}

function json($reponse)
{
    header("Content-Type: application/json");
    return $reponse;
}

function post_json()
{
    return json_decode(file_get_contents('php://input'), true);
}

function erreur($message)
{
    $reponse = ["erreur" => true, "message" => $message];
    return json($reponse);
}
