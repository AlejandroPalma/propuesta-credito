import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaRevisorComponent } from './lista-revisor.component';

describe('ListaRevisorComponent', () => {
  let component: ListaRevisorComponent;
  let fixture: ComponentFixture<ListaRevisorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaRevisorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaRevisorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
