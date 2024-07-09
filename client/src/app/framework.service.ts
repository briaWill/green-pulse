import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Framework } from './framework';

@Injectable({
  providedIn: 'root'
})
export class FrameworkService {
  // change when uploaded to cloud shell editor 'https://green-pulse-web-app-vu6zvqlsoa-uc.a.run.app/'
  private url = 'http://localhost:8080';
  frameworks$ = signal<Framework[]>([]);
  framework$ = signal<Framework>({} as Framework);
  
  constructor(private httpClient: HttpClient) { }
//private function to refresh framework, use http client to get
  private refreshFrameworks() {
    this.httpClient.get<Framework[]>(`${this.url}/framework`)
      .subscribe(frameworks => {
        this.frameworks$.set(frameworks);
      });
  }
//public function to get frameworks, runs refresh
  getFrameworks() {
    this.refreshFrameworks();
    return this.frameworks$();
  }
//get frameworks from single user email
  getFramework(Assignee_email: string) {
    this.httpClient.get<Framework>(`${this.url}/framework/${Assignee_email}`).subscribe(framework => {
      this.framework$.set(framework);
      return this.framework$();
    });
  }
// create framework
  createFramework(framework: Framework) {
    return this.httpClient.post(`${this.url}/framework`, framework, { responseType: 'text' });
  }

  updateFramework(id: string, framework: Framework) {
    return this.httpClient.put(`${this.url}/framework/${id}`, framework, { responseType: 'text' });
  }

  deleteFramework(id: string) {
    return this.httpClient.delete(`${this.url}/framework/${id}`, { responseType: 'text' });
  }
}