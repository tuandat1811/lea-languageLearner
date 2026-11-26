/* Falling snow on a full-screen canvas. */
(function (L) {
  var canvas = document.getElementById('snow');
  var ctx = canvas.getContext('2d');
  var flakes = [];
  var running = false;
  var raf = 0;
  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function resize() {
    var dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function makeFlake(top) {
    return {
      x: Math.random() * window.innerWidth,
      y: top ? -10 : Math.random() * window.innerHeight,
      r: 1 + Math.random() * 3,
      vy: 0.3 + Math.random() * 1.1,
      vx: -0.3 + Math.random() * 0.6,
      phase: Math.random() * Math.PI * 2,
      o: 0.4 + Math.random() * 0.6,
    };
  }

  function tick() {
    var w = window.innerWidth, h = window.innerHeight;
    ctx.clearRect(0, 0, w, h);
    for (var i = 0; i < flakes.length; i++) {
      var f = flakes[i];
      f.phase += 0.01;
      f.y += f.vy;
      f.x += f.vx + Math.sin(f.phase) * 0.3;
      if (f.y > h + 5 || f.x < -10 || f.x > w + 10) flakes[i] = makeFlake(true);
      ctx.beginPath();
      ctx.fillStyle = 'rgba(255,255,255,' + f.o + ')';
      ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
      ctx.fill();
    }
    raf = requestAnimationFrame(tick);
  }

  L.snow = {
    start: function () {
      if (running || reduced) return;
      running = true;
      canvas.style.display = 'block';
      resize();
      var count = Math.min(140, Math.round(window.innerWidth / 9));
      flakes = [];
      for (var i = 0; i < count; i++) flakes.push(makeFlake(false));
      tick();
    },
    stop: function () {
      running = false;
      cancelAnimationFrame(raf);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      canvas.style.display = 'none';
    },
  };

  window.addEventListener('resize', function () { if (running) resize(); });
})(window.LEA);
