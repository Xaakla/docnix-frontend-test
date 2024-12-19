import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../environments/environment";
import {take} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  private readonly API = `${environment.API}/api/documents`;

  constructor(protected http: HttpClient) {
  }

  public findAllPaginated(params: any) {
    return this.http.get(`${this.API}`, {params})
      .pipe(take(1));
  }

  public findAllGroupedByAcronym(params: any) {
    return this.http.get(`${this.API}/by-acronym`, {params})
      .pipe(take(1));
  }

  public findById(id: number) {
    return this.http.get(`${this.API}/${id}`)
      .pipe(take(1));
  }

  public save(document: any) {
    return this.http.post(`${this.API}`, document)
      .pipe(take(1));
  }

  public submit(id: number) {
    return this.http.patch(`${this.API}/${id}/submit`, {})
      .pipe(take(1));
  }

  public generateVersion(id: number) {
    return this.http.post(`${this.API}/${id}/generate-version`, {})
      .pipe(take(1));
  }

  public editInfo(id: number, document: any) {
    return this.http.patch(`${this.API}/${id}`, document)
      .pipe(take(1));
  }
}
