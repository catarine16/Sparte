import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstudosComponent } from './estudos.component';

describe('EstudosComponent', () => {
  let component: EstudosComponent;
  let fixture: ComponentFixture<EstudosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EstudosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EstudosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
