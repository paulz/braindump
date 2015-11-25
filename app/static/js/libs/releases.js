// Generated by CoffeeScript 1.10.0
(function() {
  var getReleaseUrl, getReleases;

  window.repo = 'https://github.com/levlaz/braindump';

  marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    tables: true,
    breaks: true,
    pedantic: false,
    sanitize: true,
    smartLists: true,
    smartypants: true
  });

  getReleaseUrl = function(repo) {
    var api_url, url;
    url = repo.split('/');
    api_url = "https://api.github.com/repos/" + url[3] + "/" + url[4] + "/releases";
    console.log(api_url);
    return api_url;
  };

  getReleases = function(api_url) {
    return $.ajax(api_url, {
      type: 'GET',
      dataType: 'json',
      error: function(jqXHR, textStatus, errorThrown) {
        return console.log("AJAX Error: " + textStatus);
      },
      success: function(data, textStatus, jqXHR) {
        var i, len, ref, release, results;
        ref = jqXHR.responseJSON;
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          release = ref[i];
          results.push($('#releases').append("<li class='release'>" + ("<a class='release-title' href='" + release.html_url + "'><h2>" + release.name + "</h2></a>") + ("<h3>" + (moment(release.published_at).format('MMMM Do YY')) + "</h3>") + ("<div class='release-body'>" + (marked(release.body)) + "</div>") + "</li>"));
        }
        return results;
      }
    });
  };

  getReleases(getReleaseUrl(repo));

  $('#more-releases').append("<a href='" + repo + "/releases'><button>View More Releases </button></a>");

}).call(this);
