import type { IntercomSettings } from './definitions';
declare global {
    interface Window {
        Intercom: any;
        intercomSettings: IntercomSettings;
        attachEvent: any;
    }
}
/**
 * Snippet to initialize the Intercom instance
 *
 * @see {@link https://github.com/devrnt/react-use-intercom/blob/master/src/initialize.ts}
 * @see {@link https://developers.intercom.com/installing-intercom/docs/basic-javascript}
 *
 * @param appId - Intercom app id
 * @param [timeout=0] - Amount of milliseconds that the initialization should be delayed, defaults to 0
 */
declare const initialize: (appId: string, timeout?: number) => void;
export { initialize };
