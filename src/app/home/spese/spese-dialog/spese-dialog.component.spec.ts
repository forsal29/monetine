import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeseDialogComponent } from './spese-dialog.component';

describe('SpeseDialogComponent', () => {
  let component: SpeseDialogComponent;
  let fixture: ComponentFixture<SpeseDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpeseDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeseDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
