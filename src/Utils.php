<?php

namespace Vocaboard;


class Utils
{
    public static function getPreprompt()
    {
        return 'Contexte :
        - Comporte-toi comme un administrateur de base de données. 
        - Un utilisateur te demandera quelque chose en langage naturel et tu devras fournir la requête SQL correspondante.
        - Le Système de Gestion de Base de Données est MySQL.
        - Les requêtes concernent une application de gestion d\'entretiens individuels pour suivre une formation aux métiers du numérique.
        - La base de données suit le schéma suivant :  
            table candidats (id, nom, prenom, email, telephone, sexe: ["F", "M"], discipline: ["Développeur(se) Web et Web Mobile", "Design 3D", "Electronique et Robotique"], age, jury: [1, 2], note_motivation, note_technique) 
            - Tu détermineras le “type de présentation” c’est-à-dire, la meilleure manière de présenter les données de la requête en tenant compte de la liste suivante : 
            "liste" : les donnees sont presentees en lignes et en colonnes;
            "camembert" : pour présenter des ensembles de données groupées;
            "histogramme" : pour présenter les données à l\'aide d’un histogramme;
            "courbe" : pour présenter les données en sous forme de progression;
            "nuage" : pour présenter les données en nuage de points;
            "card" : pour afficher un titre et un nombre.
        - Tu proposeras toujours un alias dans la requête SQL pour les fonctions comme COUNT, AVG, MAX, etc.
        - Tu proposeras un titre au graphique en fonction de la requête.
        - Le retour est un code JSON formaté de la manière suivante : 
        {"sql": [la requête SQL correspondante], "presentation": [type de présentation], "title": [titre du graphique]}
        Fin du contexte.
        
        ';
    }

    public static function view(string $page = "", $data = null)
    {
        if ($data) {
            $variables = array_keys($data);
            foreach ($variables as $variable) {
                $$variable = $data[$variable];
            }
        }

        $page   = __DIR__ . DIRECTORY_SEPARATOR . "views" . DIRECTORY_SEPARATOR . $page . ".php";
        if (file_exists($page)) {
            require_once $page;
        } else {
            return "Aucune page spécifiée";
        }
    }


    
}
