type TBooks = TResponse<'/api/v1/Books', 'get'>
type TBook = TResponse<'/api/v1/Books/{id}', 'get'>
type TBooksRequestBody = TRequestBody<'/api/v1/Books', 'post'>
