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
            <div class="league">
            <img src="${response[i].league.image_url}" width="64px" height="64px"></img>
            <a class="league-name" href="${response[i].league.url}"  target="_blank">
              ${response[i].league.name}
            </a>
          </div>
          
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
        getDate(response[i].begin_at);
        
        var matchesUpcoming = `<div class="match-list">
            <div class="match">
              <div class="league">
                <img src="${response[i].league.image_url}" width="64px" height="64px"></img>
                <a class="league-name" href="${response[i].league.url}"  target="_blank">
                  ${response[i].league.name}
                </a>
              </div>

              <div class="equipas">
                <div class="equipas-nome">
                  <img src="${response[i].opponents[0].opponent.image_url}" width="23px" height="23px">
                  <h3 >${response[i].opponents[0].opponent.name} </h3>
                </div>
                
                <h4> vs </h4>

                <div class="equipas-nome">
                  <img src="${response[i].opponents[1].opponent.image_url}" width="23px" height="23px">
                  <h3> ${response[i].opponents[1].opponent.name}</h3>    
                </div>

                <div class="data">
                  <h4>${hour + ":" + minute}</h4>
                  <h5>${dt + "-" + month + "-" + year}</h5>
                </div>
              </div>
            </div>
          </div>`;
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

function getNoticias() {
  $("#content").empty();

  var settings = {
    url:
      "https://newsapi.org/v2/everything?q=csgo&apiKey=277b737d73cb451b99b3364115c2e329",
    method: "GET",
    headers: {
      Cookie: "__cfduid=dc154bae286924056d29d493a6eea89231605739465",
    },
  };

  $.ajax(settings).done(function (response) {
    console.log(response);

    for (var i = 0; i < response.articles.length; i++) {
      var j = response.articles[i];
      getDate(j.publishedAt);
      
      var noticia = `<div class="noticia" id="noticia${i}">
            <h2 class="titulo"> ${j.title} </h2>
            <h4 class="source"> ${j.source.name} </h4>
            <p class="data-noticia">${dt + '-' + month + '-' + year}</p>
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