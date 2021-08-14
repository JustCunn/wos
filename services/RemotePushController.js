/*import React, { useEffect } from 'react'
import PushNotification from 'react-native-push-notification';
import database, { firebase } from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

const RemotePushController = () => {
  const database = firebase.app().database('https://watchout-safety-default-rtdb.europe-west1.firebasedatabase.app/');
  const userId = auth().currentUser.uid;

  useEffect(() => {
    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: function(token) {
        database.ref('/users/' + userId).update({notif_token: token.token}).then(() => console.log('Data updated.'))
        .catch((error) => console.log(error))
      },
// (required) Called when a remote or local notification is opened or received
      onNotification: function(notification) {
        console.log('REMOTE NOTIFICATION ==>', notification);
        PushNotification.localNotification({
          channelId: 'channel-id',
          title:notification.data.title,
          message:notification.data.message,
          soundName: 'default',
          playSound: true,
      });
        if (notification.foreground) {
          PushNotification.localNotification({
              channelId: 'channel-id',
              title:notification.data.title,
              message:notification.data.message,
              soundName: 'default',
              playSound: true,
          });
        }; 
// process the notification here
      },
      // Android only: GCM or FCM Sender ID
      senderID: '356649573685',
      popInitialNotification: true,
      requestPermissions: true,
      foreground: true,
    })
  }, [])
return null
}
export default RemotePushController*/