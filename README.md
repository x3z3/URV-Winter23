## Run FSM
To generate the simplified graph, open the shell, and run the following command:

`$ npm start`

This takes the TangramsRace.json file and generates a simplified JSON file in the following format:

### Sample simplified FSM json structure:
(The following json is incomplete. The Simple graph generates all possible reachable states, and unreachable states. End States are those which dont have a destination)

```json
{
  "startState": "state1",
  "endStates": [
    "state5",
    "state6"
  ],
  "states": [
    {
      "id": "state1",
      "dest": [
        "state2",
        "state3"
      ]
    },
    {
      "id": "state2",
      "dest": [
        "state2",
        "state4"
      ]
    }
  ]
}
```