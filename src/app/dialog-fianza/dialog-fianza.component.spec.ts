import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogFianzaComponent } from './dialog-fianza.component';

describe('DialogFianzaComponent', () => {
  let component: DialogFianzaComponent;
  let fixture: ComponentFixture<DialogFianzaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogFianzaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogFianzaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
