import { Component } from '@angular/core';
import { GitreposService } from '../../services/gitrepos.service';
import { ReposType } from '../../utils/interfaces';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent {
  repos: ReposType[] = [];
  constructor(private repoService: GitreposService) {}
  ngOnInit(): void {
    this.repoService.getRepos().subscribe((repos: ReposType[] | any) => {
      this.repos = repos;
      this.getLanguagesForRepos();
    });
  }
  getLanguagesForRepos() {
    const processRepos = (index: number) => {
      if (index < this.repos.length) {
        const repo = this.repos[index];
        this.repoService
          .getRepoLanguages(repo.full_name)
          .subscribe((languages: any) => {
            repo.languages = Object.keys(languages);

            setTimeout(() => processRepos(index + 1), 1000);
          });
      }
    };
    processRepos(0);
  }
}
