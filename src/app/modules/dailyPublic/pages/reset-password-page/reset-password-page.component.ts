import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-reset-password-page',
  templateUrl: './reset-password-page.component.html',
  styleUrls: ['./reset-password-page.component.sass']
})
export class ResetPasswordPageComponent implements OnInit {

  public currentRoute : any;

  constructor(private route: ActivatedRoute,) {
    this.route.params.pipe(first()).subscribe(params => {
      this.currentRoute = params;
    })
  }

  ngOnInit() {}

}
