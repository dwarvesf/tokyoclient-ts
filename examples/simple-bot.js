const {
  TokyoGameClient,
  getRandomFloat,
} = require("../build");

(async () => {
  // Initialize the Game client instance
  const client = new TokyoGameClient({
    serverHost: "combat.sege.dev",
    apiKey: "human",
    userName: "human",
    useHttps: true,
  });

  // Define your onMessage callback function
  client.setOnOpenFn((gamepad) => {
    console.log("Successfully joined the game.");
    // Replace your logic here
  });

  // Define your onMessage callback function
  client.setOnMessageFn(({gamepad, event}) => {
    gamepad.throttle(1);
    const angle = getRandomFloat(0.1, 1.0, 1) * 2 * Math.PI;
    gamepad.rotate(angle);
    console.log(`[rotating] by ${angle} .`);
    gamepad.fire();
    // Replace with your logic here
  });

  process.on("SIGTERM", () => {
    client.close();
    process.exit(0);
  });
})();
