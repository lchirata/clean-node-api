import { httpResponse, httpRequest } from '../protocols/http'
import { MissingParamError } from '../error/missing-params-error'
import { badRequest } from '../helper/http-helper'
import { EmailValidator } from '../protocols/email-validator'
import { InvalidParamError } from '../error/invalid-params-error'

export class SingUpController{
    private readonly emailValidator: EmailValidator
    constructor(emailValidator: EmailValidator) {
        this.emailValidator = emailValidator   
    }
    handle(httpRequest: httpRequest): httpResponse{
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
    }
}