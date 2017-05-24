import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export abstract class AbstractHttpService<T extends Model> {

  private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  private options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http, private url: string) { }

  getAll(): Observable<T> {
    return this.http.get(`/api/${this.url}`).map(res => res.json());
  }

  create(model: T): Observable<T> {
    return this.http.post(`/api/${this.url}`, JSON.stringify(model), this.options).map(res => res.json());
  }

  get(id: string): Observable<T> {
    return this.http.get(`/api/${this.url}/${id}`).map(res => res.json());
  }

  update(model: T): Observable<T> {
    return this.http.put(`/api/${this.url}/${model._id}`, JSON.stringify(model), this.options).map(res => res.json());
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`/api/${this.url}/${id}`, this.options);
  }
}

export interface Model {
  _id: string;
}
