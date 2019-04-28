/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SpinnerModule } from '@shared-lib/spinner/spinner.module';
import { SpinnerOverlayWrapperComponent } from '@todo-app/shared/spinner-overlay-wrapper/spinner-overlay-wrapper.component';

describe('SpinnerOverlayWrapperComponent', () => {
  let component: SpinnerOverlayWrapperComponent;
  let fixture: ComponentFixture<SpinnerOverlayWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SpinnerOverlayWrapperComponent],
      imports: [SpinnerModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpinnerOverlayWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
