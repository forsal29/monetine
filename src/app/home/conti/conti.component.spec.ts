import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContiComponent } from './conti.component';

describe('ContiComponent', () => {
  let component: ContiComponent;
  let fixture: ComponentFixture<ContiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
