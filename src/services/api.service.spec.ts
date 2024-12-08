import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {ApiService} from "./api.service";
import {IUser} from "../interfaces/user.interface";

describe('UserService', () => {
  let apiService: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService],
    });

    apiService = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should retrieve users', async () => {
    const dummyUsers: IUser[] = [
      {
        document: '12312312312',
        firstName: 'Diego',
        lastName: 'Rocha do Bonfim',
        email: 'diego.rb0307@gmail.com',
        phone: '62996764631',
        birthDate: '2004-03-06',
        number: '1234123412341234',
        holderName: 'DIEGO ROCHA DO BONFIM',
        expirationDate: '2030-07',
        securityCode: '244',
        score: 679
      },
      {
        document: '09912312312',
        firstName: 'Camila',
        lastName: 'Pereira Assis',
        email: 'camila@gmail.com',
        phone: '62992045332',
        birthDate: '2004-10-11',
        number: '1234123412348765',
        holderName: 'CAMILA PEREIRA ASSIS',
        expirationDate: '2032-01',
        securityCode: '927',
        score: 812
      },
      {
        document: '42212312312',
        firstName: 'Enzo',
        lastName: 'Ferreira Costa',
        email: 'enzo@gmail.com',
        phone: '62997104279',
        birthDate: '1992-10-01',
        number: '1234643512348765',
        holderName: 'ENZO FERREIRA COSTA',
        expirationDate: '2027-12',
        securityCode: '501',
        score: 430
      }
    ];

    // Mock do método findAll
    spyOn(apiService, 'findAll').and.returnValue(Promise.resolve(dummyUsers));

    const result = await apiService.findAll();
    expect(result.length).toBe(3); // Verifica o número de itens retornados
    expect(result).toEqual(dummyUsers); // Verifica se os dados retornados estão corretos
  });

  it('should create a user', () => {
    const newUser: IUser = {
      document: '56612312312',
      firstName: 'Aline',
      lastName: 'Castro Souza',
      email: 'aline@gmail.com',
      phone: '62967819031',
      birthDate: '1988-09-09',
      number: '1234123412341234',
      holderName: 'ALINE CASTRO SOUZA',
      expirationDate: '2029-10',
      securityCode: '991',
      score: 910
    };

    apiService.addUser(newUser).then(user => {
      expect(user).toEqual(newUser);
    });
  });

  it('should update a user', () => {
    const updatedUser: IUser = {
      document: '12312312312',
      firstName: 'Diego',
      lastName: 'Rocha do Bonfim Updated',
      email: 'diego.rb0307@gmail.com',
      phone: '62996764631',
      birthDate: '2004-03-06',
      number: '1234123412341234',
      holderName: 'DIEGO ROCHA DO BONFIM',
      expirationDate: '2030-07',
      securityCode: '244',
      score: 600
    };

    apiService.updateUserByDocument(updatedUser.document, updatedUser).then(user => {
      expect(user).toEqual(updatedUser);
    });
  });

  it('should delete a user', () => {
    const userDocument = '42212312312';

    apiService.deleteByDocument(userDocument).then(response => {
      expect(response).toBe(userDocument);
    });
  });
});
