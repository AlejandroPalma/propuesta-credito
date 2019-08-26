import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUsercargosComponent } from './admin-usercargos.component';

describe('AdminUsercargosComponent', () => {
  let component: AdminUsercargosComponent;
  let fixture: ComponentFixture<AdminUsercargosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminUsercargosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUsercargosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
