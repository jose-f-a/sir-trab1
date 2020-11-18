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
    <link rel="stylesheet" href="../styles/landing.css" />
    <title>F1 Portal</title>
  </head>
  <body>
    <h1>Hey</h1>
    <button onclick="currentSeason()">Temporada atual</button>
    <button onclick="currentDriverStandings()">Classificação de Pilotos</button>
    <button onclick="currentConstructorsStandings()">
      Classificação de Construtores
    </button>
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
