// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  firebase: {
    projectId: 'inforce-task-9c999',
    appId: '1:757964350173:web:5840c18459be0998173134',
    storageBucket: 'inforce-task-9c999.appspot.com',
    apiKey: 'AIzaSyA9r4osfMPQuBy_WuIr82DYqGRUCIT9I_I',
    authDomain: 'inforce-task-9c999.firebaseapp.com',
    messagingSenderId: '757964350173',
  },
  production: false,
  API: {
    PRODUCT: "http://localhost:3000/products",
    COMMENT: "http://localhost:3000/comments",
  },
  firebaseConfig: {
    apiKey: "AIzaSyA9r4osfMPQuBy_WuIr82DYqGRUCIT9I_I",
    authDomain: "inforce-task-9c999.firebaseapp.com",
    projectId: "inforce-task-9c999",
    storageBucket: "inforce-task-9c999.appspot.com",
    messagingSenderId: "757964350173",
    appId: "1:757964350173:web:5840c18459be0998173134"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
