import { Component, OnInit, OnDestroy } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { Store, select } from '@ngrx/store';
import { forEach, isNil, find } from 'lodash';
import { Subscription } from 'rxjs';
import { filter as rxFilter } from 'rxjs/operators';
import * as LanguageActions from '../../../../shared/actions/language.actions';
import { LANGUAGES } from '../../../../shared/constants/language.constants';


@Component({
  selector: 'mduck-choose-language-popover',
  templateUrl: './choose-language-popover.component.html',
  styleUrls: ['./choose-language-popover.component.scss'],
})
export class ChooseLanguagePopoverComponent implements OnInit, OnDestroy {

  // ATTRIBUTES

  /**
   * The code of the current application language.
   */
  public currentLanguageCode: string;

  /**
   * List of all available languages.
   */
  public languages: { code: string, name: string }[];

  /**
   * A dictionary with all persisting subscriptions.
   */
  private subscriptions: { [key: string]: Subscription };


  // METHODS

  /**
   * Constructor. Take care of necessary injections.
   */
  constructor(
    private popoverController: PopoverController,
    private store: Store<{ currentLanguage: string }>
  ) { }


  /**
   * OnInit hook. Initialise attributes and subscriptions.
   */
  ngOnInit(): void {
    this.languages = LANGUAGES;
    this.subscriptions = {};

    this.subscriptions['currentLanguage$'] = this.store.pipe(select('currentLanguage')).pipe(
      rxFilter<string>(languageCode => !isNil(languageCode))
    ).subscribe(languageCode => {
      this.currentLanguageCode = find(LANGUAGES, lang => lang.code === languageCode).code;
    });
  }


  /**
   * OnDestroy hook. Unsubscribe from persisting subscriptions.
   */
  ngOnDestroy(): void {
    forEach(this.subscriptions, sub => sub.unsubscribe());
  }


  /**
   * Set the current application language and close the popover.
   * @param languageCode The code of the target language.
   */
  setLanguage(languageCode: string): void {
    this.store.dispatch(LanguageActions.languageSetStarted({ languageCode }));
    this.popoverController.dismiss();
  }

}
