import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InlineProfileComponent } from './inline-profile.component';

describe('InlineProfileComponent', () => {
  let component: InlineProfileComponent;
  let fixture: ComponentFixture<InlineProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InlineProfileComponent],
      imports: [BrowserAnimationsModule],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InlineProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
