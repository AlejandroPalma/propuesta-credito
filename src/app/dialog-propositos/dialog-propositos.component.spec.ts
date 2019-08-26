import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogPropositosComponent } from './dialog-propositos.component';

describe('DialogPropositosComponent', () => {
  let component: DialogPropositosComponent;
  let fixture: ComponentFixture<DialogPropositosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogPropositosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogPropositosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
