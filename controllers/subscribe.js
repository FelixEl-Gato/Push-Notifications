import webpush from "web-push";

export const subscribe = async (req, res) => {
  try {
    const subscription = req.body;

    res.status(201).json({});

    const payload = JSON.stringify({ title: "Push Test" });

    webpush.sendNotification(subscription, payload);
  } catch (error) {
    console.log(error);
  }
};
