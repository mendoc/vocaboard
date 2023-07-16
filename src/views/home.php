<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Open+Sans&display=swap" rel="stylesheet">
    <link href="/assets/css/style.css" rel="stylesheet" />
    <link href="/assets/css/prism.css" rel="stylesheet" />

    <link rel="stylesheet" href="//cdn.datatables.net/1.13.4/css/jquery.dataTables.min.css">

    <title>Vocaboard</title>

    <style>
        body,
        .dataTables_wrapper {
            font-family: 'Open Sans', sans-serif;
        }
    </style>
</head>

<body>
    <div class="container mx-auto px-4">
        <h2 class="mt-4 mb-10 text-3xl font-bold border-b border-black-500">Vocaboard</h2>
        <div class="mt-4 mb-10">
            <button id="start" class="space-x-3">
                <span
                    class="py-1 px-3 bg-green-500 text-white text-sm font-semibold rounded-md shadow focus:outline-none">
                    Appuyez ici pour parler
                </span>
                <span class="sm:hidden italic text-gray-800">Ou maintenez la touche <span
                        class="rounded bg-gray-400 text-white py-1 px-1 text-xs">Espace</span></span>
            </button>
            <button class="hidden" id="stop">
                <span
                    class="py-1 px-3 bg-red-500 text-white text-sm font-semibold rounded-md shadow focus:outline-none">Terminer</span>
                <span class="italic text-gray-800">En écoute...</span>
            </button>
        </div>
        <p>Transcription</p>
        <pre class="drop-shadow-md"><code class="language-text" id="final"></code></pre>
        <div class="mt-10">
            <h2 id="list-title" class="mt-4 mb-3 text-lg font-bold">Résulats de la requête</h2>
            <table id="liste" class="border border-black-100">
                <thead>
                    <tr>
                        <th>Liste</th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
        </div>
        <div class="mt-5 pt-3 border-t">
            <p class="mt-20-">Resultat JSON</p>
            <pre class="drop-shadow-md"><code class="language-json blur-sm-" id="json"></code></pre>
            <p>Requête SQL</p>
            <pre class="language-sql drop-shadow-md"><code class="language-sql" id="sql"></code></pre>
        </div>
    </div>

    <script src="//code.jquery.com/jquery-3.5.1.js" defer></script>
    <script src="//cdn.datatables.net/1.13.4/js/jquery.dataTables.min.js" defer></script>
    <script src="/assets/js/prism.js" defer></script>
    <script src="/assets/js/utils.js" defer></script>
    <script src="/assets/js/app.js" defer></script>
</body>

</html>