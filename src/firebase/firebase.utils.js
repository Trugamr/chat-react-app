import firebase from 'firebase/app'
import 'firebase/analytics'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyBKsHwiG5NuXxuvSN-7jZZLMDqqUDpIlbA',
  authDomain: 'chat-react-app-9357c.firebaseapp.com',
  databaseURL: 'https://chat-react-app-9357c.firebaseio.com',
  projectId: 'chat-react-app-9357c',
  storageBucket: 'chat-react-app-9357c.appspot.com',
  messagingSenderId: '700067181378',
  appId: '1:700067181378:web:a3b7eeb1503a2e1a728edb',
  measurementId: 'G-NJ947Z6DGB'
}

firebase.initializeApp(firebaseConfig)
firebase.analytics()

export const auth = firebase.auth()
export const firestore = firebase.firestore()
export const database = firebase.database()
export const storage = firebase.storage()

export default firebase
