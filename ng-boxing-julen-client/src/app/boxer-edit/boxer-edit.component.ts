import { Component, OnInit, AfterViewInit, OnDestroy, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Boxer } from '../shared/boxer';
import { BoxerService } from '../shared/boxer.service';

@Component({
  templateUrl: './boxer-edit.component.html'
})
export class BoxerEditComponent implements OnInit{

  pageTitle = 'Boxer Edit';
  errorMessage: string;
  boxerForm: FormGroup;

  boxerId:number;
  boxer: Boxer;

  constructor(private fb: FormBuilder,
    private activatedroute: ActivatedRoute,
    private router: Router,
    private boxerService: BoxerService) {  }

  ngOnInit(): void {
    this.boxerForm = this.fb.group({
      name: ['', [Validators.required]],
      country: ['', [Validators.required]],
      age: ['', [Validators.required]],
      record: ['', [Validators.required]],
      lastOponents: '',
      image: ['', [Validators.required]]
    });

    // Read the boxer Id from the route parameter
    this.boxerId = parseInt(this.activatedroute.snapshot.params['id']);
    this.getBoxer(this.boxerId);
  }

  getBoxer(id: number): void {
    this.boxerService.getBoxerById(id)
      .subscribe(
        (boxer: Boxer) => this.displayBoxer(boxer),
        (error: any) => this.errorMessage = <any>error
      );
  }

  displayBoxer(boxer: Boxer): void {
    if (this.boxerForm) {
      this.boxerForm.reset();
    }
    this.boxer = boxer;
    this.pageTitle = `Edit Boxer: ${this.boxer.name}`;

    // Update the data on the form
    this.boxerForm.patchValue({
      name: this.boxer.name,
      country: this.boxer.country,
      age: this.boxer.age,
      record: this.boxer.record,
      lastOponents: this.boxer.lastOponents,
      image: this.boxer.image
    });
  }

  deleteBoxer(): void {
    if (this.boxer.id === 0) {
      // Don't delete, it was never saved.
      this.onSaveComplete();
    } else {
      if (confirm(`Really delete the boxer: ${this.boxer.name}?`)) {
        this.boxerService.deleteBoxer(this.boxer.id)
          .subscribe(
            () => this.onSaveComplete(),
            (error: any) => this.errorMessage = <any>error
          );
      }
    }
  }


  saveBoxer(): void {
    if (this.boxerForm.valid) {
      if (this.boxerForm.dirty) {
        this.boxer = this.boxerForm.value;
        this.boxer.id = this.boxerId;
        
        this.boxerService.updateBoxer(this.boxer)
        .subscribe(
          () => this.onSaveComplete(),
          (error: any) => this.errorMessage = <any>error
        );
      
        
      } else {
        this.onSaveComplete();
      }
    } else {
      this.errorMessage = 'Please correct the validation errors.';
    }
  }

  onSaveComplete(): void {
    // Reset the form to clear the flags
    this.boxerForm.reset();
    this.router.navigate(['']);
  }
}
