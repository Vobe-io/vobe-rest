import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AppRoutingModule } from './app-routing.module';
import { NavbarComponent } from './snippets/navbar/navbar.component';
import { FooterComponent } from './snippets/footer/footer.component';
import { SinglePostComponent } from './snippets/single-post/single-post.component';
import { PostComponent } from './post/post.component';
import { FeedComponent } from './feed/feed.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { VerificationComponent } from './auth/verification/verification.component';
import { PostWriterComponent } from './snippets/post-writer/post-writer.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent,
    NavbarComponent,
    FooterComponent,
    FeedComponent,
    SinglePostComponent,
    PostComponent,
    RegisterComponent,
    LoginComponent,
    VerificationComponent,
    PostWriterComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
