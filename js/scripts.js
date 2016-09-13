var itemTemplate = jQuery.validator.format("<a href=\"{0}\" target=\"_blank\" style=\"color: black;text-decoration: none\"><div class=\"row well mouse\"><h4><strong>{1}</strong></h4><p>{2}...</p></div></a>");

$(document).ready(function() {
  $("#search-result").css("padding-top", $("#search-header").height() + 20);
  $("form").submit(function(event) {
    event.preventDefault();
    clearSearchResult();
    search();
  });  
});

function clearSearchResult() {
    $("#search-result").empty();
}

function search() {
      $.ajax({
      url: "http://en.wikipedia.org/w/api.php",
      data: {
        action: "query",
        list: "search",
        srsearch: $("#keyword").val(),
        srlimit: 15,
        format: "json"
      },
      dataType: "jsonp",
      success: processResult
    });   
}

function getTitle(apiResult, i) {
  return apiResult.query.search[i].title;
}

function getSnippet(apiResult, i) {
  return apiResult.query.search[i].snippet;
}

function getPageUrl(apiResult, i) {
  return "https://en.wikipedia.org/?title=" + getTitle(apiResult, i);
}

function getHtmlRowItem(apiResult, i) {
  return itemTemplate(getPageUrl(apiResult, i), getTitle(apiResult, i), getSnippet(apiResult, i));
  
}

function addResultItem(apiResult, i) {
    $("#search-result").append(getHtmlRowItem(apiResult, i));  
}

function processResult(apiResult) {
  for (var i = 0; i < apiResult.query.search.length; i++) {
      addResultItem(apiResult, i);
  }
}

