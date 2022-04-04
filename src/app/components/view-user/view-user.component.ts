import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { DataService } from '../../services/data.service';
import { StorageService } from '../../services/storage.service';
import { addHistory } from '../../store/actions/history.action';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent implements OnInit {
  user: any;
  userDetails: any;
  constructor(
    private router: Router,
    public storageService: StorageService,
    public dataService: DataService,
    private store: Store<{ history: any }>
  ) {
    const navigationExtraData: any = this.router.getCurrentNavigation();
    if (navigationExtraData?.extras?.state?.user) {
      this.user = navigationExtraData.extras.state.user;
      this.storageService.set('user', this.user);
    } else {
      const dataExist = this.storageService.get('user');
      if (dataExist) {
        this.user = dataExist;
      }
    }
  }

  ngOnInit(): void {
    if (this.user?.url) {
      this.getUserDetails(this.user.url);
    }
  }

  getUserDetails(url: string) {
    this.dataService.getUserDetails(url).subscribe((result: any) => {
      if (result) {
        this.addOrUpdateHistory(this.user);
        this.userDetails = result;
      }
    })
  }

  addOrUpdateHistory(user: any) {
    this.store.dispatch(addHistory({
      user,
      login: user.login,
      avatar_url: user.avatar_url
    }));
  }
}
