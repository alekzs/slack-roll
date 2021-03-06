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
  let delimiter = payload.text.match(/([|:])\s+/g);
  let payload_split = payload.text.split(delimiter).reverse();
  let roll_title = "";
  if (payload_split.length > 1) {
    roll_title = payload_split.splice(1)[0].trim();
  }
  let items = payload_split[0].split(',');
  let valid_items = items.length > 1;
  
  if (valid_items) {
    let formatted_items = [];
    for (var i = 0; i < items.length; i++) {
      formatted_items.push(`*${items[i].trim()}*`);
    }
    var item = items[Math.floor(Math.random() * items.length)].trim();

    message = {
      unfurl_links: true,
      response_type: "in_channel",
      channel: payload.channel_id,
      token: process.env.SLACK_TOKEN,
      text: `A roll${roll_title.length ? (" titled *" + roll_title + "*") : ""} was made between: ${formatted_items.join(" | ")}, and I rolled:`,
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
      text: `Invalid options. Please add at least two options separated by commas, like so: \`/roll [title? |] <option1>, <option2>, <option3> ...\``,
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