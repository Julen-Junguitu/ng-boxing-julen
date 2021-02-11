import { Component, OnInit } from '@angular/core';
import { BoxerService } from '../shared/boxer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  id : any;

  constructor(private boxerService: BoxerService, private router: Router) { }

  ngOnInit() {
  }

  newBoxer(){
      // Get max product Id from the product list
      this.boxerService.getMaxBoxerId().subscribe(
        data => this.id = data
      );
      this.router.navigate(['/boxers', this.id, 'new'])

  }

}
