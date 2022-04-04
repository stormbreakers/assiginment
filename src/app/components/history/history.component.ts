import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { DataService } from '../../services/data.service';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { HistoryItem } from '../../store/models/history.model';
import { deleteHistory } from '../../store/actions/history.action';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  history$: Observable<Array<HistoryItem>>;
  constructor(
    public dataService: DataService,
    public router: Router,
    private store: Store<{ history: any }>
  ) {
    this.history$ = this.store.select('history');
  }

  ngOnInit(): void {
    console.log('history', this.history$);
    // this.history = this.store.select((store) => store.history);
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

  deleteFromHistory(user:any){
    this.store.dispatch(deleteHistory({
      user,
      login: user.login,
      avatar_url: user.avatar_url
    }));
  }
}
