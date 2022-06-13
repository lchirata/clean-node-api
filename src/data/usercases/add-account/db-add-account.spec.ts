import { DbAddAccount } from '../../usercases/add-account/db-add-account'
import { Encrypter } from '../../protocols/encrypter'

interface SutTypes{
    sut: DbAddAccount
    encrypterStub: Encrypter
}
const makeSut = (): SutTypes => {
    class EncrypterStub {
        async encrypt(value: string): Promise<string> {
            return new Promise(resolve => resolve('hashed_passwod'))
        }
    }   
    const encrypterStub = new EncrypterStub() 
    const sut = new DbAddAccount(encrypterStub)
    return {
        sut, 
        encrypterStub
    }
}

describe('DbAddAccount Usercase', () => {
    test('Should call Encrypter with correct password', async () => {
        const { sut, encrypterStub } = makeSut()
        const encryptSpy = jest.spyOn(encrypterStub, 'encrypt')
        const accountData = {
            name: 'valid_name',
            email: 'valid_email',
            password: 'valid_password'
        }
        await sut.add(accountData)
        expect(encryptSpy).toHaveBeenCalledWith('valid_password')
    })
})