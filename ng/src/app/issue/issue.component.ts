import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

/**
 * Issue Component displays detailed information for a given issue.
 */
@Component({
  selector: 'app-issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.css']
})
export class IssueComponent implements OnInit {
  issue: any;
  comments: any;

  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const issueNumber = params.get('number');
      const owner = params.get('owner');
      const repo = params.get('repo');

      // Get issue data
      this.http.get(`https://api.github.com/repos/${owner}/${repo}/issues/${issueNumber}`)
      .subscribe(
        data => this.issue = convertDates(data),
        err => console.log('err', err)
      );

      // Get comment data
      this.http.get(`https://api.github.com/repos/${owner}/${repo}/issues/${issueNumber}/comments`)
      .subscribe(
        data => this.comments = convertDates(data),
        err => console.log('err', err)
      );
    });
  }

}

// Converts string to a date object
function convertDates(issues): Array<object> {
  if (Array.isArray(issues)) {
    for (const issue of issues) {
      issue.created_at = new Date(issue.created_at);
      issue.updated_at = new Date(issue.updated_at);
    }
  }
  else {
    issues.created_at = new Date(issues.created_at);
    issues.updated_at = new Date(issues.updated_at);
  }

  return issues;
}
