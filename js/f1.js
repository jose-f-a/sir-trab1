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
                <a href="${j.Circuit.url}" target="_blank">Sobre o circuito <b> > </b></a>
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
      for (
        var k = 0;
        k <=
        response.MRData.StandingsTable.StandingsLists[i].DriverStandings.length;
        k++
      ) {
        var j =
          response.MRData.StandingsTable.StandingsLists[i].DriverStandings[k];

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

    for (var i = 0; i < 6; i++) {
      var j = response.articles[i];
      var noticia = `<div class="noticia" id="noticia${i}">
            <h2 class="titulo"> ${j.title} </h2>
            <h4 class="source"> ${j.source.name} </h4>
            <p class="data">${j.publishedAt}</p>
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
