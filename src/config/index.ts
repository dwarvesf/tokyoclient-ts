/**
 * Configuration options for a service or application.
 *
 * @interface
 */
export interface IConfig {
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
   * Indicates whether HTTPS should be used for communication.
   *
   * @type {boolean}
   */
  useHttps: boolean;
}

export const getWsServerUrl = (c: IConfig): string => {
  const protocol = c.useHttps ? "wss://" : "ws://";
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
