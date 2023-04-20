const WebpackConfig = jest.fn()
// @ts-ignore
WebpackConfig.build = jest.fn(() => {
  return {
    renderer: {
      target: 'electron-renderer'
    },
    main: {
      target: 'electron-main'
    },
    preload: {
      target: 'electron-preload'
    }
  }
})

WebpackConfig.mockReturnValue({
  // @ts-ignore
  build: WebpackConfig.build
})

export default WebpackConfig
