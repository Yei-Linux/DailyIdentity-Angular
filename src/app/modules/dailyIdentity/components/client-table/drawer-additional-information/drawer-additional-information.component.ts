import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-drawer-additional-information',
  templateUrl: './drawer-additional-information.component.html',
  styleUrls: ['./drawer-additional-information.component.sass']
})
export class DrawerAdditionalInformationComponent implements OnInit {
  @Input() visible = false;
  @Input() additionalInformation = null;
  @Output() closeEmitter = new EventEmitter<any>();
  @Output() updateField = new EventEmitter<any>();

  private hasSubmitFooter = false;

  constructor() { }

  ngOnInit() {
  }

  close(): void {
    this.closeEmitter.emit(false);
  }

  updateAdditionalField(event){
    this.updateField.emit(event);
    this.close();
  }

}
