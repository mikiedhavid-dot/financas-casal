import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getMessaging, isSupported } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyApwRwGfRBGaDM6_EyiF8LNHYWDBuRuR8E",
  authDomain: "gastos-mikie-e-natalia.firebaseapp.com",
  projectId: "gastos-mikie-e-natalia",
  storageBucket: "gastos-mikie-e-natalia.appspot.com",
  messagingSenderId: "654560313984",
  appId: "1:654560313984:web:ef4d6a82b9924f26905c65",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export async function getFirebaseMessaging() {
  const supported = await isSupported();
  if (!supported) return null;
  return getMessaging(app);
}


