import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.css']
})
export class ButtonsComponent implements OnInit {
  @Input() page = '';
  showDashboard = true;
  showSearch = true;
  showHistory = true;
  constructor() { }

  ngOnInit(): void {
    if (this.page === 'dashboard') {
      this.showDashboard = false;
    }
    if (this.page === 'search') {
      this.showSearch = false;
    }
    if (this.page === 'history') {
      this.showHistory = false;
    }
  }

}
