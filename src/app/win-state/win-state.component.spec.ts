import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WinStateComponent } from './win-state.component';

describe('WinStateComponent', () => {
  let component: WinStateComponent;
  let fixture: ComponentFixture<WinStateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WinStateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WinStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
