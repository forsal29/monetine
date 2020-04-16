import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfermaDialogComponent } from './conferma-dialog.component';

describe('ConfermaDialogComponent', () => {
  let component: ConfermaDialogComponent;
  let fixture: ComponentFixture<ConfermaDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfermaDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfermaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
