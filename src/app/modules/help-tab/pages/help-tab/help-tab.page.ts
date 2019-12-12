import { Component, OnInit, OnDestroy } from '@angular/core';
import { forEach, find, isNil } from 'lodash';
import { from as rxFrom, Observable, Subscription } from 'rxjs';
import { filter as rxFilter, mergeMap as rxMergeMap } from 'rxjs/operators';
import { PopoverController } from '@ionic/angular';
import {
  ChooseLanguagePopoverComponent
} from '../../components/choose-language-popover/choose-language-popover.component';
import { helpCardList } from '../../constants/help-card-list.constants';
import { LANGUAGES } from 'src/app/shared/constants/language.constants';
import { Store, select } from '@ngrx/store';


@Component({
  selector: 'mduck-help-tab',
  templateUrl: 'help-tab.page.html',
  styleUrls: ['help-tab.page.scss']
})
export class HelpTabPage implements OnInit, OnDestroy {

  // ATTRIBUTES

  /**
   * The ordered list of help cards.
   */
  public helpCardList = helpCardList;

  /**
   * The name of the current application language.
   */
  public currentLanguageName: string;

  /**
   * A dictionary with all persisting subscriptions.
   */
  private subscriptions: { [key: string]: Subscription };


  /**
   * Constructor. Take care of necessary injections.
   */
  constructor(
    private popoverController: PopoverController,
    private store: Store<{ currentLanguage: string }>
  ) { }


  // METHODS

  /**
   * OnInit hook. Initialise attributes and subscriptions.
   */
  ngOnInit(): void {
    this.subscriptions = {};

    this.subscriptions['currentLanguage$'] = this.store.pipe(select('currentLanguage')).pipe(
      rxFilter<string>(languageCode => !isNil(languageCode))
    ).subscribe(languageCode => {
      this.currentLanguageName = find(LANGUAGES, lang => lang.code === languageCode).name;
    });
  }


  /**
   * OnDestroy hook. Unsubscribe from persisting subscriptions.
   */
  ngOnDestroy(): void {
    forEach(this.subscriptions, sub => sub.unsubscribe());
  }


  /**
   * Show the popover to choose the application language.
   * @param ev The DOM click event.
   */
  chooseLanguage(ev: Event): void {
    rxFrom(this.popoverController.create({
      component: ChooseLanguagePopoverComponent,
      componentProps: { popoverController: this.popoverController },
      event: ev,
      translucent: true
    })).pipe(
      rxMergeMap<HTMLIonPopoverElement, Observable<void>>(popover => rxFrom(popover.present()))
    ).subscribe(() => { });
  }

}
