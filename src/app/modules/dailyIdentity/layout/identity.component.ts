import { OnInit, Component } from '@angular/core';

@Component({
    template: `
      <router-outlet> </router-outlet>
    `,
  })
  export class IdentityLayoutComponent implements OnInit  {
    ngOnInit(): void {}
  }