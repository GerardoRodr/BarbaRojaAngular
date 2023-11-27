import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionarReservasDetalleComponent } from './gestionar-reservas-detalle.component';

describe('GestionarReservasDetalleComponent', () => {
  let component: GestionarReservasDetalleComponent;
  let fixture: ComponentFixture<GestionarReservasDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionarReservasDetalleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GestionarReservasDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
