var webPush = require('web-push');
 
const vapidKeys = {
   "publicKey": "BJJ2lj_dNzGYdwQekGPPbQspr3mw-tlg9330zcrXz2vmXyaaz9e9qcHI1OpPujSFD6h9n5TfVFLT-bSAeThYPkk",
   "privateKey": "zUyQY0ytXSnDuh3TpFdWqfBR8UCTwPjymo5XkECh9kI"
};
 
 
webPush.setVapidDetails(
   'mailto:example@yourdomain.org',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
var pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/fghgLQGstFo:APA91bHRRZ-Y7yx7pxS1I6vcVL_J9tyHhvq0NvKmK0CLFdGKwD9t11AswU4utP3lC8TwpZD8GxAdJEv4nOxlSv3iwGuu00Rl5ZEmWxEvkvDhbnRf-W7bUeNzol1ZzMqLSWL9SuM_IbpU",
   "keys": {
       "p256dh": "BLikzgchnNw/YF8srYacGtgOAnX9AJGZG6hjhThWh5Y45iWBQqEqAtOVMxjxyBsgVTiNeqmjfpdDyans9aHZn34=",
       "auth": "nnULXZVXVRUXYYBqn1YHJw=="
   }
};
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';
 
var options = {
   gcmAPIKey: '775171837077',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
);