import { httpResponse, httpRequest } from '../protocols/http'
import { MissingParamError } from '../error/missing-params-error'

export class SingUpController{
    handle(httpRequest: httpRequest): httpResponse{
        if (!httpRequest.body.name) {
            return {
                statusCode: 400,
                body: new MissingParamError('name')
            }    
        }
        if (!httpRequest.body.email) {
            return {
                statusCode: 400,
                body: new MissingParamError('email')                
            }
        }
        
    }
}