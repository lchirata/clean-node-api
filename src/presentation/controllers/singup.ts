import { httpResponse, httpRequest } from '../protocols/http'
import { MissingParamError } from '../error/missing-params-error'
import { badRequest }  from '../helper/http-helper'

export class SingUpController{
    handle(httpRequest: httpRequest): httpResponse{
        const requiredField = ['name', 'email', 'password']
        for (const field of requiredField) {
            if (!httpRequest.body[field]) {
                return badRequest(new MissingParamError(field))
            }
        }
    }
}