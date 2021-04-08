import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipmentOrderComponent } from './shipment-order.component';

describe('ShipmentOrderComponent', () => {
  let component: ShipmentOrderComponent;
  let fixture: ComponentFixture<ShipmentOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShipmentOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipmentOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
