import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogoNegocioComponent } from './catalogo-negocio.component';

describe('CatalogoNegocioComponent', () => {
  let component: CatalogoNegocioComponent;
  let fixture: ComponentFixture<CatalogoNegocioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatalogoNegocioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogoNegocioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
