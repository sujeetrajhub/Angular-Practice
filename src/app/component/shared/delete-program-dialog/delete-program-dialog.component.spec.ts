import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteProgramDialogComponent } from './delete-program-dialog.component';

describe('DeleteProgramDialogComponent', () => {
  let component: DeleteProgramDialogComponent;
  let fixture: ComponentFixture<DeleteProgramDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DeleteProgramDialogComponent]
    });
    fixture = TestBed.createComponent(DeleteProgramDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
