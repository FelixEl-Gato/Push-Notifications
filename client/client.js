window.addEventListener("load", () => {
  NotificationPermission();
});

const NotificationPermission = async () => {
  const permission = Notification.permission;
  console.log("Starting Notification Permission");
  if (permission === "default") {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      console.log("Notification permission granted.");
      regWorker();
    } else {
      console.log("Unable to get permission to notify.");
    }
  } else if (permission === "granted") {
    console.log("Notification permission granted.");
    regWorker();
  } else {
    console.log("Unable to get permission to notify.");
  }
};

const regWorker = async () => {
  try {
    var publicVapidKey =
      "BFI0dhK4asuRZxxu2IRsIAi8bjr83FKtf1LEqVi06Lm3ez3ksl4_YCWh958SZfoCHEXKg6aAu6taYR9X9xcReAQ";

    navigator.serviceWorker.register("/worker.js", { scope: "/" });

    const reg = await navigator.serviceWorker.ready;
    console.log(reg);

    const sub = await reg.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: publicVapidKey,
    });
    console.log(sub);

    const res = await fetch("/subscribe", {
      method: "POST",
      body: JSON.stringify(sub),
      headers: { "content-type": "application/json" },
    });

    const txt = await res.text();
    console.log(txt);
  } catch (error) {
    console.log(error);
  }
};
