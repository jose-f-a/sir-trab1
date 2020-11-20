<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link
      href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap"
      rel="stylesheet"
    />
    <link
      href="https://fonts.googleapis.com/css2?family=Quicksand&display=swap"
      rel="stylesheet"
    />
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/normalize/5.0.0/normalize.min.css"
    />
    <link rel="stylesheet" href="../styles/f1.css" />
    <link rel="stylesheet" href="../styles/table.css" />
    <title>F1 Portal</title>
  </head>
  <body>
    <nav class="Header">
      <a id="logo" href="index.html">Sports Portal</a>
    </nav>

    <div class="grid-container">
      <div class="side-menu">
        <button onclick="currentStandings()">Classificação</button>
        <button onclick="currentSeason()">Calendário</button>
        <button onclick="getNoticias()">Notícias</button>
        <button onclick="arquivo()">Arquivo</button>
      </div>

      <div class="content" id="content">
        <!-- Alterar -->
        <div class="loader" id="loader-1"></div>
        <div class="first" id="first"></div>
        <div class="second" id="second"></div>
      </div>
    </div>
  </body>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-easing/1.4.1/jquery.easing.min.js"></script>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
  <script src="../js/f1.js"></script>
</html>
