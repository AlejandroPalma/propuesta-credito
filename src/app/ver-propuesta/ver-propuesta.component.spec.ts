import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerPropuestaComponent } from './ver-propuesta.component';

describe('VerPropuestaComponent', () => {
  let component: VerPropuestaComponent;
  let fixture: ComponentFixture<VerPropuestaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerPropuestaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerPropuestaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
