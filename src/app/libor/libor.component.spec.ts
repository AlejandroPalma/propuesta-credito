import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiborComponent } from './libor.component';

describe('LiborComponent', () => {
  let component: LiborComponent;
  let fixture: ComponentFixture<LiborComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiborComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiborComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
