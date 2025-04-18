import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadHomeComponent } from './head-home.component';

describe('HeadHomeComponent', () => {
  let component: HeadHomeComponent;
  let fixture: ComponentFixture<HeadHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeadHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeadHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
