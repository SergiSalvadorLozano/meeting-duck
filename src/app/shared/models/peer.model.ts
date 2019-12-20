import { defaults } from 'lodash';


/**
 * Peer contract interface with the API.
 */
export interface IApiPeer {
  name: string;
}


/**
 * Peer model.
 */
export class Peer {

  // ATTRIBUTES

  /**
   * Name of the peer in the current room.
   */
  name: string;


  // METHODS

  /**
   * Constructor.
   * @param apiValues The peer object as received from the API.
   */
  constructor(apiValues: IApiPeer) {
    defaults(this, apiValues);
  }

}
