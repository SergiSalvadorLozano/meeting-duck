import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { isNil, forEach } from 'lodash';
import * as HelpCardComponentActions from './help-card.actions';


@Component({
  selector: 'mduck-help-card',
  templateUrl: './help-card.component.html',
  styleUrls: ['./help-card.component.scss'],
  animations: [
    trigger('collapsible', [
      state('expanded', style({ height: '*', paddingTop: '*', paddingBottom: '*' })),
      state('collapsed', style({ height: '0', paddingTop: '0', paddingBottom: '0' })),
      transition('expanded <=> collapsed', animate(100))
    ])
  ]
})
export class HelpCardComponent implements OnInit, OnDestroy {

  // ATTRIBUTES

  /**
   * The card's index in the card list.
   */
  @Input() public index: number;

  /**
   * The card's header, always shown.
   */
  @Input() public heading: string;

  /**
   * The card's content as an array of paragraphs. Shown only when expanded.
   */
  @Input() public content: string[];

  /**
   * Observable emitting the currently expanded card's index.
   */
  private expandedCardIndex$: Observable<number>;

  /**
   * True if the card is expanded, and false if it isn't.
   */
  public expanded: boolean;

  /**
   * Subject keeping the currently expanded card's index.
   */
  private subscriptions: { [key: string]: Subscription };


  // METHODS

  /**
   * Constructor.
   */
  constructor(
    private store: Store<{ helpCardExpanded: number }>
  ) { }


  /**
   * OnInit hook. Initialise attributes and subscriptions.
   */
  ngOnInit(): void {
    this.index = !isNil(this.index) ? this.index : null;
    this.heading = this.heading || '';
    this.content = this.content || [];
    this.expanded = false;
    this.subscriptions = {};

    this.expandedCardIndex$ = this.store.pipe(select('helpCardExpanded'));
    this.subscriptions['expandedCardIndex$'] = this.expandedCardIndex$.subscribe(index => {
      this.expanded = !isNil(index) && index === this.index;
    });
  }


  /**
   * OnDestroy hook. Unsubscribe from persisting subscriptions.
   */
  ngOnDestroy(): void {
    forEach(this.subscriptions, sub => sub.unsubscribe());
  }


  /**
   * Expand the current help card.
   */
  expandCard(): void {
    this.store.dispatch(HelpCardComponentActions.cardExpanded({ index: this.index }));
  }


  /**
   * Contract the current help card.
   */
  contractCard(): void {
    this.store.dispatch(HelpCardComponentActions.cardContracted());
  }

}
