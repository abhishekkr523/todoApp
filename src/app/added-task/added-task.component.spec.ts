import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddedTaskComponent } from './added-task.component';

describe('AddedTaskComponent', () => {
  let component: AddedTaskComponent;
  let fixture: ComponentFixture<AddedTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddedTaskComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddedTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
