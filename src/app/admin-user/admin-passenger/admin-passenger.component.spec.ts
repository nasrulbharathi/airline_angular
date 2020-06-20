import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPassengerComponent } from './admin-passenger.component';
import { AdminPassengerConfigService } from './admin-passenger-config.service';

describe('AdminPassengerComponent', () => {
  let component: AdminPassengerComponent;
  let fixture: ComponentFixture<AdminPassengerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPassengerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPassengerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should use the crud and filter data from the service', () => {
    let fixture = TestBed.createComponent(AdminPassengerComponent);
    let app = fixture.debugElement.componentInstance;
    let adminPassangerConfigService = fixture.debugElement.injector.get(AdminPassengerConfigService);
    fixture.detectChanges();
    expect(adminPassangerConfigService.crudAndFilterData).toEqual(app.user.name);
  });
});
