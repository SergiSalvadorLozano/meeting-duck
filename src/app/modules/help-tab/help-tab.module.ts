import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpLoaderFactory } from 'src/app/app.module';
import { HelpTabPage } from './pages/help-tab/help-tab.page';
import { HelpCardComponent } from './components/help-card/help-card.component';
import { ChooseLanguagePopoverComponent } from './components/choose-language-popover/choose-language-popover.component';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: HelpTabPage }]),
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  declarations: [
    ChooseLanguagePopoverComponent,
    HelpTabPage,
    HelpCardComponent
  ],
  entryComponents: [
    ChooseLanguagePopoverComponent,
  ]
})
export class HelpTabPageModule { }
