class GeneralService {
  getBooks () {
    return useApiClient.get('/api/v1/Books')
  }

  createBook () {
    return useApiClient.post('/api/v1/Books', { description: '' })
  }

  updateBook () {
    return useApiClient.put(
      '/api/v1/Books/{id}',
      { pageCount: 1, description: '123' },
      { dynamicKeys: { id: 123 } }
    )
  }
}

export const generalService = new GeneralService()
