import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiciosDestacadosComponent } from './servicios-destacados.component';

describe('ServiciosDestacadosComponent', () => {
  let component: ServiciosDestacadosComponent;
  let fixture: ComponentFixture<ServiciosDestacadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiciosDestacadosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ServiciosDestacadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
