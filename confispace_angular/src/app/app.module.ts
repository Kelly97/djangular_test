import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { VexModule } from "../@vex/vex.module";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { CustomLayoutModule } from "./custom-layout/custom-layout.module";

import { MatSnackBarModule } from "@angular/material/snack-bar";
import { ComponentsModule } from "./components/components.module";
import { MatDatepickerModule } from "@angular/material/datepicker";

import { TokenInterceptorService } from "./services/token-interceptor.service";
import { LoadingInterceptorService } from "./services/loading-interceptor.service";
import { HeadersInterceptorService } from "./services/headers-interceptor.service";
import { NotifierInterceptorService } from "./services/notifier-interceptor.service";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    VexModule,
    CustomLayoutModule,
    MatSnackBarModule,
    ComponentsModule,
    MatDatepickerModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeadersInterceptorService,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: NotifierInterceptorService,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptorService,
      multi: true,
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
