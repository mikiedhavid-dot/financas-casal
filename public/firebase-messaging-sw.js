importScripts("https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyApwRwGfRBGaDM6_EyiF8LNHYWDBuRuR8E",
  authDomain: "gastos-mikie-e-natalia.firebaseapp.com",
  projectId: "gastos-mikie-e-natalia",
  storageBucket: "gastos-mikie-e-natalia.appspot.com",
  messagingSenderId: "654560313984",
  appId: "1:654560313984:web:ef4d6a82b9924f26905c65",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const title = payload.notification?.title || "Finanças do Casal";
  const options = {
    body: payload.notification?.body || "Você recebeu uma nova notificação.",
    icon: "/icons/icon-192.png",
    badge: "/icons/icon-192.png",
    data: payload.data || {},
  };

  self.registration.showNotification(title, options);
});

self.addEventListener("notificationclick", function (event) {
  event.notification.close();

  const targetUrl = "/";

  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if ("focus" in client) return client.focus();
      }
      if (clients.openWindow) return clients.openWindow(targetUrl);
    })
  );
});