import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculateExchangeComponent } from './calculate-exchange.component';

describe('CalculateExchangeComponent', () => {
  let component: CalculateExchangeComponent;
  let fixture: ComponentFixture<CalculateExchangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalculateExchangeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculateExchangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
