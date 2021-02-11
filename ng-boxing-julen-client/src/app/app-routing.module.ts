import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BoxerDetailComponent } from './boxer-detail/boxer-detail.component';
import { BoxerEditComponent } from './boxer-edit/boxer-edit.component';
import { BoxerNewComponent } from './boxer-new/boxer-new.component';

const routes: Routes = [
    {path: '',                    component: HomeComponent},
    {path: 'boxers/:id/new', component: BoxerNewComponent},
    {path: 'boxers/:boxerId', component: BoxerDetailComponent},
    {path: 'boxers/:id/edit', component: BoxerEditComponent}
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ], 
    exports: [ RouterModule ]
})
export class AppRoutingModule {

}
