import { httpResponse, httpRequest } from '../protocols/http'
import { MissingParamError } from '../error/missing-params-error'
import { badRequest }  from '../helper/http-helper'

export class SingUpController{
    handle(httpRequest: httpRequest): httpResponse{
        if (!httpRequest.body.name) {
            return badRequest( new MissingParamError('name')) 
               
        }
        if (!httpRequest.body.email) {
            return badRequest( new MissingParamError('email')) 
        }
        
    }
}