import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaCompartidasComponent } from './lista-compartidas.component';

describe('ListaCompartidasComponent', () => {
  let component: ListaCompartidasComponent;
  let fixture: ComponentFixture<ListaCompartidasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaCompartidasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaCompartidasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
