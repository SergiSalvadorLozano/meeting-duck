import { defaults, map, pick } from 'lodash';
import { IApiPeer, Peer } from './peer.model';


/**
 * Room contract interface with the API.
 */
export interface IApiRoom {
  code: string;
  peers: IApiPeer[];
}


/**
 * Room model.
 */
export class Room {

  // ATTRIBUTES

  /**
   * The unique code identifying the room.
   */
  code: string;

  /**
   * The list of peers currently in the room.
   */
  peers: Peer[];


  // METHODS

  /**
   * Constructor.
   * @param apiValues The room object as received from the API.
   */
  constructor(apiValues: IApiRoom) {
    defaults(this, pick(apiValues, 'code'));
    this.peers = map(apiValues.peers, apiPeer => new Peer(apiPeer));
  }

}
