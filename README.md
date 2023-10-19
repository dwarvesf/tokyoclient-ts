# tokyoclient-ts

`tokyoclient-ts` is a Typescript client library for connecting to a Tokyo game server and controlling a ship in the game. It provides functionality to interact with the game server, receive events, and control the ship using a simple bot implementation.

## Usage

To use `tokyoclient-ts`, follow these steps:

1. Install the package using:
```sh
npm i tokyoclient-ts`
```

2. Initialize the Game client with your credentials
```js
  const config = {
    serverHost: "localhost:8080",
    apiKey: "webuild0",
    userName: "h3adhunter",
  };

  // Initialize the Game client instance
  const client = new TokyoGameClient(config);
```

3. Implement your own callback function to handle onOpen event 
```js
  // Define your onMessage callback function
  client.setOnOpenFn((gamepad) => {
    console.log("Successfully joined the game.");
    // Replace your logic here
  });
```

4. Implement your own callback function to handle onMessage event 
```js
  // Define your onMessage callback function
  client.setOnMessageFn(({gamepad, event}) => {
    gamepad.throttle(1);
    const angle = getRandomFloat(0.1, 1.0, 1) * 2 * Math.PI;
    gamepad.rotate(angle);
    console.log(`[rotating] by ${angle} .`);
    gamepad.fire();
    // Replace with your logic here
  });
```

5. Run your program and observe the client interacting with the Tokyo game server.

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests for any improvements or bug fixes.
