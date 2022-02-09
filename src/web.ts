import { WebPlugin } from '@capacitor/core';

import type {
  IntercomPlugin,
  IntercomPushNotificationData,
  IntercomSettings,
  IntercomUserUpdateOptions,
  UnreadConversationCount,
} from './definitions';
import { objectKeysCamelToSnakeCase } from './util';
import { initialize as initializeWidget } from './widget';

declare global {
  interface Window {
    Intercom: any;
  }
}

export class IntercomWeb extends WebPlugin implements IntercomPlugin {
  private intercom: any | undefined = window.Intercom;
  private _unreadConversationCount: string | undefined;

  constructor() {
    super({
      name: 'Intercom',
      platforms: ['web'],
    });
  }

  async boot(options: IntercomSettings): Promise<void> {
    options = objectKeysCamelToSnakeCase(options);
    initializeWidget(options.app_id);
    this.intercom('boot', options);
    this.setupListeners();
    return Promise.resolve();
  }

  async registerIdentifiedUser(options: { userId?: string; email?: string }): Promise<void> {
    options = objectKeysCamelToSnakeCase(options);
    this.intercom('update', options);
    return Promise.resolve();
  }

  async registerUnidentifiedUser(): Promise<void> {
    throw this.unimplemented('Not implemented on web.');
  }

  async updateUser(options: IntercomUserUpdateOptions): Promise<void> {
    options = objectKeysCamelToSnakeCase(options);
    this.intercom('update', options);
    return Promise.resolve();
  }

  async logout(): Promise<void> {
    this.intercom('shutdown');
    return Promise.resolve();
  }

  async logEvent(options: { name: string; data?: any }): Promise<void> {
    this.intercom('trackEvent', options.name, options.data);
    return Promise.resolve();
  }

  async displayMessenger(): Promise<void> {
    this.intercom('show');
    return Promise.resolve();
  }

  async displayMessageComposer(options: { message: string }): Promise<void> {
    this.intercom('showNewMessage', options.message);
    return Promise.resolve();
  }

  async displayHelpCenter(): Promise<void> {
    throw this.unimplemented('Not implemented on web.');
  }

  async hideMessenger(): Promise<void> {
    this.intercom('hide');
    return Promise.resolve();
  }

  async displayLauncher(): Promise<void> {
    throw this.unimplemented('Not implemented on web.');
  }

  async hideLauncher(): Promise<void> {
    throw this.unimplemented('Not implemented on web.');
  }

  async displayInAppMessages(): Promise<void> {
    throw this.unimplemented('Not implemented on web.');
  }

  async hideInAppMessages(): Promise<void> {
    throw this.unimplemented('Not implemented on web.');
  }

  async displayCarousel(options: { carouselId: string }): Promise<void> {
    options;
    throw this.unimplemented('Not implemented on web.');
  }

  async setUserHash(options: { hmac: string }): Promise<void> {
    options;
    throw this.unimplemented('Not implemented on web.');
  }

  async setBottomPadding(options: { value: string }): Promise<void> {
    options;
    throw this.unimplemented('Not implemented on web.');
  }

  async receivePush(notification: IntercomPushNotificationData): Promise<void> {
    notification;
    throw this.unimplemented('Not implemented on web.');
  }

  async sendPushTokenToIntercom(options: { value: string }): Promise<void> {
    options;
    throw this.unimplemented('Not implemented on web.');
  }

  async unreadConversationCount(): Promise<UnreadConversationCount> {
    const payload = { value: this._unreadConversationCount };
    return Promise.resolve(payload);
  }

  private setupListeners(): void {
    this.intercom('onHide', this.notifyListeners('onHide', null));
    this.intercom('onShow', this.notifyListeners('onHide', null));
    this.intercom('onUnreadCountChange', (unreadCount: string) => {
      this._unreadConversationCount = unreadCount;
      this.notifyListeners('onUnreadCountChange', unreadCount)
    });
  }
}

const Intercom = new IntercomWeb();

export { Intercom };
