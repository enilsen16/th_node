var http = require("http");

function printMessage(username, badgeCount, points) {
  var message = username + " has " + badgeCount + " total badge(s) and " + points + " points in JavaScript";
  console.log(message);
}

function printError(error) {
  console.error(error.message);
}

function get(username) {
  //Connect to the API URL (http://teamtreehouse.com/username.json)
  var request = http.get("http://teamtreehouse.com/" + username + ".json", function(response){
    var body = "";
    //Read the data
    response.on('data', function (chunk) {
      body += chunk;
    });
    response.on('end', function(){
      if(response.statusCode === 200) {
        try {
          var profile = JSON.parse(body);
          printMessage(username, profile.badges.length, profile.points.JavaScript);
        } catch(error) {
          printError(error);
        }
      } else {
        printError({message: "Error"});
      }
    });
  });

  request.on("error", printError);
}

module.exports.get = get;
