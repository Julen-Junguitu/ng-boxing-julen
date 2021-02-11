import {Component, Input} from '@angular/core';
import {Boxer} from '../shared/boxer';

@Component({
  selector: 'app-boxer-item',
  templateUrl: './boxer-item.component.html',
  styleUrls: ['./boxer-item.component.css']
})
export class BoxerItemComponent {

  @Input() boxer: Boxer;
}
