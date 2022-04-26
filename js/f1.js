const loader = `<div class='loader' id='loader-1'></div>`;

$(document).ready(function () {
  $("#content").empty();

  nextRace();
});

function nextRace() {
  $("#content").empty();

  $.ajax({
    url: "http://ergast.com/api/f1/current/next.json",
    method: "GET",
  }).done(function (response) {
    for (var i = 0; i < response.MRData.total; i++) {
      var j = response.MRData.RaceTable.Races[i];
      const data = j.date + " " + j.time;

      var proximaCorrida = `<div class="nextrace-container" id="nextRace">
            <div class="nextrace">
              <div class="nextrace-preview">
                <h6>Próxima corrida</h6>
                <h2>${j.raceName}</h2>
                <div class="text-svg">
                  <a href="${j.Circuit.url}">Sobre o circuito </a>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#333333" height="16px">
                    <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                  </svg>
                </div>
              </div>
              <div class="nextrace-info">
                <h6>${j.raceName}</h6>
                <h2>${j.Circuit.circuitName}</h2>
                <h4>${j.date}</h4>
                <h4 id="counter"></h4>
              </div>
            </div> 
          </div>`;

      $("#content").append(proximaCorrida);

      /* Countdown */
      var countDownDate = new Date(data).getTime();
      // Update the count down every 1 second
      var x = setInterval(function () {
        // Get today's date and time
        var now = new Date().getTime();

        // Find the distance between now and the count down date
        var distance = countDownDate - now;

        // Time calculations for days, hours, minutes and seconds
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Display the result in the element with id="demo"
        document.getElementById("counter").innerHTML =
          days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
        // If the count down is finished, write some text
        if (distance < 0) {
          clearInterval(x);
          document.getElementById("counter").innerHTML = "Expirou";
        }
      }, 1000);

      /* Weather 
      const lat = j.Circuit.Location.lat;
      const long = j.Circuit.Location.long;

      const settings = {
        async: true,
        crossDomain: true,
        url:
          "https://aerisweather1.p.rapidapi.com/forecasts/" + lat + "," + long,
        method: "GET",
        headers: {
          "x-rapidapi-key":
            "4b3b8118a1msh9f9fa3a7995d4d1p1340c9jsn4c7d56025204",
          "x-rapidapi-host": "aerisweather1.p.rapidapi.com",
        },
      };

      $.ajax(settings).done(function (response) {
        console.log(response);
        for (var i = 0; i <= 1; i++) {
          for (var k = 0; k <= 5; k++) {
            var j = response.response[i];

            // Extract date from string
            var date = new Date(j.periods[k].validTime);
            year = date.getFullYear();
            month = date.getMonth() + 1;
            dt = date.getDate();
            day = date.getDay();

            if (dt < 10) {
              dt = "0" + dt;
            }
            if (month < 10) {
              month = "0" + month;
            }

            switch (day) {
              case 0:
                day = "Domingo (Corrida)";
                break;
              case 1:
                day = "Segunda-feira";
                break;
              case 2:
                day = "Terça-feira";
                break;
              case 3:
                day = "Quarta-feira";
                break;
              case 4:
                day = "Quinta-feira";
                break;
              case 5:
                day = "Sexta-feira (Treinos)";
                break;
              case 6:
                day = "Sábado (Qualificações)";
                break;
            }

            var weatherContainer = `<div class="weather-container" id="weather">`;
            var weather = `<div class="weather">
                <div class="weather-preview">
                  <h6>Meteorologia</h6>
                  <h5>${j.periods[k].weatherPrimary}</h5>
                  <h2>${j.periods[k].avgFeelslikeC}ºC</h2>
                  <h5>${day}</h5>
                  <h5>${dt + "-" + month + "-" + year}</h5>
                </div>
              </div>
            </div>`;

            $("#weather").append(weather);
            $("#content").append(weatherContainer);
          }
        }
      });
      */
    }
  });
}

function currentStandings() {
  $("#content").empty();

  /** Getting Lastest Race Results */
  $.ajax({
    url: "http://ergast.com/api/f1/current/last/results.json",
    method: "GET",
  }).done(function (response) {
    var latestRace = `<h3>${response.MRData.RaceTable.Races[0].raceName}</h3>`

    var resultadosHeader = `<div class="table" id="resultadosHeader">
        <div class="row header green">
          <div class="cell" style="border-radius: 10px 0px 0px">Posição</div>
          <div class="cell">Nome</div>
          <div class="cell">Pontos</div>
          <div class="cell">Status</div>
          <div class="cell" style="border-radius: 0px 10px 0px 0px">Equipa</div>
        </div>
      </div>`;

    $("#content").append(latestRace);
    $("#content").append(resultadosHeader);

    for (var i = 0; i <= response.MRData.total; i++) {
      for (var k = 0; k <= response.MRData.RaceTable.Races[0].Results.length; k++) {
        var j = response.MRData.RaceTable.Races[0].Results[k];

        var currentResultados = `<div class="row">
              <div class="cell">${j.position}</div>
              <div class="cell">${j.Driver.givenName} ${j.Driver.familyName} </div>
              <div class="cell">${j.points}</div>
              <div class="cell">${j.status}</div>
              <div class="cell">${j.Constructor.name}</div>
            </div>`;

        $("#resultadosHeader").append(currentResultados);
      }
    }
  });

  /** Getting Driver Standings */
  $.ajax({
    url: "http://ergast.com/api/f1/current/driverStandings.json",
    method: "GET",
  }).done(function (response) {
    var pilotosHeader = `<div class="table" id="pilotosHeader">
        <div class="row header green">
          <div class="cell" style="border-radius: 10px 0px 0px">Posição</div>
          <div class="cell">Nome</div>
          <div class="cell">Pontos</div>
          <div class="cell">Vitórias</div>
          <div class="cell" style="border-radius: 0px 10px 0px 0px">Equipa</div>
        </div>
      </div>`;

    $("#content").append(pilotosHeader);

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

        $("#pilotosHeader").append(currentPilotos);
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
          <div class="cell" style="border-radius: 10px 0px 0px">Posição</div>
          <div class="cell">Equipa</div>
          <div class="cell">Pontos</div>
          <div class="cell">Vitórias</div>
          <div class="cell" style="border-radius: 0px 10px 0px 0px">Nacionalidade</div>
        </div>
      </div>`;
    $("#content").append(tableConstruct);

    for (var i = 0; i <= response.MRData.total; i++) {
      for (
        var k = 0;
        k <=
        response.MRData.StandingsTable.StandingsLists[i].ConstructorStandings
          .length;
        k++
      ) {
        var j =
          response.MRData.StandingsTable.StandingsLists[i].ConstructorStandings[
            k
          ];

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

function currentSeason() {
  $("#content").empty();

  $.ajax({
    url: "http://ergast.com/api/f1/current.json",
    method: "GET",
  }).done(function (response) {
    var table = `<div class="table" id="tabela">
        <div class="row header green">
          <div class="cell" style="border-radius: 10px 0px 0px">Ronda</div>
          <div class="cell">Corrida</div>
          <div class="cell">Nome do Circuito</div>
          <div class="cell">Localização</div>
          <div class="cell">Data</div>
          <div class="cell" style="border-radius: 0px 10px 0px 0px">Hora</div>
        </div>
      </div>`;

    $("#content").append(table);

    for (var i = 0; i <= response.MRData.total; i++) {
      var j = response.MRData.RaceTable.Races[i];
      var current = `<div class="row">
            <div class="cell">${j.round}</div>
            <div class="cell">${j.raceName}</div>
            <div class="cell">${j.Circuit.circuitName}</div>
            <div class="cell">${j.Circuit.Location.locality}, ${j.Circuit.Location.country}</div>
            <div class="cell">${j.date}</div>
            <div class="cell">${j.time}</div>
          </div>`;

      $("#tabela").append(current);
    }
  });
}

function getNoticias() {
  $("#content").empty();

  var settings = {
    url:
      "https://newsapi.org/v2/everything?q=f1&apiKey=277b737d73cb451b99b3364115c2e329",
    method: "GET",
    headers: {
      Cookie: "__cfduid=dc154bae286924056d29d493a6eea89231605739465",
    },
  };

  $.ajax(settings).done(function (response) {
    console.log(response);

    for (var i = 0; i < response.articles.length; i++) {
      console.log(response);
      var j = response.articles[i];
      getDate(j.publishedAt);

      var noticia = `<div class="noticia" id="noticia${i}">
            <h2 class="titulo"> ${j.title} </h2>
            <h4 class="source"> ${j.source.name} </h4>
            <p class="data">${dt + '-' + month + '-' + year}</p>
            <br>
            <img src="${j.urlToImage}" alt="${j.title}" width="625" height="360">
            <br><br><br>
            <a href="${j.url}">LER MAIS</a> <br><br><br>
            <hr>
          </div>`;

      $("#content").append(noticia);
    }
  });
}

function getDate(data) {
  /** Extract date from string */
  var date = new Date(data);
  year = date.getFullYear();
  month = date.getMonth() + 1;
  dt = date.getDate();
  hour = date.getHours();
  minute = date.getMinutes();

  if (dt < 10) {
    dt = "0" + dt;
  }
  if (month < 10) {
    month = "0" + month;
  }
  if (hour < 10) {
    hour = "0" + hour;
  }
  if (minute < 10) {
    minute = "0" + minute;
  }

  return year, dt, month, hour, minute; 
}