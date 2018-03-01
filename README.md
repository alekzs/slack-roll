# Random Roll slash command

The app implements a simple random roll command, that returns a random element from a list of options: `/roll [title? |] <option1>, <option2>, <option3>`. 

Example input: `/roll Nice restaurant, Nicer place, Fast food, Pizza, Kebab`

![Example output](https://cdn.glitch.com/76ac8af4-4c4e-4601-ab31-b37eefe39d6b%2Froller.png?1519939827383)

You can also add a roll title: `/roll Who owes me a beer? | Everyone, Yes, Are we there yet?`

![Title output](https://cdn.glitch.com/76ac8af4-4c4e-4601-ab31-b37eefe39d6b%2Froller2.png?1519939706883)

## Getting Started
To get started you need to:
- Add a Slash Command configuration to your Slack integrations
- Copy the generated Command Token
- Add your token to the `.env` file

For more detailed setup instructions, see `setup.md`.