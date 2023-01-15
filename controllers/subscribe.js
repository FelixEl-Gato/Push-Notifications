import webpush from "web-push";

export const subscribe = async (req, res) => {
  try {
    const subscription = req.body;
    console.log(subscription);

    res.status(201).json({});

    const payload = JSON.stringify({ title: "Push Test" });

    notification = await webpush.sendNotification(subscription, payload);
    console.log(notification);
  } catch (error) {
    console.log(error);
  }
};
