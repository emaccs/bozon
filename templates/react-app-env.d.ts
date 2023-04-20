/// <reference types="node" />

import IPCChannel, { Handler, HandlerID } from './model/IPCChannel'

// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference types="react" />
/// <reference types="react-dom" />

declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: 'development' | 'production' | 'test'
    readonly PUBLIC_URL: string
  }
}

declare module '*.avif' {
  const src: string
  export default src
}

declare module '*.bmp' {
  const src: string
  export default src
}

declare module '*.gif' {
  const src: string
  export default src
}

declare module '*.jpg' {
  const src: string
  export default src
}

declare module '*.jpeg' {
  const src: string
  export default src
}

declare module '*.png' {
  const src: string
  export default src
}

declare module '*.webp' {
  const src: string
  export default src
}

declare module '*.svg' {
  import * as React from 'react'

  export const ReactComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & { title?: string }
  >

  const src: string
  export default src
}

declare module '*.module.css' {
  const classes: { readonly [key: string]: string }
  export default classes
}

declare module '*.module.scss' {
  const classes: { readonly [key: string]: string }
  export default classes
}

declare module '*.module.sass' {
  const classes: { readonly [key: string]: string }
  export default classes
}

interface IPC {
  /**
   * Registers an handler to an IPC channel.
   * The handler would be called if a new message arrives.
   * <br>
   * More information on the `ipcRenderer` module from electron:
   * {@link Electron.ipcRenderer.on}
   *
   * @param channel the channel to listen to
   * @param handler the handler function to register
   * @returns the id of the registered function useful to {@link unregister} the handler later
   *
   * @see unregister
   */
  register(channel: IPCChannel, handler: Handler): HandlerID

  onLoaded(callback: (_: any, data: any) => void): any

  platform(): string
  /**
   * Unregisters a handler from an IPC channel with the specified id.
   * <br>
   * More information on the `ipcRenderer` module from electron:
   * {@link Electron.ipcRenderer.removeListener}
   *
   * @param channel the channel which the handler currently listen to
   * @param id the id of the registered handler returned from the {@link register} function
   * @returns `true` if the handler was successfully removed
   * and `false` if the handler was found on the given id
   *
   * @see register
   */
  unregister(channel: IPCChannel, id: HandlerID): boolean

  /**
   * Registers an one-time handler to an IPC channel.
   * The handler is invoked only the next time a message arrives.
   * <br>
   * More information on the `ipcRenderer` module from electron:
   * {@link Electron.ipcRenderer.once}
   *
   * @param channel the channel to listen to
   * @param handler the handler function to register one-time
   */
  registerOnce(channel: IPCChannel, handler: Handler): void

  /**
   * Send an asynchronous message to the main process via the specified channel, along with arguments.
   * <br>
   * More information on the `ipcRenderer` module from electron:
   * {@link Electron.ipcRenderer.send}
   *
   * @param channel the channel to send to
   * @param args additional arguments to send with the message
   */
  send(channel: IPCChannel, ...args: any[]): void

  /**
   * Send a message to the main process and expect a result asynchronously.
   * <br>
   * More information on the `ipcRenderer` module from electron:
   * {@link Electron.ipcRenderers.invoke}
   *
   * @param channel the channel to send to
   * @param args additional arguments to send with the message
   */
  invoke(channel: IPCChannel, ...args: any[]): Promise<any>
}

declare global {
  interface Window {
    MessagesAPI: IPC
  }
}
