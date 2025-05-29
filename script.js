let topZ = 10; // must start at a reasonable z-index or else wacky behavior

//this makes all windows draggable
document.querySelectorAll('.window').forEach(windowEl => {
  const header = windowEl.querySelector('.title-bar');
  let offsetX = 0, offsetY = 0, isDown = false;

  header.addEventListener('mousedown', (e) => {
    isDown = true;
    //window to front upon interaction
    topZ++;
    windowEl.style.zIndex = topZ;
    //calc offset
    offsetX = e.clientX - windowEl.offsetLeft;
    offsetY = e.clientY - windowEl.offsetTop;
    document.body.style.userSelect = 'none'; //prevent text selection
    header.style.cursor = 'grabbing';
  });

  document.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    windowEl.style.position = 'absolute';
    windowEl.style.left = (e.clientX - offsetX) + 'px';
    windowEl.style.top = (e.clientY - offsetY) + 'px';
  });

  document.addEventListener('mouseup', () => {
    isDown = false;
    document.body.style.userSelect = '';
    header.style.cursor = 'grab';
  });
});

function minimize(btn) {
    var windowEl = btn.closest('.window');
    var body = windowEl.querySelector('.window-body');
    if (body){
        body.style.display = 'none';
        windowEl.style.height = '';
        windowEl.style.resize = 'none';
    }
}

function maximize(btn) {
    var windowEl = btn.closest('.window');
    var body = windowEl.querySelector('.window-body');
    if (body){
        body.style.display = 'block';
        windowEl.style.height = '';
        windowEl.style.resize = 'both';
    }
}

function closeme(btn) {
    var windowEl = btn.closest('.window');
    if (windowEl) windowEl.style.display = 'none';
}

function openme(id) {
    const el = document.getElementById(id);
    if (!el) return;
    if (el.style.display === 'none' || el.style.display === '') {
      el.style.display = 'block';
      el.style.zIndex = ++topZ;
      // restores body if minimized
      const body = el.querySelector('.window-body');
      if (body) body.style.display = 'block';
    } else {
      el.style.display = 'none';
    }
  }
  