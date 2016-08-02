import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { AppComponent, environment } from './app/';
import { FIREBASE_PROVIDERS, defaultFirebase } from 'angularfire2';

if (environment.production) {
  enableProdMode();
}

bootstrap(AppComponent,[
  FIREBASE_PROVIDERS,
  defaultFirebase({
    apiKey: "AIzaSyAjTZ4f9H_2zTDjK8gHvFoETVqUVH4gy4Q",
    authDomain: "mycontacts-ffd7d.firebaseapp.com",
    databaseURL: "https://mycontacts-ffd7d.firebaseio.com",
    storageBucket: "mycontacts-ffd7d.appspot.com"
  })
]);
