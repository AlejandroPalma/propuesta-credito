import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerRevisorComponent } from './ver-revisor.component';

describe('VerRevisorComponent', () => {
  let component: VerRevisorComponent;
  let fixture: ComponentFixture<VerRevisorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerRevisorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerRevisorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
