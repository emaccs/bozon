/**
 * the IPC channels used in the app
 */
enum IPCChannel {
  // triggered by the electron menu
  TOGGLE_MESSAGE = 'ipcMain:toggle-message',
  // triggered by the render process
  SHOW_NOTIFICATION = 'ipcRenderer:show-notification',
  TRIGGER_MODAL = 'ipcRenderer:trigger:modal',
  // replies
  REPLY_MODAL = 'ipcMain:reply:modal',
  APP_RELOAD = 'ipcMain:app-reload',
  LOGGED_IN = 'ipcMain:logged-in',
  AUTH_START = 'ipcMain:auth-start',
  AUTH_SUCCESS = 'ipcMain:auth-success',
  AUTH_ERROR = 'ipcMain:auth-error',
  // macOS permissions
  OPEN_ACCESSIBILITY_PERMISSION = 'ipcMain:accessibility-permissions',
  REPLY_ACCESSIBILITY_PERMISSION = 'ipcMain:reply:accessibility-permissions',
  OPEN_SCREEN_RECORDING_PERMISSION = 'ipcMain:screen-recording-permissions',
  REPLY_SCREEN_RECORDING_PERMISSION = 'ipcMain:reply:screen-recording-permissions',
  // desktop window actions
  SEND_MESSAGE = 'ipcMain:send-message',
  CLOSE = 'ipcMain:close-fastCapture',
  RESIZE = 'ipcMain:resize-fastCapture',
  // desktop onboarding
  START_TUTORIAL_ON_BOARDING = 'ipcMain:start-tutorial-on-boarding',
  OPEN_ONBOARDING = 'ipcMain:open-on-boarding',
  CLOSE_TUTORIAL_ON_BOARDING = 'ipcMain:close-tutorial-on-boarding'
}

export default IPCChannel

/**
 * array of values of the IPC channels in the app
 */
export const channels = Object.keys(IPCChannel).map(
  (key) => IPCChannel[key as keyof typeof IPCChannel]
)

/**
 * the identification of registered handler (like `setTimeout`)
 */
export type HandlerID = number

/**
 * the actual handler for incoming messages on the ipc bus
 */
export type Handler = (...args: any[]) => void
