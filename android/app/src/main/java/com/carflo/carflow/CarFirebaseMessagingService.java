package com.carflo.carflow;

import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.media.RingtoneManager;
import android.net.Uri;
import android.support.v4.app.NotificationCompat;
import android.support.v4.app.NotificationManagerCompat;
import android.support.v4.app.TaskStackBuilder;
import android.util.Log;

import com.google.firebase.messaging.FirebaseMessagingService;
import com.google.firebase.messaging.RemoteMessage;

import java.util.Map;

import static android.content.Intent.FLAG_ACTIVITY_NEW_TASK;

public class CarFirebaseMessagingService extends FirebaseMessagingService {
    private String LOG_TAG = "CarFirebaseMessagingService";

    @Override
    public void onMessageReceived(RemoteMessage remoteMessage) {
        super.onMessageReceived(remoteMessage);

        Map<String, String> data = remoteMessage.getData();
        if(data!=null &&data.size()>0) {
            String title = data.get("title");
            String body = data.get("body");
            senNotification(title,
                    body, data);
//        senNotification(remoteMessage.getNotification().getTitle(),
//                remoteMessage.getNotification().getBody(), data);
        }


    }

    private  void senNotification(String title, String messageBody, Map<String, String> actions){
        Intent intent = new Intent(Intent.ACTION_VIEW, Uri.parse("carfloapp://screen/Home"));
        TaskStackBuilder stackBuilder = TaskStackBuilder.create(this);
        stackBuilder.addNextIntentWithParentStack(intent);
        PendingIntent pendingIntent = stackBuilder.getPendingIntent(0, PendingIntent.FLAG_UPDATE_CURRENT);

        Uri defaultSoundUri= RingtoneManager.getDefaultUri(RingtoneManager.TYPE_NOTIFICATION);
        int NOTIFICATION_ID = 234;
        NotificationManager notificationManager = (NotificationManager) getSystemService(Context.NOTIFICATION_SERVICE);




        String channelId = getString(R.string.default_notification_channel_id);
        if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.O) {


            CharSequence name = "my_channel";
            String Description = "This is my channel";
            int importance = NotificationManager.IMPORTANCE_HIGH;
            NotificationChannel mChannel = new NotificationChannel(channelId, name, importance);
            mChannel.setDescription(Description);
            mChannel.enableLights(true);
            mChannel.enableVibration(true);
            mChannel.setShowBadge(false);
            notificationManager.createNotificationChannel(mChannel);
        }
        NotificationCompat.Builder notificationBuilder =
                new NotificationCompat.Builder(getApplicationContext(), channelId)
                        .setSmallIcon(R.mipmap.ic_launcher)
                        .setContentTitle(title)
                        .setContentText(messageBody)
                        .setAutoCancel(true)
                        .setSound(defaultSoundUri)
                        .setContentIntent(pendingIntent);

        if(actions!=null && actions.size()>0){
            String positiveText = actions.get("positiveText");
            String positiveScreen = actions.get("positiveScreen");
            String negativeText = actions.get("negativeText");
            String negativeScreen = actions.get("negativeScreen");

            if (negativeText != null && negativeScreen!=null && !negativeText.isEmpty() && !negativeScreen.isEmpty()) {
                Log.d(LOG_TAG, negativeScreen);
                Intent negativeIntent = new Intent(Intent.ACTION_VIEW, Uri.parse("carfloapp://screen/"+negativeScreen));
                negativeIntent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);
                stackBuilder.addNextIntentWithParentStack(negativeIntent);
                PendingIntent negativePendingIntent = TaskStackBuilder.create(this).addNextIntentWithParentStack(negativeIntent).getPendingIntent(1, PendingIntent.FLAG_UPDATE_CURRENT);
                notificationBuilder.addAction(0, negativeText, negativePendingIntent);
            }
            if (positiveScreen != null && positiveText!=null && !positiveScreen.isEmpty() && !positiveText.isEmpty()) {
                Log.d(LOG_TAG, positiveScreen);

                Intent positiveIntent = new Intent(Intent.ACTION_VIEW, Uri.parse("carfloapp://screen/"+positiveScreen));
                positiveIntent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);
                stackBuilder.addNextIntentWithParentStack(positiveIntent);
                PendingIntent negativePendingIntent = TaskStackBuilder.create(this).addNextIntentWithParentStack(positiveIntent).getPendingIntent(2, PendingIntent.FLAG_UPDATE_CURRENT);
                notificationBuilder.addAction(0, positiveText, negativePendingIntent);
            }
        }
//        NotificationManager notificationManager = (NotificationManager) getSystemService(Context.NOTIFICATION_SERVICE);

        notificationManager.notify(1 /* ID of notification */, notificationBuilder.build());

    }


}
