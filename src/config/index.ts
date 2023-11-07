/**
 * Configuration options for a service or application.
 *
 * @interface
 */
export interface Config {
  /**
   * The host or URL of the server to connect to.
   *
   * @type {string}
   */
  serverHost: string;

  /**
   * The API key used for authentication or authorization.
   *
   * @type {string}
   */
  apiKey: string;

  /**
   * The user's username or identifier.
   *
   * @type {string}
   */
  userName: string;

  /**
   * Indicates whether a secure WebSocket connection should be established.
   *
   * @type {boolean}
   */
  useSecureConnection: boolean;
}

export const getWsServerUrl = (c: Config): string => {
  const protocol = c.useSecureConnection ? "wss://" : "ws://";
  const socketPath = "/socket";
  return (
    protocol +
    c.serverHost +
    socketPath +
    "?key=" +
    c.apiKey +
    "&name=" +
    c.userName
  );
};
