$(document).ready(function() {
  starterButtons = [
    "dave chappelle",
    "james bond",
    "la vida dolce",
    "awesome",
    "badass",
    "not all men dream equally",
    "true love",
    "badass"
  ];
  //Create buttons out of the array
  function renderButtons() {
    for (var i = 0; i < starterButtons.length; i++) {
      var gifButton = $("<button>");
      var inside = starterButtons[i];
      gifButton.attr("data-value", inside);
      gifButton.text(inside);
      $("#buttons-view").append(gifButton);
    }
    buttonClicked();
    //Retrieve value from text inbox & convert to button
    $("#add-gif").on("click", function(event) {
      // event.preventDefault() prevents the form from trying to submit itself.
      // We're using a form so that the user can hit enter instead of clicking the button if they want
      event.preventDefault();

      //Create Button
      var gifButton = $("<button>");

      //Give button an attribute to recall when searching
      var input = $("#gif-input").val();
      gifButton.attr("data-value", input);
      console.log(input);
      gifButton.html(input);
      $("#buttons-view").append(gifButton);
      //Import GIFs
      buttonClicked();
    });

    function buttonClicked() {
      $("button").on("click", function() {
        console.log("button clicked");
        queryURL = "http://api.giphy.com/v1/gifs/search";

        queryURL +=
          "?" +
          $.param({
            api_key: "df8664e2d8fa4428a0bfe51f41c9c720",
            q: $(this).attr("data-value"),
            limit: 10
          });

        $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {
          var results = response.data;
          console.log(results);

          for (var i = 0; i < results.length; i++) {
            var gifDiv = $("<div class='item'>");

            var rating = results[i].rating;

            var p = $("<p>").text("Rating: " + rating);

            var personImage = $("<img>");
            personImage.attr("src", results[i].images.fixed_height.url);
            personImage.attr("status", "animated");
            personImage.attr("animate-url", results[i].images.fixed_height.url);
            personImage.attr(
              "still-url",
              results[i].images.fixed_height_still.url
            );
            personImage.attr(
              "still-url",
              results[i].images.fixed_height_still.url
            );
            console.log(personImage.attr("still-url"));

            gifDiv.prepend(p);
            gifDiv.prepend(personImage);

            $("#gifs-go-here").prepend(gifDiv);
          }
          //Change to animate vs. still
          $("img").on("click", function() {
            if ($(this).attr("status") === "animated") {
              $(this).attr("status", "still");
              console.log($(this).attr("status"));
              $(this).attr("src", $(this).attr("still-url"));
            } else if ($(this).attr("status") === "still") {
              $(this).attr("status", "animated");
              console.log($(this).attr("status"));
              $(this).attr("src", $(this).attr("animate-url"));
            }
          });
        });
      });
    }
  }
  renderButtons();
});
