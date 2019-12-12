import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OwnerTabPage } from './owner-tab/owner-tab.page';

describe('OwnerTabPage', () => {
  let component: OwnerTabPage;
  let fixture: ComponentFixture<OwnerTabPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OwnerTabPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OwnerTabPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
