import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAutorizarComponent } from './dialog-autorizar.component';

describe('DialogAutorizarComponent', () => {
  let component: DialogAutorizarComponent;
  let fixture: ComponentFixture<DialogAutorizarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogAutorizarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAutorizarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
