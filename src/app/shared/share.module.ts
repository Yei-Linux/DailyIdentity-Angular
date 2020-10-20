import { NgModule, LOCALE_ID } from '@angular/core'
import { CommonModule } from '@angular/common'
import {
  NzAvatarModule, NzTableModule, NzProgressModule, NzCarouselModule, NzRadioModule,
  NzDrawerModule, NzSwitchModule, NzDropDownModule, NzInputModule, NzBadgeModule,
  NzFormModule , NzLayoutModule , NzBackTopModule , NzSelectModule , NzCheckboxModule,
  NzStepsModule, NzButtonModule, NzPageHeaderModule, NzTagModule, NzTabsModule,
  NzModalModule, NzAlertModule, NzTimelineModule, NzPopoverModule, NzMenuModule,
  NzToolTipModule, NzNotificationModule, NzIconModule, NzDatePickerModule, NzMessageModule,
  NzInputNumberModule, NzGridModule, NzCardModule, NzBreadCrumbModule, NzModalService,NZ_I18N ,en_US as localeZorro, NzPopconfirmModule, NzSpinModule, NzTransferModule 
} from 'ng-zorro-antd'
import { RouterModule } from '@angular/router'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'

const MODULES = [CommonModule, RouterModule, HttpClientModule, 
  NzAvatarModule, 
  NzTableModule,
  NzProgressModule,
  NzCarouselModule,
  NzRadioModule,
  NzDrawerModule,
  NzDropDownModule,
  NzInputModule,
  NzBadgeModule,
  NzFormModule,
  NzLayoutModule,
  NzBackTopModule,
  NzSelectModule,
  NzCheckboxModule,
  NzStepsModule,
  NzButtonModule,
  NzPageHeaderModule,
  NzTagModule,
  NzTabsModule,
  NzModalModule,
  NzAlertModule,
  NzTimelineModule,
  NzSwitchModule,
  NzPopoverModule,
  NzMenuModule,
  NzToolTipModule,
  NzNotificationModule,
  NzIconModule,
  NzDatePickerModule,
  NzMessageModule,
  NzInputNumberModule,
  NzGridModule,
  NzCardModule,
  NzBreadCrumbModule,
  NzPopconfirmModule,
  NzSpinModule,
  NzTransferModule 
]

const LOCALE_PROVIDERS = [
  { provide: LOCALE_ID, useValue: 'en' },
  { provide: NZ_I18N, useValue: localeZorro },
]
@NgModule({
  imports: [...MODULES],
  exports: [...MODULES],
  declarations: [],
  providers:[...LOCALE_PROVIDERS]
})
export class SharedModule {}
