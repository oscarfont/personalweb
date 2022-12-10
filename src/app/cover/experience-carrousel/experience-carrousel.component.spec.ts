import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperienceCarrouselComponent } from './experience-carrousel.component';

describe('ExperienceCarrouselComponent', () => {
  let component: ExperienceCarrouselComponent;
  let fixture: ComponentFixture<ExperienceCarrouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExperienceCarrouselComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExperienceCarrouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
