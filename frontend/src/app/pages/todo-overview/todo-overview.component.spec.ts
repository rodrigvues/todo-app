import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoOverview } from './todo-overview.component';

describe('TodoFormComponent', () => {
  let component: TodoOverview;
  let fixture: ComponentFixture<TodoOverview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoOverview]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoOverview);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
