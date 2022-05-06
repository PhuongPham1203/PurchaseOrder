import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexAccountComponent } from './index-account.component';

describe('IndexAccountComponent', () => {
  let component: IndexAccountComponent;
  let fixture: ComponentFixture<IndexAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexAccountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
