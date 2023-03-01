import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PersonComponent } from './person/components/person-list/person.component';
import { PersonCreateComponent } from './person/components/person-create/person-create.component';
import { RouterModule } from '@angular/router';
import { ToAgePipe } from './service/to-age.pipe';
import { PersonUpdateComponent } from './person/components/person-update/person-update.component';


@NgModule({
  declarations: [
    AppComponent,
    PersonComponent,
    PersonCreateComponent,
    ToAgePipe,
    PersonUpdateComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    
    RouterModule.forRoot([
      { path: 'Person', component: PersonComponent} ,
      {
        path: 'Person/Create',
        component: PersonCreateComponent,
      },
      {
        path: 'Person/Update/:id',
        component: PersonUpdateComponent,
      },
      { path: '', redirectTo: 'Person', pathMatch: 'full' },
      { path: '**', redirectTo: 'Person', pathMatch: 'full' },
    ]),
  ],
  
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
