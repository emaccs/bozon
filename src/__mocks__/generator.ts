const Generator = jest.fn()
// @ts-ignore
Generator.generate = jest.fn()

Generator.mockReturnValue({
  // @ts-ignore
  generate: Generator.generate
})

export default Generator
