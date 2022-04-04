import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, Observable, Subject } from 'rxjs';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  myControl = new FormControl();
  autoCompleteList: any[] = [];
  @ViewChild('autocompleteInput') autocompleteInput: ElementRef | undefined;
  private userSearch: Subject<string> = new Subject<string>();

  constructor(
    public dataService: DataService,
    public router: Router,
  ) { }

  ngOnInit(): void {
    this.userSearch.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe((searchVal) => {
      console.log('searchVal', searchVal);
      if (searchVal !== '') {
        this.getUserList(searchVal);
      }
    });
  }

  displayFn(user: any) {
    let k = user ? user.login : user;
    return k;
  }

  search($event: any): void {
    this.userSearch.next($event?.target?.value?.trim() ?? '');
  }

  getUrl(url: string) {
    return `url(${url})`;
  }

  viewUserDetails(user: any) {
    if (user) {
      const navigationExtras: NavigationExtras = {
        state: {
          user
        }
      };
      this.router.navigate(['/user'], navigationExtras);
    }
  }

  getUserList(search: string): void {
    this.dataService.getUserList(search).subscribe((result: any) => {
      console.log('result', result);
      this.autoCompleteList = result?.items ?? []
    })
  }
}
