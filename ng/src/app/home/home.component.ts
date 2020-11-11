import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';

/**
 * Home Component displays a list of issues from a provided URL (thorax repo by default).
 */
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  displayedColumns: string[] = ['number', 'user', 'title', 'comments', 'created_at', 'updated_at', 'state'];
  dataSource: MatTableDataSource<any>;
  url: 'https://api.github.com/repos/walmartlabs/thorax/issues';

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getIssues('https://api.github.com/repos/walmartlabs/thorax/issues');
  }

  // Filters paginator data
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // Pull issues from provided URL
  getIssues(url: string): void {
    this.http.get(url)
    .subscribe(
      data => {
        data = convertDates(data);
        this.dataSource = new MatTableDataSource(Object.values(data));
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }, 0);
      },
      err => console.log('err', err)
    );
  }
}

// converts string to a date object
function convertDates(issues): Array<object> {
  for (const issue of issues) {
    issue.created_at = new Date(issue.created_at);
    issue.updated_at = new Date(issue.updated_at);
  }
  return issues;
}
