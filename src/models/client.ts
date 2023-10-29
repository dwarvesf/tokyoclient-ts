import WebSocket, {CloseEvent, Event, MessageEvent} from "isomorphic-ws";
import {OnMessageEvent, StateEventData} from "../interfaces/event";
import {Gamepad} from "../interfaces/gamepad";
import {IConfig, getWsServerUrl} from "../config";
import {GameState} from "../enums";

/**
 * Type representing a function that handles 'OnOpen' events, typically associated with WebSocket communication.
 *
 * @type {OnOpenFn}
 * @param {Event} event - The 'OnOpen' event payload.
 * @returns {any} - The result of handling the event.
 */
export type OnOpenFn = (event: Event) => any;

/**
 * A type representing a function that defines a game plan.
 *
 * @type {function} GamePlanFn
 * @param {StateEventData} state - The map state data that can be used in the game plan.
 * @returns {any} The result of the game plan execution.
 */
export type GamePlanFn = (state: StateEventData) => any;

export class TokyoGameClient {
  private conn!: WebSocket;
  private onOpenFn: OnOpenFn | undefined;
  private gameState!: StateEventData;
  private planIntervalKey!: NodeJS.Timeout;

  constructor(credentials: IConfig) {
    this.conn = new WebSocket(getWsServerUrl(credentials));
    this.conn.onopen = this.executeOnOpen.bind(this);
    this.conn.onclose = this.executeOnClose.bind(this);
    this.conn.onerror = this.executeOnError.bind(this);
    this.conn.onmessage = this.executeOnMessage.bind(this);
  }

  private executeOnOpen(e: Event) {
    if (!this.onOpenFn) return;
    this.onOpenFn.call(this, e);
  }

  private executeOnMessage(event: MessageEvent) {
    const parsed: OnMessageEvent = JSON.parse(event.data.toString());
    if (parsed.e === "state") {
      this.gameState = parsed.data as StateEventData;
    }
  }

  private executeOnClose(_event: CloseEvent) {
    clearInterval(this.planIntervalKey);
    console.log("Disconnected.");
  }

  private executeOnError(event: Event) {
    console.error("uhhh, an error happened:", event);
  }

  private rotate(angle: number): void {
    this.conn.send(
      JSON.stringify({
        e: "rotate",
        data: angle,
      }),
    );
  }

  private throttle(speed: number): void {
    this.conn.send(
      JSON.stringify({
        e: "throttle",
        data: speed,
      }),
    );
  }

  private fire(): void {
    this.conn.send(
      JSON.stringify({
        e: "fire",
      }),
    );
  }

  private isConnected(): boolean {
    return this.conn.readyState === GameState.OPEN ? true : false;
  }

  private getMapState(): StateEventData {
    return this.gameState;
  }

  /**
   * Returns a gamepad for controlling the game.
   *
   * @returns {Gamepad}
   */
  public GamePad(): Gamepad {
    return {
      rotate: this.rotate.bind(this),
      throttle: this.throttle.bind(this),
      fire: this.fire.bind(this),
    } as Gamepad;
  }

  /**
   * Sets the function to handle 'OnOpen' events for the WebSocket communication.
   *
   * @param {OnOpenFn} fn - The function to handle 'OnOpen' events.
   * @returns {void}
   */
  public setOnOpenFn(fn: OnOpenFn): void {
    this.onOpenFn = fn;
  }

  /**
   * To close the WebSocket connection.
   *
   * @returns {void}
   */
  public close(): void {
    return this.conn.close();
  }

  /**
 * Sets up a game plan by executing the provided function at regular intervals.
 *
 * @param {GamePlanFn} fn - The function to be executed at each interval.
 * @param {number} ms - The time interval in milliseconds at which the function will be executed.
 * @returns {void}
 */
  public setGamePlan(
    fn: GamePlanFn,
    ms: number,
  ): void {
    this.planIntervalKey = setInterval(() => {
      if (!this.isConnected()) {
        return;
      }
      const mapState: StateEventData = this.getMapState();
      fn.call(this, mapState);
    }, ms);
  }
}
