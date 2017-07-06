(function () {
  'use strict';

  function vrAnimate() {
    var cords = display.getPose();
    gameInstance.SendMessage('WebVRCamera', 'TiltX', cords.orientation[0]);
    gameInstance.SendMessage('WebVRCamera', 'TiltY', cords.orientation[1]);
    gameInstance.SendMessage('WebVRCamera', 'TiltZ', cords.orientation[2]);
    gameInstance.SendMessage('WebVRCamera', 'TiltW', cords.orientation[3]);

    requestAnimationFrame(vrAnimate);
  }

  function initVR(displays) {
    if (displays.length > 0) {
      display = displays[0];
      WebVRConfig.DIRTY_SUBMIT_FRAME_BINDINGS = true;
      vrAnimate();
      window.addEventListener('resize', handleResize, true);
      handleResize();
    }
  }

  function handleResize() {
    if (!canvas) {
      canvas = document.getElementsByTagName('canvas')[0];
    }
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function handleUnity(msg) {
    if (msg.detail === "Ready") {
      canvas = document.getElementById('canvas');
      loader = document.getElementById('loader');

      gameInstance.SendMessage('WebVRCamera', 'Begin');

      loader.style.display = 'none';

      navigator.getVRDisplays().then(initVR);
    }
  }

  var display = null,
    canvas = null,
    loader = null;
  document.addEventListener('Unity', handleUnity);
})();
