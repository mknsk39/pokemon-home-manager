import { createFirebaseServices } from '../services/firebase'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig().public.firebase
  const services = createFirebaseServices(config)

  return {
    provide: {
      firebase: services.app,
      firebaseAuth: services.auth,
      firebaseFirestore: services.firestore,
    },
  }
})
