import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.sass']
})
export class MainComponent implements OnInit {
  public isCollapsed = false;
  public isMobileMenuOpen = false;
  public isMobileView = false;
  
  constructor() { }

  ngOnInit() {
    this.detectViewPort();
    window.addEventListener('resize', () => {
      this.detectViewPort()
    })
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  private detectViewPort(){
    if (window.innerWidth < 768) {
      this.isCollapsed = false;
      this.isMobileView = true;
    }else{
      this.isMobileView = false;
    }
  }
}
