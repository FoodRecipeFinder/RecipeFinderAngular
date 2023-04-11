import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinnerBlackComponent } from './spinner-black.component';

describe('SpinnerBlackComponent', () => {
  let component: SpinnerBlackComponent;
  let fixture: ComponentFixture<SpinnerBlackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpinnerBlackComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpinnerBlackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
