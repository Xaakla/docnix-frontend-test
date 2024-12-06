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

  public async updateUserByDocument(document: string, updatedData: IUser): Promise<void> {
    const user = await this._users.where('document').equals(document).first();

    if (!user) {
      throw new Error(`Nenhum usuário encontrado com o documento: ${document}`);
    }

    const updatedUser = { ...user, ...updatedData }; // Mescla os dados existentes com os novos.
    await this._users.put(updatedUser); // Atualiza o registro.
  }

  public async findAll(): Promise<IUser[]> {
    return this._users.toArray();
  }

  public findByDocument(document: string): Promise<IUser | undefined> {
    return this._users.where('document').equals(document).first();
  }

  public deleteByDocument(document: string): Promise<number> {
    return this._users.where('document').equals(document).delete();
  }
}
