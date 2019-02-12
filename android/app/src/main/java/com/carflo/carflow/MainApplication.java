package com.carflo.carflow;

import android.app.Application;

import com.RNFetchBlob.RNFetchBlobPackage;
import com.RNTextInputMask.RNTextInputMaskPackage;
import com.airbnb.android.react.maps.MapsPackage;
import com.apsl.versionnumber.RNVersionNumberPackage;
import com.facebook.react.ReactApplication;
import com.dieam.reactnativepushnotification.ReactNativePushNotificationPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.henninghall.date_picker.DatePickerPackage;
import com.imagepicker.ImagePickerPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.rnfs.RNFSPackage;

import org.devio.rn.splashscreen.SplashScreenReactPackage;
import org.reactnative.camera.RNCameraPackage;

import java.util.Arrays;
import java.util.List;

import br.com.classapp.RNSensitiveInfo.RNSensitiveInfoPackage;
import fr.bamlab.rnimageresizer.ImageResizerPackage;
import io.invertase.firebase.RNFirebasePackage;
import io.invertase.firebase.messaging.RNFirebaseMessagingPackage;

// import com.wheelpicker.WheelPickerPackage;
// import com.zyu.ReactNativeWheelPickerPackage;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
              new MainReactPackage(),
            new ReactNativePushNotificationPackage(),
              new RNFirebasePackage(),
              new DatePickerPackage(),
              // new WheelPickerPackage(),
              // new ReactNativeWheelPickerPackage(),
              new RNFSPackage(),
              new ImagePickerPackage(),
              new RNTextInputMaskPackage(),
              new RNSensitiveInfoPackage(),
              new MapsPackage(),
              new VectorIconsPackage(),
              new SplashScreenReactPackage(),
              new RNCameraPackage(),
              new ImageResizerPackage(),
              new RNFetchBlobPackage(),
              new RNVersionNumberPackage(),
              new RNFirebaseMessagingPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}