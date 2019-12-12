import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RoomsTabPage } from './rooms-tab.page';

describe('RoomsTabPage', () => {
  let component: RoomsTabPage;
  let fixture: ComponentFixture<RoomsTabPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RoomsTabPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RoomsTabPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
