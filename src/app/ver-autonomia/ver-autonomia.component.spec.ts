import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerAutonomiaComponent } from './ver-autonomia.component';

describe('VerAutonomiaComponent', () => {
  let component: VerAutonomiaComponent;
  let fixture: ComponentFixture<VerAutonomiaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerAutonomiaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerAutonomiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
