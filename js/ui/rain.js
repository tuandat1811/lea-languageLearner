/* Gentle rain on a full-screen canvas (optional ambience, off by default). */
(function (L) {
  var canvas = document.getElementById('rain');
  var ctx = canvas.getContext('2d');
  var drops = [];
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

  function makeDrop(top) {
    return {
      x: Math.random() * (window.innerWidth + 60),
      y: top ? -20 - Math.random() * 40 : Math.random() * window.innerHeight,
      len: 10 + Math.random() * 14,
      vy: 6 + Math.random() * 5,
      o: 0.15 + Math.random() * 0.3,
    };
  }

  function tick() {
    var w = window.innerWidth, h = window.innerHeight;
    var color = getComputedStyle(document.documentElement).getPropertyValue('--rain').trim() || '120,110,150';
    ctx.clearRect(0, 0, w, h);
    ctx.lineWidth = 1.2;
    ctx.lineCap = 'round';
    for (var i = 0; i < drops.length; i++) {
      var d = drops[i];
      d.y += d.vy;
      d.x -= d.vy * 0.18;
      if (d.y > h + 20) drops[i] = d = makeDrop(true);
      ctx.strokeStyle = 'rgba(' + color + ',' + d.o + ')';
      ctx.beginPath();
      ctx.moveTo(d.x, d.y);
      ctx.lineTo(d.x + d.len * 0.18, d.y - d.len);
      ctx.stroke();
    }
    raf = requestAnimationFrame(tick);
  }

  L.rain = {
    start: function () {
      if (running || reduced) return;
      running = true;
      canvas.style.display = 'block';
      resize();
      var count = Math.min(120, Math.round(window.innerWidth / 12));
      drops = [];
      for (var i = 0; i < count; i++) drops.push(makeDrop(false));
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
