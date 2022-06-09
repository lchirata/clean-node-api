import { SingUpController } from './singup'
import { MissingParamError } from '../error/missing-params-error'
import { InvalidParamError } from '../error/invalid-params-error'
import { serverError } from '../error/server-error'
import { EmailValidator } from '../protocols/email-validator'

interface SutTypes {
    sut: SingUpController,
    emailValidatorStub: EmailValidator
}

const makeSut = (): SutTypes => {
    class EmailValidatorStub implements EmailValidator { //stub é um tipo de teste.
        isValid(email: string): boolean {
            return true
        }
    }
    const emailValidatorStub = new EmailValidatorStub()
    const sut = new SingUpController(emailValidatorStub)
    return {
        emailValidatorStub,
        sut
    }
}

describe('SingUp Controller', () => {

    test('Should return 400 if no name is provided', () => {
        const { sut } = makeSut()
        const httpRequest = {
            body: {
                email: 'any_email@mail.com',
                password: 'any_password',
                passwordConfirmation: 'any_password',
            }
        }
        const httpResponse = sut.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual(new MissingParamError('name'))
    }),     
    test('Should return 400 if no email is provided', () => {
        const { sut } = makeSut()
        const httpRequest = {
            body: {
                name: 'any_name',
                password: 'any_password',
                passwordConfirmation: 'any_password',
            }
        }
        const httpResponse = sut.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual(new MissingParamError('email'))
    })
    test('Should return 400 if no email is provided', () => {
        const { sut } = makeSut()
        const httpRequest = {
            body: {
                name: 'any_name',
                password: 'any_password',
                passwordConfirmation: 'any_password',
            }
        }
        const httpResponse = sut.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual(new MissingParamError('email'))
    })
    test('Should return 400 if invalid email is provided', () => {
        const { sut, emailValidatorStub } = makeSut()
        jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false) // utilizando jest para mocar retorno como false
        const httpRequest = {
            body: {
                name: 'any_name',
                email: 'invalid_email@mail.com',
                password: 'any_password',
                passwordConfirmation: 'any_password',
            }
        }
        const httpResponse = sut.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual(new InvalidParamError('email'))
    })
    test('Should call email validator with valid email', () => {
        const { sut, emailValidatorStub } = makeSut()
        jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false) // utilizando jest para mocar retorno como false
        const httpRequest = {
            body: {
                name: 'any_name',
                email: 'invalid_email@mail.com',
                password: 'any_password',
                passwordConfirmation: 'any_password',
            }
        }
        const httpResponse = sut.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual(new InvalidParamError('email'))
    })
    test('Should call email validator with correct email', () => {
        const { sut, emailValidatorStub } = makeSut()
        const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid')
        const httpRequest = {
            body: {
                name: 'any_name',
                email: 'any_email@mail.com',
                password: 'any_password',
                passwordConfirmation: 'any_password',
            }
        }
        sut.handle(httpRequest)
        expect(isValidSpy).toHaveBeenCalledWith('any_email@mail.com')
    })
    test('Should return 500 if email validator throws', () => {
        class EmailValidatorStub implements EmailValidator { //stub é um tipo de teste.
            isValid(email: string): boolean {
            throw new Error()
            }
        }
        const emailValidatorStub = new EmailValidatorStub()
        const sut = new SingUpController(emailValidatorStub)
        const httpRequest = {
            body: {
                name: 'any_name',
                email: 'invalid_email@mail.com',
                password: 'any_password',
                passwordConfirmation: 'any_password',
            }
        }
        const httpResponse = sut.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(500)
        expect(httpResponse.body).toEqual(new serverError())
    })
    
})

