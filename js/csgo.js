const loader = `<div class='loader' id='loader-1'></div>`;

$(document).ready(function () {
  $("#content").empty();
  $("#content").append(loader);

  currentMatches();
});

function currentMatches() {
  $("#content").empty();

  const settings = {
    async: true,
    crossDomain: true,
    url:
      "https://api.pandascore.co/csgo/matches/running?token=wXCRDWYb6feuJ93KE75qvUE4r4AQJvofQGue4F45rPIrsouN948&sort=begin_at",
    method: "GET",
    headers: {},
  };

  $.ajax(settings).done(function (response) {
    console.log(response);
    var titulo = `<h1>Partidas a decorrer:</h1>`;
    $("#content").append(titulo);

    for (let i = 0; i < response.length; i++) {
      console.log(response[i].live_embed_url);
      if (!response[i].live_embed_url) {
        var matches = ` `;
      } else {
        var matches = `<div class="stream-list">
          <div class="match">
            <iframe
              class="stream"
              src="${response[i].live_embed_url}&parent=localhost&autoplay=false"
              height="720"
              width="1280"
              frameborder="0"
              scrolling="no"
              allowfullscreen="true">
            </iframe>
          </div>
        </div>`;
      }
      $("#content").append(matches);
    }
  });
}

function nextMatches() {
  $("#content").empty();
  var titulo = `<h1>Próximas partidas:</h1>`;
  $("#content").append(titulo);

  const settings = {
    async: true,
    crossDomain: true,
    url:
      "https://api.pandascore.co/csgo/matches/upcoming?token=wXCRDWYb6feuJ93KE75qvUE4r4AQJvofQGue4F45rPIrsouN948&per_page=25&sort=begin_at",
    method: "GET",
    headers: {},
  };

  $.ajax(settings).done(function (response) {
    for (var i = 0; i < response.length; i++) {
      if (response[i].opponents.length == 0) {
        var matchesUpcoming = ` `;
      } else {
        for (var k = 0; k < response[i].opponents.length; k++) {
          var equipas = response[i].opponents[k].opponent.name;
          console.log(equipas);
          var matchesUpcoming = `<div class="match-list">
            <div class="match">
              <h2>${response[i].name}</h2>
              <h3>${response[i].league.name}</h3>
              <h6>${response[i].begin_at}</h6>
              <div class="equipas">
                <img src="${response[i].opponents[k].opponent.image_url}" width="18px" height="18px">
                <h3>${equipas}</h3>
                <h4> vs </h4>
                <img src="${response[i].opponents[k].opponent.image_url}" width="18px" height="18px">
                <h3>${equipas}</h3>
              </div>
            </div>
          </div>`;
        }
      }
      $("#content").append(matchesUpcoming);
    }

    console.log(response);
  });
}

function RTPArena() {
  $("#content").empty();
  var titulo = `<h1>RTP Arena:</h1>`;
  $("#content").append(titulo);

  var matches = `<div class="stream-list">
          <div class="match">
            <iframe
              class="stream"
              src="https://player.twitch.tv/?channel=rtparenacsgo&parent=localhost&autoplay=false"
              height="720"
              width="1280"
              frameborder="0"
              scrolling="no"
              allowfullscreen="true">
            </iframe>
          </div>
        </div>`;

  $("#content").append(matches);
}
