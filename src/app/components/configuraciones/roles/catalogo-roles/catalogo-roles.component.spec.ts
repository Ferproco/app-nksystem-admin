import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogoRolesComponent } from './catalogo-roles.component';

describe('CatalogoRolesComponent', () => {
  let component: CatalogoRolesComponent;
  let fixture: ComponentFixture<CatalogoRolesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatalogoRolesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogoRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
