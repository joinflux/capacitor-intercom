import type { PluginListenerHandle } from '@capacitor/core';

export interface IntercomPlugin {
  registerIdentifiedUser(options: {
    userId?: string;
    email?: string;
  }): Promise<void>;
  registerUnidentifiedUser(): Promise<void>;
  updateUser(options: IntercomUserUpdateOptions): Promise<void>;
  logout(): Promise<void>;
  logEvent(options: { name: string; data?: any }): Promise<void>;
  displayMessenger(): Promise<void>;
  displayMessageComposer(options: { message: string }): Promise<void>;
  displayHelpCenter(): Promise<void>;
  hideMessenger(): Promise<void>;
  displayLauncher(): Promise<void>;
  hideLauncher(): Promise<void>;
  displayInAppMessages(): Promise<void>;
  hideInAppMessages(): Promise<void>;
  displayCarousel(options: { carouselId: string }): Promise<void>;
  setUserHash(options: { hmac: string }): Promise<void>;
  setBottomPadding(options: { value: string }): Promise<void>;
  sendPushTokenToIntercom(options: { value: string }): Promise<void>;
  receivePush(notification: IntercomPushNotificationData): Promise<void>;
  unreadConversationCount(): Promise<UnreadConversationCount>;
  addListener(
    eventName: 'onUnreadCountChange',
    listenerFunc: UnreadCountChangeListener,
  ): Promise<PluginListenerHandle> & PluginListenerHandle;
}

export interface IntercomPushNotificationData {
  conversation_id: string;
  message: string;
  body: string;
  author_name: string;
  image_url: string;
  app_name: string;
  receiver: string;
  conversation_part_type: string;
  intercom_push_type: string;
  uri: string;
  push_only_conversation_id: string;
  instance_id: string;
  title: string;
  priority: number;
}

export interface IntercomUserUpdateOptions {
  userId?: string;
  email?: string;
  name?: string;
  phone?: string;
  languageOverride?: string;
  customAttributes: { [key: string]: any };
}

export interface UnreadConversationCount {
  value?: string;
}

export type UnreadCountChangeListener = (state: UnreadConversationCount) => void;