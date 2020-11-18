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
        <button onclick="currentSeason()">Temporada atual</button>
        <button onclick="currentDriverStandings()">
          Classificação de Pilotos
        </button>
        <button onclick="currentConstructorsStandings()">
          Classificação de Construtores
        </button>
      </div>
      <div class="content">
        <div class="table">
          <div class="row header green">
            <div class="cell">Name</div>
            <div class="cell">Age</div>
            <div class="cell">Occupation</div>
            <div class="cell">Location</div>
          </div>

          <div class="row">
            <div class="cell"></div>
            <div class="cell"></div>
            <div class="cell"></div>
            <div class="cell"></div>
          </div>
        </div>
      </div>
    </div>
  </body>

  <script>
    function currentSeason() {
      var requestOptions = {
        method: "GET",
        redirect: "follow",
      };

      fetch("http://ergast.com/api/f1/current.json", requestOptions)
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.log("error", error));
    }

    function currentDriverStandings() {
      var requestOptions = {
        method: "GET",
        redirect: "follow",
      };

      fetch(
        "http://ergast.com/api/f1/current/driverStandings.json",
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.log("error", error));
    }
    function currentConstructorsStandings() {
      var requestOptions = {
        method: "GET",
        redirect: "follow",
      };

      fetch(
        "http://ergast.com/api/f1/current/constructorStandings.json",
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.log("error", error));
    }
  </script>
</html>
