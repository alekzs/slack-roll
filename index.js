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
  let user_id = payload.user_id;
  let response_url = payload.response_url;
  let message = null;
  let items = payload.text.split(' ');
  let valid_items = items.length > 1;
  
  if (valid_items) {
    let formatted_items = [];
    for (var i = 0; i < items.length; i++) {
      formatted_items.push(`*${items[i]}*`);
    }
    var item = items[Math.floor(Math.random() * items.length)];

    message = {
      unfurl_links: true,
      response_type: "in_channel",
      channel: payload.channel_id,
      token: process.env.SLACK_TOKEN,
      text: `A roll was made between these options: ${formatted_items.join(" | ")}, and I rolled:`,
      attachments: [
          {
              title: item,
              color: "#36a64f"
          }
      ]
    }
  } else {
    message = {
      channel: payload.channel_id,
      token: process.env.SLACK_TOKEN,
      text: `Invalid options. Please add at least two options separated by spaces, like so: \`/roll <option1> <option2> <option3> ...\``,
    } 
  }
  slack.send(response_url, message).then(data => {
    // Success!
  }, reason => { // on failure
    console.log("An error occurred when responding to /count slash command: " + reason);
  });
});
    

// incoming http requests
slack.listen('3000');