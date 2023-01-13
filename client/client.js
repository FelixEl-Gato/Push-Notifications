var publicVapidKey =
  "BFI0dhK4asuRZxxu2IRsIAi8bjr83FKtf1LEqVi06Lm3ez3ksl4_YCWh958SZfoCHEXKg6aAu6taYR9X9xcReAQ";

const send = async () => {
  console.log("Registering service worker...");
  const register = await navigator.serviceWorker.register("/worker.js", {
    scope: "/",
  });

  console.log("Service Worker Registed...");

  console.log("Registering Push...");
  const subscripcion = await register.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: publicVapidKey,
  });

  console.log("Sending Push...");
  await fetch("/subscribe", {
    method: "POST",
    body: JSON.stringify(subscripcion),
    headers: {
      "content-type": "application/json",
    },
  });

  console.log("Push sent...");
};

const urlBase64ToUint8Array = (base64String) => {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }

  console.log(outputArray);
  return outputArray;
};

if ("serviceWorker" in navigator) {
  console.log("Hola service worker");
  send().catch((err) => console.log(err));
}
