import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class GitreposService {
  constructor(private http: HttpClient) {}

  getRepos() {
    const apiUrl =
      'https://api.github.com/users/Jorge-Rodrigo/repos?sort=created&direction=desc';

    return this.http.get(apiUrl);
  }
  getRepoLanguages(repoFullName: string) {
    const apiUrl = `https://api.github.com/repos/${repoFullName}/languages`;

    return this.http.get(apiUrl);
  }
}
