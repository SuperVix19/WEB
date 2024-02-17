import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorsairComponent } from './corsair.component';

describe('CorsairComponent', () => {
  let component: CorsairComponent;
  let fixture: ComponentFixture<CorsairComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CorsairComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CorsairComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
