import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElevenlabsWidgetComponent } from './elevenlabs-widget.component';

describe('ElevenlabsWidgetComponent', () => {
  let component: ElevenlabsWidgetComponent;
  let fixture: ComponentFixture<ElevenlabsWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ElevenlabsWidgetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ElevenlabsWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
