import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyApwRwGfRBGaDM6_EyiF8LNHYWDBuRuR8E",
  authDomain: "gastos-mikie-e-natalia.firebaseapp.com",
  projectId: "gastos-mikie-e-natalia",
  storageBucket: "gastos-mikie-e-natalia.appspot.com",
  messagingSenderId: "654560313984",
  appId: "1:654560313984:web:ef4d6a82b9924f26905c65",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);