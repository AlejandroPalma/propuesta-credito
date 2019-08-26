import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCuadroautonomiasComponent } from './admin-cuadroautonomias.component';

describe('AdminCuadroautonomiasComponent', () => {
  let component: AdminCuadroautonomiasComponent;
  let fixture: ComponentFixture<AdminCuadroautonomiasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminCuadroautonomiasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCuadroautonomiasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
