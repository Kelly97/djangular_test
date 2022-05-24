import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { VexModule } from "../@vex/vex.module";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { CustomLayoutModule } from "./custom-layout/custom-layout.module";
import { TokenInterceptorService } from "./services/token-interceptor.service";
import { HttpErrorInterceptorService } from "./services/http-error-interceptor.service";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { ComponentsModule } from "./components/components.module";
import { LoadingInterceptorService } from "./services/loading-interceptor.service";
import { HeadersInterceptorService } from "./services/headers-interceptor.service";

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
      useClass: HttpErrorInterceptorService,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
