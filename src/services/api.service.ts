import {Injectable} from '@angular/core';
import {Dexie, PromiseExtended, Table} from "dexie";
import {IUser} from "../interfaces/user.interface";

@Injectable({
  providedIn: 'root'
})
export class ApiService extends Dexie {
  private _users!: Table<IUser, string>;

  constructor() {
    super('DocnixDatabase'); // database name

    this.version(1).stores({
      users: '++id, document, firstname, lastname, email, phone, birthDate, score, number, holderName, expirationDate, securityCode'
    });

    this._users = this.table('users');

    this.initializeDatabase();
  }

  public addUser(user: IUser): Promise<IUser> {
    return new Promise((resolve, reject) => {
      this._users.add(user)
        .then(() => resolve(user))
        .catch(() => reject(user));
    });
  }

  public async updateUserByDocument(document: string, updatedData: IUser): Promise<IUser> {
    const user = await this._users.where('document').equals(document).first();

    if (!user) {
      throw new Error(`Nenhum usuário encontrado com o documento: ${document}`);
    }

    const updatedUser = {...user, ...updatedData}; // Mescla os dados existentes com os novos.

    return new Promise((resolve, reject) => {
      this._users.put(updatedUser)
        .then(() => resolve(user))
        .catch(() => reject(user)); // Atualiza o registro.
    });
  }

  public async findAll(): Promise<IUser[]> {
    return this._users.toArray();
  }

  public findByDocument(document: string): Promise<IUser | undefined> {
    return this._users.where('document').equals(document).first();
  }

  public deleteByDocument(document: string): Promise<string> {
    return new Promise((resolve, reject) => {
      this._users.where('document').equals(document).delete()
        .then(() => resolve(document))
        .catch(() => reject(document));
    });
  }

  // Função para inicializar o banco com alguns dados
  private async initializeDatabase() {
    const usersCount = await this._users.count();

    if (usersCount === 0) { // Se não houver usuários no banco, vamos adicionar dados iniciais
      const initialUsers: IUser[] = [
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

      // Adicionando os dados iniciais no banco
      await this._users.bulkAdd(initialUsers);
    }
  }
}
