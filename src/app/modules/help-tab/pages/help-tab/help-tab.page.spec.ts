import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HelpTabPage } from './help-tab.page';

describe('HelpTabPage', () => {
  let component: HelpTabPage;
  let fixture: ComponentFixture<HelpTabPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HelpTabPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HelpTabPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
