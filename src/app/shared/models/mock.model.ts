import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { mapValues } from 'lodash';
import { Observable, throwError as rxThrowError, timer as rxTimer } from 'rxjs';
import { map as rxMap, mergeMap as rxMergeMap } from 'rxjs/operators';
import { DEFAULT_MOCK_RESPONSE_TIME } from '../constants/mock.constants';


export class MockResponseGroup<T> {

  // ATTRIBUTES

  /**
   * A dictionary of mocked potential responses.
   */
  responses: { [key: string]: HttpResponse<T> | HttpErrorResponse };


  // METHODS

  /**
   * Constructor. Initialises attributes.
   */
  constructor(responses: { [key: string]: (params?: object) => (HttpResponse<T> | HttpErrorResponse) },
              params?: object) {
    this.responses = mapValues(responses, res => params ? res(params) : res());
  }
}


export class MockResponseProcessor<T> {

  // ATTRIBUTES

  /**
   * The mock response.
   */
  responseGroup: MockResponseGroup<T>;


  // METHODS

  /**
   * Constructor. Initialises attributes.
   */
  constructor(responseGroup: MockResponseGroup<T>) {
    this.responseGroup = responseGroup;
  }


  /**
   * Get the mock response after a delay.
   * Stops the Observable stream with an error if the response has an error HTTP status.
   * @param requestKey The key of the concrete request inside the group.
   * @param delay OPTIONAL. The response delay in milliseconds. Overrides the application default.
   * @returns An Observable that resolves to the response body.
   */
  process(requestKey: string, delay?: number): Observable<T> {
    return rxTimer(delay || DEFAULT_MOCK_RESPONSE_TIME).pipe(
      rxMergeMap(() => {
        if (this.responseGroup.responses[requestKey].status >= 300) {
          return rxThrowError(this.responseGroup.responses[requestKey]);
        }
      }),
      rxMap(() => (this.responseGroup.responses[requestKey] as HttpResponse<T>).body)
    );
  }

}
