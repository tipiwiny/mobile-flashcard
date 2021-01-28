import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo";
import * as Permissions from "expo-permissions";

const NOTIFICATION_KEY = "Flashcards_Notification";

export function clearLocalNotification() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY).then(
    Notifications.cancelAllScheduledNotificationsAsync
  );
}

function createNotification() {
  return {
      content : {
        title: "Remember your quiz",
        body: "it is easy",
      },
    trigger: {
      hour: 12,
      minute: 58,
      type: 'daily',
    },
  };
}

export async function setLocalNotification() {
  try {
    const async = await AsyncStorage.getItem(NOTIFICATION_KEY);
    const data = JSON.parse(async);
    if (data === null) {
      let { status: existingStatus } = await Permissions.getAsync(
        Permissions.NOTIFICATIONS
      );

      if (existingStatus !== "granted") {
        const status = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        existingStatus = status.status;
      }

      if (existingStatus === "granted") {
        await Notifications.cancelAllScheduledNotificationsAsync();
        await Notifications.scheduleNotificationAsync(createNotification());
        AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
      }
    }
    return;
  } catch (e) {
    throw e;
  }
}
