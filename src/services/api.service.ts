import { Injectable } from '@angular/core';
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

  public addUser(user: IUser): Promise<string> {
    return this._users.add(user);
  }

  public async updateUserByDocument(document: string, user: IUser): Promise<void> {
    const count = await this._users
      .where('document')
      .equals(document)
      .modify(user);

    if (count === 0) {
      throw new Error(`Nenhum usuário encontrado com o documento: ${document}`);
    }
  }

  public findAll(): Promise<IUser[]> {
    return this._users.toArray();
  }

  public findByDocument(document: string): Promise<IUser | undefined> {
    return this._users.where('document').equals(document).first();
  }

  public deleteByDocument(document: string): Promise<number> {
    return this._users.where('document').equals(document).delete();
  }
}
