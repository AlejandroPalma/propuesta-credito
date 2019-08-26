import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaAclaratoriasComponent } from './lista-aclaratorias.component';

describe('ListaAclaratoriasComponent', () => {
  let component: ListaAclaratoriasComponent;
  let fixture: ComponentFixture<ListaAclaratoriasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaAclaratoriasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaAclaratoriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
