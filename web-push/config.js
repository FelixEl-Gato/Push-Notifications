import webpush from "web-push";

const webPushSettings = () => {
  // const vapidKeys = webpush.generateVAPIDKeys();

  const publicKey =
    "BFI0dhK4asuRZxxu2IRsIAi8bjr83FKtf1LEqVi06Lm3ez3ksl4_YCWh958SZfoCHEXKg6aAu6taYR9X9xcReAQ";

  const privateKey = "qyStceMCWQBSnLsnWAbvIJKqt5Nna6Vh5ohn7xhjbNU";

  webpush.setVapidDetails(
    "mailto:example@yourdomain.org",
    publicKey,
    privateKey
  );
};

export default webPushSettings;
