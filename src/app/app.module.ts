import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { Routes, RouterModule } from '@angular/router';
import { DatePipe } from '@angular/common';

import { StoryComponent } from './story/story.component';
import { HttpClientModule } from '@angular/common/http';
import { DailyScheduleReceivingComponent } from './daily-schedule-receiving/daily-schedule-receiving.component';
import { DailyScheduleShipmentComponent } from './daily-schedule-shipment/daily-schedule-shipment.component';
import { TitleComponent } from './globalComponents/title/title.component';
import { ErrorMessageComponent } from './globalComponents/error-message/error-message.component';

const appRoutes: Routes = [
  { path: '', component: AuthenticationComponent },
  { path: 'authentication', component: AuthenticationComponent },
  { path: 'receiving', component: DailyScheduleReceivingComponent },
  { path: 'shipment', component: DailyScheduleShipmentComponent },
  { path: 'story', component: StoryComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    AuthenticationComponent,
    DailyScheduleReceivingComponent,
    StoryComponent,
    DailyScheduleShipmentComponent,
    TitleComponent,
    ErrorMessageComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    FormsModule,
    CommonModule,
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
