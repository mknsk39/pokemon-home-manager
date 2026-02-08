import type { Auth } from 'firebase/auth'
import type { Firestore } from 'firebase/firestore'
import type { FirebaseApp } from 'firebase/app'

/* eslint-disable no-unused-vars */
/* NOTE: NuxtApp と ComponentCustomProperties の補強だけを行うファイルで、インターフェースは直接参照されないため ESLint から unused とみなされる。 */
declare module '#app' {
  interface NuxtApp {
    $firebase: FirebaseApp
    $firebaseAuth: Auth
    $firebaseFirestore: Firestore
  }
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $firebase: FirebaseApp
    $firebaseAuth: Auth
    $firebaseFirestore: Firestore
  }
}
