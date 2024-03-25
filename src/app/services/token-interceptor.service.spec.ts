import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TokenInterceptorService } from './token-interceptor.service';

describe('TokenInterceptorService', () => {
  let component: TokenInterceptorService;
  let fixture: ComponentFixture<TokenInterceptorService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TokenInterceptorService]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TokenInterceptorService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
