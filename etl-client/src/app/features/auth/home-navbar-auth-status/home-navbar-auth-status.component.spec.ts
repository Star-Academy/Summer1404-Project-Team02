import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeNavbarAuthStatusComponent } from './home-navbar-auth-status.component';

describe('HomeNavbarAuthStatusComponent', () => {
  let component: HomeNavbarAuthStatusComponent;
  let fixture: ComponentFixture<HomeNavbarAuthStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeNavbarAuthStatusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeNavbarAuthStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
