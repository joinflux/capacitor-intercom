import { WebPlugin } from '@capacitor/core';
import { objectKeysCamelToSnakeCase } from './util';
import { initialize as initializeWidget } from './widget';
export class IntercomWeb extends WebPlugin {
    constructor() {
        super({
            name: 'Intercom',
            platforms: ['web'],
        });
        this.intercom = window.Intercom;
    }
    async boot(options) {
        options = objectKeysCamelToSnakeCase(options);
        initializeWidget(options.app_id);
        this.intercom('boot', options);
        this.setupListeners();
        return Promise.resolve();
    }
    async registerIdentifiedUser(options) {
        options = objectKeysCamelToSnakeCase(options);
        this.intercom('update', options);
        return Promise.resolve();
    }
    async registerUnidentifiedUser() {
        throw this.unimplemented('Not implemented on web.');
    }
    async updateUser(options) {
        options = objectKeysCamelToSnakeCase(options);
        this.intercom('update', options);
        return Promise.resolve();
    }
    async logout() {
        this.intercom('shutdown');
        return Promise.resolve();
    }
    async logEvent(options) {
        this.intercom('trackEvent', options.name, options.data);
        return Promise.resolve();
    }
    async displayMessenger() {
        this.intercom('show');
        return Promise.resolve();
    }
    async displayMessageComposer(options) {
        this.intercom('showNewMessage', options.message);
        return Promise.resolve();
    }
    async displayHelpCenter() {
        throw this.unimplemented('Not implemented on web.');
    }
    async hideMessenger() {
        this.intercom('hide');
        return Promise.resolve();
    }
    async displayLauncher() {
        throw this.unimplemented('Not implemented on web.');
    }
    async hideLauncher() {
        throw this.unimplemented('Not implemented on web.');
    }
    async displayInAppMessages() {
        throw this.unimplemented('Not implemented on web.');
    }
    async hideInAppMessages() {
        throw this.unimplemented('Not implemented on web.');
    }
    async displayCarousel(options) {
        options;
        throw this.unimplemented('Not implemented on web.');
    }
    async setUserHash(options) {
        options;
        throw this.unimplemented('Not implemented on web.');
    }
    async setBottomPadding(options) {
        options;
        throw this.unimplemented('Not implemented on web.');
    }
    async receivePush(notification) {
        notification;
        throw this.unimplemented('Not implemented on web.');
    }
    async sendPushTokenToIntercom(options) {
        options;
        throw this.unimplemented('Not implemented on web.');
    }
    async unreadConversationCount() {
        const payload = { value: this._unreadConversationCount };
        return Promise.resolve(payload);
    }
    setupListeners() {
        this.intercom('onHide', this.notifyListeners('onHide', null));
        this.intercom('onShow', this.notifyListeners('onHide', null));
        this.intercom('onUnreadCountChange', (unreadCount) => {
            this._unreadConversationCount = unreadCount;
            this.notifyListeners('onUnreadCountChange', unreadCount);
        });
    }
}
const Intercom = new IntercomWeb();
export { Intercom };
//# sourceMappingURL=web.js.map