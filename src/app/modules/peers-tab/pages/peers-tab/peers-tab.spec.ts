import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PeersTabPage } from './peers-tab.page';

describe('PeersTabPage', () => {
  let component: PeersTabPage;
  let fixture: ComponentFixture<PeersTabPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PeersTabPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PeersTabPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
