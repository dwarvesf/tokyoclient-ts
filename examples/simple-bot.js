const {TokyoGameClient, getRandomFloat} = require("../build");

(async () => {
  // Initialize the Game client instance
  const client = new TokyoGameClient({
    serverHost: "combat.sege.dev",
    apiKey: "std0101",
    userName: "std0101",
    useSecureConnection: true,
  });

  // Get your own gamepad
  const gamepad = client.GamePad();

  // Define your own algorithm here to
  client.setGamePlan((state) => {
    console.log("Current map state: ", state);
    gamepad.throttle(0.2);
    const angle = getRandomFloat(0.1, 1.0, 1) * 2 * Math.PI;
    gamepad.rotate(angle);
    gamepad.fire();
  }, 1000);

  process.on("SIGTERM", () => {
    client.close();
    process.exit(0);
  });
})();
