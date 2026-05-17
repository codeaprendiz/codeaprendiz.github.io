(function () {
  const canvas = document.getElementById('bg-canvas');
  const ctx    = canvas.getContext('2d');
  const COLORS = ['#22d3ee', '#818cf8', '#c084fc', '#e2e8f0'];
  const LINK_DIST   = 140;
  const NODE_COUNT  = 75;

  let W, H, nodes = [], shooters = [];

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function mkNode() {
    const c = COLORS[Math.floor(Math.random() * COLORS.length)];
    return {
      x:  Math.random() * W,
      y:  Math.random() * H,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r:  Math.random() * 1.5 + 0.4,
      a:  Math.random() * 0.6 + 0.2,
      da: (Math.random() - 0.5) * 0.003,
      color: c,
    };
  }

  function mkShooter() {
    const fromTop = Math.random() > 0.5;
    return {
      x:  Math.random() * W,
      y:  fromTop ? 0 : Math.random() * H * 0.4,
      vx: (Math.random() * 4 + 3) * (Math.random() > 0.5 ? 1 : -1),
      vy: Math.random() * 3 + 2,
      len: Math.random() * 120 + 60,
      a:  1,
      dead: false,
    };
  }

  function init() {
    resize();
    nodes = Array.from({ length: NODE_COUNT }, mkNode);
  }

  // Spawn a shooting star every 3–6 s
  setInterval(() => { shooters.push(mkShooter()); }, 3000 + Math.random() * 3000);

  function draw() {
    ctx.clearRect(0, 0, W, H);

    // ── Connections ──
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const d  = Math.sqrt(dx * dx + dy * dy);
        if (d < LINK_DIST) {
          const alpha = (1 - d / LINK_DIST) * 0.18;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.strokeStyle = `rgba(129,140,248,${alpha})`;
          ctx.lineWidth   = 0.6;
          ctx.stroke();
        }
      }
    }

    // ── Nodes ──
    nodes.forEach(n => {
      n.x += n.vx; n.y += n.vy;
      n.a += n.da;
      if (n.a <= 0.1 || n.a >= 0.9) n.da *= -1;
      if (n.x < 0) n.x = W; if (n.x > W) n.x = 0;
      if (n.y < 0) n.y = H; if (n.y > H) n.y = 0;

      ctx.save();
      ctx.globalAlpha = n.a;
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fillStyle = n.color;
      ctx.fill();

      // glow on larger nodes
      if (n.r > 1.2) {
        const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 5);
        g.addColorStop(0, n.color + '55');
        g.addColorStop(1, 'transparent');
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r * 5, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.globalAlpha = n.a * 0.4;
        ctx.fill();
      }
      ctx.restore();
    });

    // ── Shooting stars ──
    shooters = shooters.filter(s => !s.dead);
    shooters.forEach(s => {
      s.x += s.vx; s.y += s.vy; s.a -= 0.022;
      if (s.a <= 0 || s.x < -200 || s.x > W + 200 || s.y > H + 50) { s.dead = true; return; }

      const tail_x = s.x - s.vx * (s.len / Math.hypot(s.vx, s.vy));
      const tail_y = s.y - s.vy * (s.len / Math.hypot(s.vx, s.vy));

      const grad = ctx.createLinearGradient(tail_x, tail_y, s.x, s.y);
      grad.addColorStop(0, 'transparent');
      grad.addColorStop(1, `rgba(255,255,255,${s.a})`);

      ctx.save();
      ctx.globalAlpha = s.a;
      ctx.beginPath();
      ctx.moveTo(tail_x, tail_y);
      ctx.lineTo(s.x, s.y);
      ctx.strokeStyle = grad;
      ctx.lineWidth   = 1.5;
      ctx.lineCap     = 'round';
      ctx.stroke();

      // bright tip
      ctx.beginPath();
      ctx.arc(s.x, s.y, 1.5, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.globalAlpha = s.a;
      ctx.fill();
      ctx.restore();
    });

    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', resize, { passive: true });
  init();
  draw();
})();
