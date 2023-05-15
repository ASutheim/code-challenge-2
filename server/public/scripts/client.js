console.log("client.js sourced");

$(document).ready(onReady);

function onReady() {
  console.log("DOM ready");
  //event listener for submit button that goes to a post request
  getJokes();
}

function getJokes() {
  console.log("Inside getJokes function");
  $.ajax({
    method: "GET",
    url: "/jokes",
  })
    .then(function (response) {
      console.log("Success!", response);
      renderToDom(response);
    })
    .catch(function (error) {
      alert("Request failed! :(");
      console.log("Request failed: ", error);
    });
}

function renderToDom(jokes) {
  console.log("Inside render function");

  $("#outputDiv").empty();
  for (let joke of jokes) {
    $("#outputDiv").append(`
              <p>${joke.whoseJoke}
              ${joke.jokeQuestion}
              ${joke.punchLine}</p>
          `);
  }
}
