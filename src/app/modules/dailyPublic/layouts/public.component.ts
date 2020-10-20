import { OnInit, Component } from "@angular/core";

@Component({
  template: `
    <router-outlet> </router-outlet>
  `
})
export class PublicLayoutComponent implements OnInit {
  ngOnInit(): void {}
}
