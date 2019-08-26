import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaEnviadasComponent } from './lista-enviadas.component';

describe('ListaEnviadasComponent', () => {
  let component: ListaEnviadasComponent;
  let fixture: ComponentFixture<ListaEnviadasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaEnviadasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaEnviadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
