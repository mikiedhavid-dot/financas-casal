import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { getToken, onMessage } from "firebase/messaging";
import { auth, db, getFirebaseMessaging } from "./firebase";

const VAPID_KEY = "BK_ae7JUFWiG_DMIVk3yhI1oniZpbdud8B-zvBvmRlI05wa-rz8Nd9616AysuBP2SFQ9Cb8dQVd4ZimHXw03Xw0";

export async function enablePushNotifications() {
  const user = auth.currentUser;
  if (!user) throw new Error("Usuário não autenticado.");

  const permission = await Notification.requestPermission();
  if (permission !== "granted") {
    throw new Error("Permissão de notificação negada.");
  }

  const messaging = await getFirebaseMessaging();
  if (!messaging) {
    throw new Error("Push não suportado neste dispositivo/navegador.");
  }

  const token = await getToken(messaging, {
    vapidKey: VAPID_KEY,
    serviceWorkerRegistration: await navigator.serviceWorker.register("/firebase-messaging-sw.js"),
  });

  if (!token) {
    throw new Error("Não foi possível obter o token de push.");
  }

  await setDoc(
    doc(db, "pushTokens", `${user.uid}_${token.slice(0, 20)}`),
    {
      userId: user.uid,
      userEmail: user.email || null,
      token,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );

  return token;
}

export async function listenForegroundMessages(
  callback: (payload: unknown) => void
) {
  const messaging = await getFirebaseMessaging();
  if (!messaging) return;

  onMessage(messaging, (payload) => {
    callback(payload);
  });
}