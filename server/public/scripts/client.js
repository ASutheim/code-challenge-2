console.log("client.js sourced");

$(document).ready(onReady);

function onReady() {
  console.log("DOM ready");
  //adds
  getJokes();
  $("#addJokeButton").on("click", handleSubmit);
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

function handleSubmit() {
  console.log("Inside handleSubmit Function");
  //collect value in input fields and saves them to variables
  let jokeAuthor = $("#whoseJokeIn").val();
  let jokeQuestion = $("#questionIn").val();
  let jokePunchLine = $("#punchlineIn").val();
  // collects all variables in an object
  let newJoke = {
    jokeAuthor: jokeAuthor,
    jokeQuestion: jokeQuestion,
    jokePunchLine: jokePunchLine,
  };
  console.log("A new joke!:", newJoke);
  //Posts the new joke to the server
  $.ajax({
    method: "POST",
    url: "/newJoke",
    data: newJoke,
  })
    //Receives back full array of jokes, now including the new joke
    //and passes it to the renderToDOM function
    .then(function (response) {
      console.log("Jokes received!", response);
      renderToDom(response);
    })
    .catch(function (error) {
      alert("post failed!", error);
    });

  //Empties out the input fields to prepare for MORE JOKES!
  $("#whoseJokeIn").val("");
  $("#questionIn").val("");
  $("#punchlineIn").val("");
}

function renderToDom(jokes) {
  console.log("Inside render function");

  $("#outputDiv").empty();
  for (let joke of jokes) {
    $("#outputDiv").append(`
              <p><b>${joke.whoseJoke}:</b> 
              ${joke.jokeQuestion}
              ${joke.punchLine}</p>
          `);
  }
}
