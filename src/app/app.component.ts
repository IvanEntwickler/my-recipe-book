import { AuthService } from './auth/auth.service';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private authService: AuthService) {}

  ngOnInit() {
    // autologin stored here because AppComponent is rendered at the beginning
    this.authService.autoLogin();
  }
}
