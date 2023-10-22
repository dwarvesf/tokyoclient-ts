import {EventType, ItemType} from "../enums";
import {Gamepad} from "./gamepad";

/**
 * Represents a player in the game.
 *
 * @interface
 */
export interface Player {
  /**
   * The unique identifier of the player.
   *
   * @type {string}
   */
  id: string;

  /**
   * The angle of rotation for the player.
   *
   * @type {number}
   */
  angle: number;

  /**
   * The throttle value for the player.
   *
   * @type {number}
   */
  throttle: number;

  /**
   * The x-coordinate of the player.
   *
   * @type {number}
   */
  x: number;

  /**
   * The y-coordinate of the player.
   *
   * @type {number}
   */
  y: number;

  /**
   * The radius of the player.
   *
   * @type {number}
   */
  radius: number;

  /**
   * The radius of the bullets shot by the player.
   *
   * @type {number}
   */
  bullet_radius: number;

  /**
   * The speed of the bullets shot by the player.
   *
   * @type {number}
   */
  bullet_speed: number;

  /**
   * The maximum number of bullets allowed for the player.
   *
   * @type {number}
   */
  bullet_limit: number;
}

/**
 * Represents an item in the game.
 *
 * @interface
 */
export interface Item {
  /**
   * The unique identifier of the item.
   *
   * @type {string}
   */
  id: string;

  /**
   * The x-coordinate of the item.
   *
   * @type {number}
   */
  x: number;

  /**
   * The y-coordinate of the item.
   *
   * @type {number}
   */
  y: number;

  /**
   * The radius of the item.
   *
   * @type {number}
   */
  radius: number;

  /**
   * The type of the item.
   *
   * @type {ItemType}
   */
  type: ItemType;
}

/**
 * Represents a bullet in the game.
 *
 * @interface
 */
export interface Bullet {
  /**
   * The unique identifier of the bullet.
   *
   * @type {number}
   */
  id: number;

  /**
   * The identifier of the player who shot the bullet.
   *
   * @type {number}
   */
  player_id: number;

  /**
   * The angle of rotation for the bullet.
   *
   * @type {number}
   */
  angle: number;

  /**
   * The x-coordinate of the bullet.
   *
   * @type {number}
   */
  x: number;

  /**
   * The y-coordinate of the bullet.
   *
   * @type {number}
   */
  y: number;
}

/**
 * Represents respawn information.
 *
 * @interface
 */
export interface RespawnInfo {
  /**
   * The seconds since the epoch for respawn.
   *
   * @type {number}
   */
  secs_since_epoch: number;

  /**
   * The nanoseconds since the epoch for respawn.
   *
   * @type {number}
   */
  nanos_since_epoch: number;
}

export interface DeadPlayer {
  respawn: RespawnInfo;
  player: Player;
}

export interface PlayerCoordinates {
  x: number;
  y: number;
}

/**
 * Represents the state data associated with an event.
 *
 * @interface
 */
export interface StateEventData {
  /**
   * The bounds of the game area represented as [minX, maxX].
   *
   * @type {[number, number]}
   */
  bounds: [number, number];

  /**
   * An array of player objects representing the players in the game.
   *
   * @type {Player[]}
   */
  players: Player[];

  /**
   * An array of item objects representing items in the game.
   *
   * @type {Item[]}
   */
  items: Item[];

  /**
   * An array of dead player objects representing players who are no longer in the game.
   *
   * @type {DeadPlayer[]}
   */
  dead: DeadPlayer[];

  /**
   * An array of bullet objects representing bullets in the game.
   *
   * @type {Bullet[]}
   */
  bullets: Bullet[];

  /**
   * A record representing the scoreboard with player IDs as keys and scores as values.
   *
   * @type {Record<number, number>}
   */
  scoreboard: Record<number, number>;
}

/**
 * Represents an 'onMessage' event, typically associated with WebSocket communication.
 *
 * @interface
 */
export interface OnMessageEvent {
  /**
   * The type of the event.
   *
   * @type {EventType}
   */
  e: EventType;

  /**
   * The data payload associated with the event, which can be of various types.
   *
   * @type {StateEventData | Record<string, string> | number}
   */
  data: StateEventData | Record<string, string> | number;
}
