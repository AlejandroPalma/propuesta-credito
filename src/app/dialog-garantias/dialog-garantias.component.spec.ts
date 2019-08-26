import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogGarantiasComponent } from './dialog-garantias.component';

describe('DialogGarantiasComponent', () => {
  let component: DialogGarantiasComponent;
  let fixture: ComponentFixture<DialogGarantiasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogGarantiasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogGarantiasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
