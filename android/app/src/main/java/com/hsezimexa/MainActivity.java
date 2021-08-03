package cl.innoapsion.zimexa.hse;

import android.os.Bundle;
import com.facebook.react.ReactActivity;
import com.zoontek.rnbootsplash.RNBootSplash;

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is
   * used to schedule rendering of the component.
   */
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    // SplashScreen.show(...) has to be called after super.onCreate(...)
    // Below line is handled by '@expo/configure-splash-screen' command and it's
    // discouraged to modify it manually
    RNBootSplash.init(R.drawable.bootsplash, MainActivity.this); // <- display the generated bootsplash.xml drawable
                                                                 // over our MainActivity
    // SplashScreen.show(this, SplashScreenImageResizeMode.CONTAIN,
    // ReactRootView.class, false);
  }

  @Override
  protected String getMainComponentName() {
    return "Zimexa HSE";
  }
}
