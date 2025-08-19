import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileListingItem } from './profile-listing-item';

describe('ProfileListingItem', () => {
  let component: ProfileListingItem;
  let fixture: ComponentFixture<ProfileListingItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileListingItem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileListingItem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
