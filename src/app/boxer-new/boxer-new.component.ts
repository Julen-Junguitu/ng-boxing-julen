import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Boxer } from '../shared/boxer';
import { ActivatedRoute, Router } from '@angular/router';
import { BoxerService } from '../shared/boxer.service';

@Component({
  selector: 'app-boxer-new',
  templateUrl: './boxer-new.component.html',
  styleUrls: ['./boxer-new.component.css']
})
export class BoxerNewComponent implements OnInit {

  pageTitle = 'Boxer New';
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
    this.boxerId = parseInt(this.activatedroute.snapshot.params['boxerId']);
  }

  saveBoxer(): void {
    if (this.boxerForm.valid) {
      if (this.boxerForm.dirty) {
        this.boxer = this.boxerForm.value;
        this.boxer.id = this.boxerId;
        
        this.boxerService.createBoxer(this.boxer)
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
