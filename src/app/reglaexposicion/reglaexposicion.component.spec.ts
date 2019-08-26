import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReglaexposicionComponent } from './reglaexposicion.component';

describe('ReglaexposicionComponent', () => {
  let component: ReglaexposicionComponent;
  let fixture: ComponentFixture<ReglaexposicionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReglaexposicionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReglaexposicionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
