// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getDatabase } from 'firebase/database'
import {
  doc,
  getDoc,
  getFirestore,
  collection,
  getDocs,
} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDHeDOSW4Ur27p0ld4apA85-0r454mg3S8',
  authDomain: 'bills-manager-9bd6e.firebaseapp.com',
  projectId: 'bills-manager-9bd6e',
  storageBucket: 'bills-manager-9bd6e.appspot.com',
  messagingSenderId: '651918356622',
  appId: '1:651918356622:web:65fd4a7e03d812089e99df',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)

export const db = getFirestore()
export const productsRef = collection(db, 'products')
export const billsRef = collection(db, 'bills')
export const categoriesRef = collection(db, 'categories')
export const monthsRef = collection(db, 'months')
export const yearsRef = collection(db, 'years')

