import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurvaliborComponent } from './curvalibor.component';

describe('CurvaliborComponent', () => {
  let component: CurvaliborComponent;
  let fixture: ComponentFixture<CurvaliborComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurvaliborComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurvaliborComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
