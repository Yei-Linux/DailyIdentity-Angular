import { Component } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute, NavigationStart } from '@angular/router'
@Component({
  selector: 'app-root',
  template: `
    <router-outlet></router-outlet>
  `,
})
export class AppComponent {
}
