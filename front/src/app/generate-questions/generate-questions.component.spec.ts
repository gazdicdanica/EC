import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateQuestionsComponent } from './generate-questions.component';

describe('GenerateQuestionsComponent', () => {
  let component: GenerateQuestionsComponent;
  let fixture: ComponentFixture<GenerateQuestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GenerateQuestionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GenerateQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
