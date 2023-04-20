interface Questionnaire {
  prompt: jest.MockedFunction<(fn: (answers: any) => void) => void>
}

const Questionnaire = {
  prompt: jest.fn((fn) => {
    fn({ name: 'myapp', author: 'John Doe' })
  })
}

const MockedQuestionnaire = jest.fn(() => {
  return {
    prompt: jest.fn((fn) => {
      fn({ name: 'myapp', author: 'John Doe' })
    })
  }
})

Questionnaire.prompt = jest.fn((fn) => {
  fn({ name: 'myapp', author: 'John Doe' })
})

MockedQuestionnaire.mockReturnValue({
  prompt: Questionnaire.prompt
})

export default Questionnaire
