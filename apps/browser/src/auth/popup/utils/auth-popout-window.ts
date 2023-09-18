import { BrowserApi } from "../../../platform/browser/browser-api";
import BrowserPopupUtils from "../../../platform/popup/browser-popup-utils";

const AuthPopoutType = {
  unlockExtension: "auth_unlockExtension",
  ssoAuthResult: "auth_ssoAuthResult",
  twoFactorAuth: "auth_twoFactorAuth",
} as const;

/**
 * Opens a window that facilitates unlocking / logging into the extension.
 * @param {chrome.tabs.Tab} senderTab
 * @returns {Promise<void>}
 */
async function openUnlockPopout(senderTab: chrome.tabs.Tab) {
  await BrowserPopupUtils.openPopout("popup/index.html", {
    singleActionKey: AuthPopoutType.unlockExtension,
    senderWindowId: senderTab.windowId,
  });
  await BrowserApi.tabSendMessageData(senderTab, "bgUnlockPopoutOpened");
}

/**
 * Closes the unlock popout window.
 * @returns {Promise<void>}
 */
async function closeUnlockPopout() {
  await BrowserPopupUtils.closeSingleActionPopout(AuthPopoutType.unlockExtension);
}

/**
 * Opens a window that facilitates presenting the results for SSO authentication.
 * @param {{code: string, state: string}} resultData
 * @returns {Promise<void>}
 */
async function openSsoAuthResultPopout(resultData: { code: string; state: string }) {
  const { code, state } = resultData;
  const authResultUrl = `popup/index.html#/sso?code=${encodeURIComponent(
    code
  )}&state=${encodeURIComponent(state)}`;

  await BrowserPopupUtils.openPopout(authResultUrl, {
    singleActionKey: AuthPopoutType.ssoAuthResult,
  });
}

/**
 * Opens a window that facilitates two-factor authentication.
 * @param {{data: string, remember: string}} twoFactorAuthData
 * @returns {Promise<void>}
 */
async function openTwoFactorAuthPopout(twoFactorAuthData: { data: string; remember: string }) {
  const { data, remember } = twoFactorAuthData;
  const params =
    `webAuthnResponse=${encodeURIComponent(data)};` + `remember=${encodeURIComponent(remember)}`;
  const twoFactorUrl = `popup/index.html#/2fa;${params}`;

  await BrowserPopupUtils.openPopout(twoFactorUrl, {
    singleActionKey: AuthPopoutType.twoFactorAuth,
  });
}

/**
 * Closes the two-factor authentication popout window.
 * @returns {Promise<void>}
 */
async function closeTwoFactorAuthPopout() {
  await BrowserPopupUtils.closeSingleActionPopout(AuthPopoutType.twoFactorAuth);
}

export {
  AuthPopoutType,
  openUnlockPopout,
  closeUnlockPopout,
  openSsoAuthResultPopout,
  openTwoFactorAuthPopout,
  closeTwoFactorAuthPopout,
};