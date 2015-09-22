
require([
    './pageNavigation'
], function (PageNavigation) {
    'use strict';
        
    $.afui.autoLaunch = false;
    $.afui.ready(function () {
        if ($.os.android) {
            $('#afui').addClass('light');   
        }
        
        PageNavigation.init();
    });
    
    function onDeviceReady() {
     
        if (navigator.splashscreen) {
            navigator.splashscreen.hide();
        }
        
        if (window.intel && intel.xdk && intel.xdk.device) {
            intel.xdk.device.hideSplashScreen();
            
        }
        intel.xdk.device.setAutoRotate(false);
        intel.xdk.device.setRotateOrientation("landscape");
        intel.xdk.device.hideStatusBar();
        $.afui.launch();
    
    }

    document.addEventListener('app.Ready', onDeviceReady, false);
});
    





