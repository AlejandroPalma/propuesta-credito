import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCargosComponent } from './admin-cargos.component';

describe('AdminCargosComponent', () => {
  let component: AdminCargosComponent;
  let fixture: ComponentFixture<AdminCargosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminCargosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCargosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
