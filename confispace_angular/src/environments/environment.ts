// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { HttpHeaders } from "@angular/common/http";

export const environment = {
  production: false,
  appName: "ConfiSpace",
  uri_api: 'http://localhost:8000/api/',
  standardDate: 'YYYY-MM-DD',
  skipNotifierHeader: new HttpHeaders({'skipNotifier': 'true',}),
  skipHeaders: new HttpHeaders({'skipHeaders': 'true',}),
  skipLoadingHeader: new HttpHeaders({'skipLoading': 'true',}),
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
