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
}
