import { httpResponse, httpRequest, EmailValidator, AddAccount } from './singup-protocols'
import { MissingParamError, InvalidParamError } from '../../error'
import { badRequest, serverError, ok } from '../../helper/http-helper'

export class SingUpController{
    private readonly emailValidator: EmailValidator
    private readonly addAccount: AddAccount

    constructor(emailValidator: EmailValidator, addAccount: AddAccount) {
        this.emailValidator = emailValidator
        this.addAccount = addAccount
    }
    handle(httpRequest: httpRequest): httpResponse{
        try {
            const requiredField = ['name', 'email', 'password', 'passwordConfirmation']
        for (const field of requiredField) {
            if (!httpRequest.body[field]) {
                return badRequest(new MissingParamError(field))
            }
        }
        const {name, email, password, passwordConfirmation} = httpRequest.body
            if (password !== passwordConfirmation) {
                return badRequest(new InvalidParamError('passwordConfirmation'))
            }
        const isValid = this.emailValidator.isValid(email)
            if (!isValid) {
                return badRequest(new InvalidParamError('email'))
            }
        const account = this.addAccount.add({
            name,
            email,
            password
        }) 
            return ok(account)
        } catch (error) {
            return serverError()    
       }
    }
}