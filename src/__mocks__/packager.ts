const Packager = jest.fn()
// @ts-ignore
Packager.build = jest.fn().mockResolvedValue(true)

Packager.mockReturnValue({
  // @ts-ignore
  build: Packager.build
})

export default Packager
