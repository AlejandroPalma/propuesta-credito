import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaPropuestasComponent } from './lista-propuestas.component';

describe('ListaPropuestasComponent', () => {
  let component: ListaPropuestasComponent;
  let fixture: ComponentFixture<ListaPropuestasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaPropuestasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaPropuestasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
