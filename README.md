# tokyoclient-ts

`tokyoclient-ts` is a Typescript client library for connecting to a Tokyo game server and controlling a ship in the game. It provides functionality to interact with the game server, receive events, and control the ship using a simple bot implementation.

## Methods
`GamePad()`: Returns a gamepad for controlling the game with actions (rotate, throttle, fire).

`setGamePlan(callback, perMs)`: Sets up a game plan by executing the provided function at regular intervals.

`setOnOpenfn()`: Sets the function to handle 'OnOpen' events for the WebSocket communication.

`close()`: Closes the WebSocket connection.

## Utilities
`estimateDistance()`: Calculates the Euclidean distance between two players based on their coordinates.

`calculateRotationAngle()`: Calculates the angle (in radians) a player needs to rotate to face the target player.

## Usage

To use `tokyoclient-ts`, follow these steps:

1. Install the package using:
```sh
npm i tokyoclient-ts`
```

2. Initialize the Game client with your credentials
```js
  const client = new TokyoGameClient({
    serverHost: "combat.sege.dev",
    apiKey: "std0101",
    userName: "std0101",
    useSecureConnection: true, // scheme wss: or ws:
  });

  // Initialize the Game client instance
  const client = new TokyoGameClient(config);
  
  // Get your own gamepad
  const gamepad = client.GamePad();
```

3. Implement your own algorithm to respond to how things happen in the map (provided in `state` object below)
```js
  client.setGamePlan((state) => {
    // can use provided utility functions here
    console.log("Current map state: ", state);
    gamepad.throttle(0.2);
    const angle = getRandomFloat(0.1, 1.0, 1) * 2 * Math.PI;
    gamepad.rotate(angle);
    gamepad.fire();
  }, 1000);
```

5. Run your program and observe the client interacting with the Tokyo game server.

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests for any improvements or bug fixes.
