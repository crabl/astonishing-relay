import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReplayMapComponent } from './replay-map.component';

describe('ReplayMapComponent', () => {
  let component: ReplayMapComponent;
  let fixture: ComponentFixture<ReplayMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReplayMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReplayMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
