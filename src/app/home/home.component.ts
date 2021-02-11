import {Component, OnInit} from '@angular/core';
import {Boxer} from '../shared/boxer';
import {BoxerService} from '../shared/boxer.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  boxers: Boxer[]=[];
  constructor(private boxerService: BoxerService) { }

  ngOnInit() {
   this.boxerService.getBoxers().subscribe(
    (data: Boxer[]) => this.boxers = data
   );
  }
}
