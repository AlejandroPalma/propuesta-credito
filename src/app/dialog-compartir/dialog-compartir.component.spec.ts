import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCompartirComponent } from './dialog-compartir.component';

describe('DialogCompartirComponent', () => {
  let component: DialogCompartirComponent;
  let fixture: ComponentFixture<DialogCompartirComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogCompartirComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCompartirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
