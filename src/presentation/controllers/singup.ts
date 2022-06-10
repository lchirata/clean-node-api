import { httpResponse, httpRequest, EmailValidator } from '../protocols'
import { MissingParamError, InvalidParamError } from '../error'
import { badRequest, serverError } from '../helper/http-helper'

export class SingUpController{
    private readonly emailValidator: EmailValidator
    constructor(emailValidator: EmailValidator) {
        this.emailValidator = emailValidator   
    }
    handle(httpRequest: httpRequest): httpResponse{
        try {
            const requiredField = ['name', 'email', 'password', 'passwordConfirmation']
        for (const field of requiredField) {
            if (!httpRequest.body[field]) {
                return badRequest(new MissingParamError(field))
            }
        }
        const isValid = this.emailValidator.isValid(httpRequest.body.email)
        if (!isValid) {
            return badRequest(new InvalidParamError('email'))
        }
        } catch (error) {
            return serverError()
       }
    }
}