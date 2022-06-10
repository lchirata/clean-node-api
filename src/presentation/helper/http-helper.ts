import { httpResponse } from '../protocols'
import { ServerError } from '../error/server-error'

export const badRequest = (error: Error): httpResponse => ({
    statusCode: 400,
    body: error
})
export const serverError = (): httpResponse => ({
    statusCode: 500,
    body: new ServerError()
})