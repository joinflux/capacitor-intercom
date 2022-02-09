var capacitorIntercom = (function (exports, core) {
    'use strict';

    const Intercom$1 = core.registerPlugin('Intercom', {
        web: () => Promise.resolve().then(function () { return web; }).then(m => new m.IntercomWeb()),
    });

    /**
     * Snippet to initialize the Intercom instance
     *
     * @see {@link https://github.com/devrnt/react-use-intercom/blob/master/src/initialize.ts}
     * @see {@link https://developers.intercom.com/installing-intercom/docs/basic-javascript}
     *
     * @param appId - Intercom app id
     * @param [timeout=0] - Amount of milliseconds that the initialization should be delayed, defaults to 0
     */
    const initialize = (appId, timeout = 0) => {
        const w = window;
        const ic = w.Intercom;
        if (typeof ic === 'function') {
            ic('reattach_activator');
            ic('update', w.intercomSettings);
        }
        else {
            const d = document;
            const i = function (...args) {
                i.c(args);
            };
            i.q = [];
            i.c = function (...args) {
                i.q.push(args);
            };
            w.Intercom = i;
            const l = function () {
                setTimeout(function () {
                    const s = d.createElement('script');
                    s.type = 'text/javascript';
                    s.async = true;
                    s.src = 'https://widget.intercom.io/widget/' + appId;
                    const x = d.getElementsByTagName('script')[0];
                    x.parentNode.insertBefore(s, x);
                }, timeout);
            };
            if (document.readyState === 'complete') {
                l();
            }
            else if (w.attachEvent) {
                w.attachEvent('onload', l);
            }
            else {
                w.addEventListener('load', l, false);
            }
        }
    };

    class IntercomWeb extends core.WebPlugin {
        constructor() {
            super({
                name: 'Intercom',
                platforms: ['web'],
            });
            this.intercom = window.Intercom;
        }
        async boot(options) {
            initialize(options.app_id);
            this.intercom('boot', options);
            this.setupListeners();
            return Promise.resolve();
        }
        async registerIdentifiedUser(options) {
            throw this.unimplemented('Not implemented on web.');
        }
        async registerUnidentifiedUser() {
            throw this.unimplemented('Not implemented on web.');
        }
        async updateUser(options) {
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
            throw this.unimplemented('Not implemented on web.');
        }
        async setUserHash(options) {
            throw this.unimplemented('Not implemented on web.');
        }
        async setBottomPadding(options) {
            throw this.unimplemented('Not implemented on web.');
        }
        async receivePush(notification) {
            throw this.unimplemented('Not implemented on web.');
        }
        async sendPushTokenToIntercom(options) {
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

    var web = /*#__PURE__*/Object.freeze({
        __proto__: null,
        IntercomWeb: IntercomWeb,
        Intercom: Intercom
    });

    exports.Intercom = Intercom$1;

    Object.defineProperty(exports, '__esModule', { value: true });

    return exports;

})({}, capacitorExports);
//# sourceMappingURL=plugin.js.map
