import {Component, OnInit} from '@angular/core';
import {BoxerService} from '../shared/boxer.service';
import {Boxer} from '../shared/boxer';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-boxer-detail',
  templateUrl: './boxer-detail.component.html',
  styleUrls: ['./boxer-detail.component.css']
})
export class BoxerDetailComponent implements OnInit {

  boxer: Boxer;
  boxerId: number;

  constructor(private activatedroute: ActivatedRoute, private router: Router, private boxerService: BoxerService) {}

  ngOnInit() {
    this.boxerId = parseInt(this.activatedroute.snapshot.params['boxerId']);
    this.boxerService.getBoxerById(this.boxerId).subscribe(
      (data: Boxer) => this.boxer = data
    );
  }
  goEdit():void{
    this.router.navigate(['/boxers', this.boxerId, 'edit']);
  }
  onBack(): void {
    this.router.navigate(['']);
  }

}
