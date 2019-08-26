import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaAutonomiaComponent } from './lista-autonomia.component';

describe('ListaAutonomiaComponent', () => {
  let component: ListaAutonomiaComponent;
  let fixture: ComponentFixture<ListaAutonomiaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaAutonomiaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaAutonomiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
