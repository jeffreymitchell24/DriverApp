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
import android.os.Build;

import com.google.firebase.messaging.FirebaseMessagingService;
import com.google.firebase.messaging.RemoteMessage;

import java.util.Map;

import static android.content.Intent.FLAG_ACTIVITY_NEW_TASK;

public class CarFirebaseMessagingService extends FirebaseMessagingService {
    private String LOG_TAG = "CarFirebaseMessagingService";

    @Override
    public void onMessageReceived(RemoteMessage remoteMessage) {
        super.onMessageReceived(remoteMessage);
        Log.d("msg", "onMessageReceived: " + remoteMessage.getData().get("message"));
        Log.d("msg", "onMessageReceived: " + remoteMessage.getNotification().getTitle());
        Log.d("msg", "onMessageReceived: " + remoteMessage.getNotification().getBody());
            Intent intent = new Intent(this, MainActivity.class);
            intent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);
            PendingIntent pendingIntent = PendingIntent.getActivity(this, 0, intent, PendingIntent.FLAG_ONE_SHOT);
            Uri defaultSoundUri= RingtoneManager.getDefaultUri(RingtoneManager.TYPE_NOTIFICATION);
            String channelId = "Default";
            NotificationCompat.Builder builder = new  NotificationCompat.Builder(this, channelId)
                    .setSmallIcon(R.mipmap.ic_launcher)
                    .setContentTitle(remoteMessage.getNotification().getTitle())
                    .setContentText(remoteMessage.getNotification().getBody())
                    .setAutoCancel(true)
                    .setContentIntent(pendingIntent)
                    .setSound(defaultSoundUri);
            NotificationManager manager = (NotificationManager) getSystemService(NOTIFICATION_SERVICE);
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                NotificationChannel channel = new NotificationChannel(channelId, "Default channel", NotificationManager.IMPORTANCE_DEFAULT);
                manager.createNotificationChannel(channel);
            }
                
            manager.notify(0, builder.build());


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
