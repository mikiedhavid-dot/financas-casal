import { addDoc, collection, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { auth, db } from "./firebase";

export async function createNotification(text: string, type: string, month: string) {
  const user = auth.currentUser;

  await addDoc(collection(db, "notifications"), {
    text,
    type,
    month,
    seen: false,
    userId: user?.uid || null,
    userEmail: user?.email || null,
    createdAt: serverTimestamp(),
  });
}

export async function markSeen(id: string) {
  await updateDoc(doc(db, "notifications", id), {
    seen: true,
  });
}

export async function reactivateNotification(id: string) {
  await updateDoc(doc(db, "notifications", id), {
    seen: false,
  });
}