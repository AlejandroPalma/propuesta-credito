import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemoCambioComponent } from './memo-cambio.component';

describe('MemoCambioComponent', () => {
  let component: MemoCambioComponent;
  let fixture: ComponentFixture<MemoCambioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemoCambioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemoCambioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
