import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailableCarComponent } from './available-car.component';

describe('AvailableCarComponent', () => {
  let component: AvailableCarComponent;
  let fixture: ComponentFixture<AvailableCarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvailableCarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvailableCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
