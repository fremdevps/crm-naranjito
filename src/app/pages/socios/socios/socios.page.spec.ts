import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SociosPage } from './socios.page';

describe('SociosPage', () => {
  let component: SociosPage;
  let fixture: ComponentFixture<SociosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SociosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
