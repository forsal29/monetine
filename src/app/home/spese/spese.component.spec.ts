import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeseComponent } from './spese.component';

describe('SpeseComponent', () => {
  let component: SpeseComponent;
  let fixture: ComponentFixture<SpeseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpeseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
