const loader = `<div class='loader' id='loader-1'></div>`;

$(document).ready(function () {
  $("#content").empty();

  currentMatches();
});

function currentMatches() {
  const settings = {
      "async": true,
      "crossDomain": true,
      "url": "https://api.pandascore.co/csgo/matches/running?token=wXCRDWYb6feuJ93KE75qvUE4r4AQJvofQGue4F45rPIrsouN948&sort=begin_at",
        "method": "GET",
        "headers": {}
      };
      
      $.ajax(settings).done(function (response) {
        console.log(response);

        for (let i = 0; i < response.length; i++) {
          var matches = `<div class="match-list">
            <div class="match">
              <h2>${response[i].begin_at}</h2>
              <iframe
                src="${response[i].live_embeded_url}&parent=streamernews.example.com"
                height="<height>"
                width="<width>"
                frameborder="<frameborder>"
                scrolling="<scrolling>"
                allowfullscreen="<allowfullscreen>">
            </iframe>
            </div>
          </div>`;

          $("#content").append(matches);
        }
      });
}
