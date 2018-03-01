"use strict";

const ts = require('./tinyspeck.js');

var slack = ts.instance({ });
var connected=false;

//
// For each Slash Command that you want to handle, you need to add a new `slack.on()` handler function for it.
// This handler captures when that particular Slash Command has been used and the resulting HTTP request fired
// to your endpoint. You can then run whatever code you need to for your use-case. 
//
// The `slack` functions like `on()` and `send()` are provided by `tinyspeck.js`. 
//
// Watch for /count slash command
slack.on('/roll', payload => {
  console.log("Received /count slash command from user " + payload.user_id);
  let user_id = payload.user_id;
  let response_url = payload.response_url;
  console.log(payload);
  slack.send(response_url, "koo").then(res => { // on success
    console.log("Response sent to /count slash command");
  }, reason => { // on failure
    console.log("An error occurred when responding to /count slash command: " + reason);
  });
});
    

// incoming http requests
slack.listen('3000');