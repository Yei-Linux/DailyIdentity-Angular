import { Component, OnInit } from '@angular/core';
import { TransferItem } from 'ng-zorro-antd';
import { TokenService } from '../../../services/token.service';

@Component({
  selector: 'app-additional-information',
  templateUrl: './additional-information.component.html',
  styleUrls: ['./additional-information.component.sass']
})
export class AdditionalInformationComponent implements OnInit {
  public list: TransferItem[] = [];
  public isSpinning : Boolean = false;

  constructor(private tokenService: TokenService) { }

  ngOnInit() {
    this.getAdditionalTokenFields();
  }

  get tokenId(){
    return JSON.parse(localStorage.getItem('additional_information_user'))['tokenId'];
  }

  addingFields(totalFields : any){
    totalFields.map( (field,index) => {
      this.list.push({
        key: index.toString(),
        title: field['field'],
        direction: 'left',
        disabled: false,
        tag: 'To select'
      });
    });
    this.isSpinning = false;
  }

  filteringSelectedFields(selectedFields : any[]){
    this.list.forEach( (field,index) => {
      if(selectedFields.includes(field['title'])){
        this.list[index].direction = 'right';
      }
    });
  }

  convertingObjectArrayToArray(objectArray : any){
    let array = [];
    objectArray.filter( object => {
      array.push(object['field']);
    });
    return array;
  }

  filteringItemSelectedBySide(direction : string){
    return this.list.filter( item => item.direction == direction );
  }

  buildingRequestToNewFormat(objectArray : any){
    let array = [];
    objectArray.map( item => {
      array.push({field: item.title,value: null});
    });
    return array;
  }

  getAdditionalTokenFields(){
    this.isSpinning = true;
    this.tokenService.getAdditionalInformationFieldsUser().subscribe( response => {
      this.getAdditionalInformationByToken(response);
    });
  }

  getAdditionalInformationByToken(response){
    this.tokenService.getAdditionalInformationForToken(this.tokenId).subscribe( responseSelectedFields => {
      let selectecFields = this.convertingObjectArrayToArray(responseSelectedFields);
      this.addingFields(response);
      this.filteringSelectedFields(selectecFields);
    });
  }

  convertItems(items: TransferItem[]): TransferItem[] {
    return items.filter(i => !i.hide);
  }

  updateAdditionalInformationFields(){
    let newRequest = this.buildingRequestToNewFormat(this.filteringItemSelectedBySide('right'));
    this.tokenService.postAdditionalInformationForToken(this.tokenId,JSON.stringify(newRequest)).subscribe( response => {
      this.list = [];
      this.getAdditionalTokenFields();
    });
  }
}
