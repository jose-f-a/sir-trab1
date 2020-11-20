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
        <button onclick="currentSeason()">Calendário atual</button>
        <button onclick="currentStandings()">Classificação Atual</button>
        <button onclick="getNoticias()">Notícias</button>
        <button onclick="arquivo()">Arquivo</button>
      </div>

      <div class="content" id="content">
        <!-- Alterar -->
      </div>
    </div>
  </body>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-easing/1.4.1/jquery.easing.min.js"></script>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>

  <script>
    $(document).ready(function () {
      $("#content").empty();

      nextRace();
      currentStandings();
    });

    function currentSeason() {
      $("#content").empty();

      $.ajax({
        url: "http://ergast.com/api/f1/current.json",
        method: "GET",
      }).done(function (response) {

        /** HTML*/
        var temporada = `<h1>Temporada: ${response.MRData.RaceTable.season} </h1>`;
        $("#content").append(temporada);

        var table = `<div class="table" id="tabela">
          <div class="row header green">
            <div class="cell">Ronda</div>
            <div class="cell">Localização</div>
            <div class="cell">Nome do Circuito</div>
            <div class="cell">Nome da Corrida</div>
            <div class="cell">Data</div>
            <div class="cell">Hora</div>
          </div>
        </div>`;

        $("#content").append(table);

        for (var i = 0; i <= response.MRData.total; i++) {
          var j = response.MRData.RaceTable.Races[i];
          var current = `<div class="row">
              <div class="cell">${j.round}</div>
              <div class="cell">${j.Circuit.Location.locality}, ${j.Circuit.Location.country}</div>
              <div class="cell">${j.Circuit.circuitName}</div>
              <div class="cell">${j.raceName}</div>
              <div class="cell">${j.date}</div>
              <div class="cell">${j.time}</div>
            </div>`;

          $("#tabela").append(current);
        }
      });
    }

    function currentStandings() {
      $("#content").empty();
      /** Getting Driver Standings */
      $.ajax({
        url: "http://ergast.com/api/f1/current/driverStandings.json",
        method: "GET",
      }).done(function (response) {

        var temporada = `<h1>Temporada: ${response.MRData.StandingsTable.season} </h1>`;
        $("#content").append(temporada);

        var tablePilotos = `<div class="table" id="tabelaPilotos">
          <div class="row header green">
            <div class="cell">Posição</div>
            <div class="cell">Nome</div>
            <div class="cell">Pontos</div>
            <div class="cell">Vitórias</div>
            <div class="cell">Equipa</div>
          </div>
        </div>`;

        $("#content").append(tablePilotos);

        for (var i = 0; i <= response.MRData.total; i++) {
          for (var k = 0; k <= response.MRData.StandingsTable.StandingsLists[i].DriverStandings.length; k++) {
            var j = response.MRData.StandingsTable.StandingsLists[i].DriverStandings[k];

            var currentPilotos = `<div class="row">
                <div class="cell">${j.position}</div>
                <div class="cell">${j.Driver.givenName} ${j.Driver.familyName} </div>
                <div class="cell">${j.points}</div>
                <div class="cell">${j.wins}</div>
                <div class="cell">${j.Constructors[i].name}</div>
              </div>`;

            $("#tabelaPilotos").append(currentPilotos);
          }
        }
      });

      /** Getting Constructors Standings */
      $.ajax({
        url: "http://ergast.com/api/f1/current/constructorStandings.json",
        method: "GET",
      }).done(function (response) {

        var tableConstruct = `<div class="table" id="tabelaConstruct">
          <div class="row header green">
            <div class="cell">Posição</div>
            <div class="cell">Nome</div>
            <div class="cell">Pontos</div>
            <div class="cell">Vitórias</div>
            <div class="cell">Equipa</div>
          </div>
        </div>`;

        $("#content").append(tableConstruct);

        for (var i = 0; i <= response.MRData.total; i++) {
          for (var k = 0; k <= response.MRData.StandingsTable.StandingsLists[i].ConstructorStandings.length; k++) {
            var j = response.MRData.StandingsTable.StandingsLists[i].ConstructorStandings[k];

            var currentConstruct = `<div class="row">
              <div class="cell">${j.position}</div>
              <div class="cell">${j.Constructor.name}</div>
              <div class="cell">${j.points}</div>
              <div class="cell">${j.wins}</div>
              <div class="cell">${j.Constructor.nationality}</div>
            </div>`;

            $("#tabelaConstruct").append(currentConstruct);
          }
        }
      });
    }

    function getNoticias() {
      $("#content").empty();
      var settings = {
        "url": "https://newsapi.org/v2/everything?q=f1&apiKey=277b737d73cb451b99b3364115c2e329",
        "method": "GET",
        "headers": {
          "Cookie": "__cfduid=dc154bae286924056d29d493a6eea89231605739465"
        },
      };

      $.ajax(settings).done(function (response) {
        console.log(response);

        for (var i = 0; i < 6; i++){
          var j = response.articles[i];
          var noticia = `<div class="noticia" id="noticia${i}">
              <a href="${j.url}">Link</a>
              <h2 class="titulo"> ${j.title} </h2>
              <h4 class="source"> ${j.source.name} </h4>
              <p class="data">${j.publishedAt}</p>
              <p class="corpo">${j.content}</p>
              <img src="${j.urlToImage}" alt="${j.title}" width="625" height="350">
            </div>`

            $("#content").append(noticia);
        }

      });
    }

    function nextRace() {
      $.ajax({
        url: "http://ergast.com/api/f1/current/next.json",
        method: "GET",
      }).done(function (response) {
        for (var i = 0; i < response.MRData.total; i++) {
          var j = response.MRData.RaceTable.Races[i];
          var proximaCorrida = `<div>
              <h2>${j.raceName}</h2>
              <h4>${j.Circuit.circuitName}</h4>
              <h4>${j.Circuit.Location.country}</h4>
              <h5>${j.date}</h5>
            </div>`;

            $("#content").append(proximaCorrida);
        }
      });
    }
  </script>
</html>
