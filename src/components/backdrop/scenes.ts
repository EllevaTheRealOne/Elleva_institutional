/**
 * Backdrops for the home sections, drawn on canvas.
 *
 * Two kinds, alternating down the page. A STILL scene is rendered once and is
 * built like a photograph: a sky of many stops, light with real falloff, ridges
 * that lose contrast with distance, then grain and a vignette over the frame. A
 * LIVE scene runs while its section is on screen and carries the subject as
 * movement instead of as an image.
 *
 * Palette is the site's own: #0C5F5A and #189890 on #050607.
 */
const TEAL = "#189890";
const TEAL_DEEP = "#0C5F5A";
const WARM = "#C08810";
const WARM_HI = "#FEED6C";

export type Ctx = CanvasRenderingContext2D;

type PhotoConfig = {
  sky: [number, string][];
  sun: string;
  sunPos: [number, number];
  warm: string;
  ridges: { base: number; amp: number; col: string; seed: number; rough: number }[];
  haze: [number, number, number][];
};

function photo(x: Ctx, w: number, h: number, cfg: PhotoConfig) {
  const g = x.createLinearGradient(0, 0, 0, h);
  cfg.sky.forEach(([p, c]) => g.addColorStop(p, c));
  x.fillStyle = g;
  x.fillRect(0, 0, w, h);

  // Four nested falloffs rather than one radial: a single gradient reads as a
  // flat disc, which is what gives a drawn light away.
  const [sxp, syp] = cfg.sunPos;
  const sx = w * sxp;
  const sy = h * syp;
  for (const [r, a] of [[0.1, 0.5], [0.26, 0.24], [0.55, 0.12], [0.95, 0.06]]) {
    const rg = x.createRadialGradient(sx, sy, 0, sx, sy, Math.max(w, h) * r);
    rg.addColorStop(0, cfg.sun.replace("ALPHA", String(a)));
    rg.addColorStop(1, cfg.sun.replace("ALPHA", "0"));
    x.fillStyle = rg;
    x.fillRect(0, 0, w, h);
  }

  const ridgeY = (px: number, rd: PhotoConfig["ridges"][0]) =>
    h * rd.base +
    Math.sin(px / (w / 2.1) + rd.seed) * rd.amp +
    Math.sin(px / (w / 5.3) + rd.seed * 1.7) * rd.amp * 0.42 +
    Math.sin(px / (w / 13.1) + rd.seed * 2.9) * rd.amp * rd.rough;

  cfg.ridges.forEach((rd, i) => {
    x.beginPath();
    x.moveTo(0, h);
    for (let px = 0; px <= w; px += 3) x.lineTo(px, ridgeY(px, rd));
    x.lineTo(w, h);
    x.closePath();
    x.fillStyle = rd.col;
    x.fill();
    // Rim light where the ridge cuts the sky.
    x.beginPath();
    for (let px = 0; px <= w; px += 3) {
      const y = ridgeY(px, rd);
      px ? x.lineTo(px, y) : x.moveTo(px, y);
    }
    x.strokeStyle = cfg.warm;
    x.globalAlpha = 0.09 + (cfg.ridges.length - i) * 0.03;
    x.lineWidth = 1.2;
    x.stroke();
    x.globalAlpha = 1;
  });

  cfg.haze.forEach(([y, hh, a]) => {
    const hg = x.createLinearGradient(0, h * y, 0, h * (y + hh));
    hg.addColorStop(0, "rgba(255,255,255,0)");
    hg.addColorStop(0.5, `rgba(206,226,222,${a})`);
    hg.addColorStop(1, "rgba(255,255,255,0)");
    x.fillStyle = hg;
    x.fillRect(0, h * y, w, h * hh);
  });

  const vg = x.createRadialGradient(w * 0.5, h * 0.5, Math.min(w, h) * 0.25, w * 0.5, h * 0.5, Math.max(w, h) * 0.78);
  vg.addColorStop(0, "rgba(0,0,0,0)");
  vg.addColorStop(1, "rgba(0,0,0,0.58)");
  x.fillStyle = vg;
  x.fillRect(0, 0, w, h);

  // Grain last, so it lands on the whole frame instead of on each element.
  const img = x.getImageData(0, 0, w, h);
  const d = img.data;
  for (let i = 0; i < d.length; i += 4) {
    const n = (Math.random() - 0.5) * 12;
    d[i] += n;
    d[i + 1] += n;
    d[i + 2] += n;
  }
  x.putImageData(img, 0, 0);
}


/**
 * A ground for the live scenes.
 *
 * They used to be drawn onto black, and the section's scrim on top left the
 * movement invisible. Each field now sits on its own lit gradient — the deep
 * teals and the gold horizon from the earlier direction — so there is
 * something for the motion to read against.
 */
function ground(x: Ctx, w: number, h: number, stops: [number, string][], glow?: { at: [number, number]; color: string }) {
  const g = x.createLinearGradient(0, 0, 0, h);
  stops.forEach(([p, c]) => g.addColorStop(p, c));
  x.fillStyle = g;
  x.fillRect(0, 0, w, h);
  if (glow) {
    const [gx, gy] = glow.at;
    const rg = x.createRadialGradient(w * gx, h * gy, 0, w * gx, h * gy, Math.max(w, h) * 0.75);
    rg.addColorStop(0, glow.color);
    rg.addColorStop(1, "rgba(0,0,0,0)");
    x.fillStyle = rg;
    x.fillRect(0, 0, w, h);
  }
}

/**
 * Eleven photographs, one per odd section, in page order.
 *
 * They are configs rather than functions because what separates a dawn from a
 * dusk is the sky, the height and warmth of the light, and how many ridges the
 * haze has to sit between — not different code. Each is tuned to the section it
 * sits under, and no two share a palette.
 */
const STILL_SCENES: PhotoConfig[] = [
  // 01 Hero · first light. The whole argument starts here, so does the day.
  { sky: [[0,"#03060B"],[.34,"#07141E"],[.62,"#11262B"],[.82,"#2A3A34"],[1,"#4C4A34"]],
    sun:"rgba(210,220,170,ALPHA)", sunPos:[.5,.9], warm:"#D8DCB0",
    ridges:[{base:.74,amp:0,col:"#16242A",seed:.6,rough:.2},{base:.83,amp:0,col:"#101B21",seed:2.2,rough:.32},
            {base:.91,amp:0,col:"#0A1116",seed:3.9,rough:.46},{base:.97,amp:0,col:"#04080B",seed:5.4,rough:.6}],
    haze:[[.70,.10,.055],[.80,.07,.035]] },
  // 03 New Category · a horizon nobody has drawn on yet.
  { sky: [[0,"#04070C"],[.36,"#0A1620"],[.66,"#173026"],[.86,"#4A4020"],[1,"#8A6A18"]],
    sun:"rgba(254,222,120,ALPHA)", sunPos:[.24,.88], warm:"#FEDE78",
    ridges:[{base:.76,amp:0,col:"#1D2620",seed:1.1,rough:.18},{base:.86,amp:0,col:"#131A17",seed:3.4,rough:.34},
            {base:.95,amp:0,col:"#080C0A",seed:5.9,rough:.52}],
    haze:[[.72,.10,.06]] },
  // 05 The Product · steel weather, close and material.
  { sky: [[0,"#060A0E"],[.42,"#0D1A22"],[.72,"#1B2E38"],[1,"#2E4450"]],
    sun:"rgba(170,205,225,ALPHA)", sunPos:[.78,.82], warm:"#AACDE1",
    ridges:[{base:.70,amp:0,col:"#1A2A33",seed:2.4,rough:.28},{base:.80,amp:0,col:"#131F27",seed:4.1,rough:.4},
            {base:.89,amp:0,col:"#0C151B",seed:5.8,rough:.52},{base:.96,amp:0,col:"#060A0E",seed:7.2,rough:.66}],
    haze:[[.66,.12,.07],[.78,.08,.045]] },
  // 07 Architecture · deep still water, structure below the surface.
  { sky: [[0,"#03070A"],[.40,"#061519"],[.70,"#0B2624"],[.90,"#123430"],[1,"#164039"]],
    sun:"rgba(24,152,144,ALPHA)", sunPos:[.5,.95], warm:"#189890",
    ridges:[{base:.78,amp:0,col:"#0C2020",seed:2.0,rough:.22},{base:.87,amp:0,col:"#08181A",seed:4.3,rough:.36},
            {base:.95,amp:0,col:"#040D10",seed:6.1,rough:.54}],
    haze:[[.74,.10,.055]] },
  // 09 Global Markets · a wide, cold plain seen from altitude.
  { sky: [[0,"#04060A"],[.38,"#0A121C"],[.68,"#16222E"],[.88,"#26323C"],[1,"#3A4248"]],
    sun:"rgba(190,205,225,ALPHA)", sunPos:[.14,.9], warm:"#BECDE1",
    ridges:[{base:.80,amp:0,col:"#161E26",seed:1.7,rough:.16},{base:.88,amp:0,col:"#0E141B",seed:3.8,rough:.3},
            {base:.96,amp:0,col:"#06090D",seed:6.4,rough:.48}],
    haze:[[.76,.09,.05],[.84,.06,.03]] },
  // 11 Business Model · late gold, the section about what it earns.
  { sky: [[0,"#050608"],[.30,"#0D1210"],[.56,"#26251A"],[.78,"#6A5013"],[1,"#B8860C"]],
    sun:"rgba(254,237,108,ALPHA)", sunPos:[.72,.92], warm:"#FEED6C",
    ridges:[{base:.72,amp:0,col:"rgba(58,50,30,.86)",seed:1.3,rough:.24},{base:.82,amp:0,col:"rgba(38,32,18,.92)",seed:3.1,rough:.36},
            {base:.90,amp:0,col:"#20190C",seed:4.9,rough:.5},{base:.97,amp:0,col:"#0C0904",seed:6.7,rough:.64}],
    haze:[[.68,.10,.065],[.79,.07,.04]] },
  // 13 Defensibility · hard night, very little given away.
  { sky: [[0,"#020407"],[.44,"#050D12"],[.76,"#0A1820"],[1,"#10222B"]],
    sun:"rgba(120,160,185,ALPHA)", sunPos:[.88,.94], warm:"#78A0B9",
    ridges:[{base:.75,amp:0,col:"#0B1720",seed:2.8,rough:.34},{base:.85,amp:0,col:"#071018",seed:4.6,rough:.46},
            {base:.94,amp:0,col:"#03070B",seed:6.9,rough:.62}],
    haze:[[.70,.08,.035]] },
  // 15 Technology · green dusk, the machine hour.
  { sky: [[0,"#030608"],[.36,"#071612"],[.66,"#0E2A1E"],[.86,"#1C3A22"],[1,"#2A4A26"]],
    sun:"rgba(150,210,150,ALPHA)", sunPos:[.36,.9], warm:"#96D296",
    ridges:[{base:.77,amp:0,col:"#10241A",seed:1.9,rough:.2},{base:.86,amp:0,col:"#0A1812",seed:4.0,rough:.34},
            {base:.95,amp:0,col:"#050D09",seed:6.3,rough:.5}],
    haze:[[.73,.10,.05]] },
  // 17 Operational Advantage · clear high air, the efficiency section.
  { sky: [[0,"#04070A"],[.40,"#0A1622"],[.70,"#17303E"],[.90,"#2C4A56"],[1,"#456068"]],
    sun:"rgba(200,225,235,ALPHA)", sunPos:[.6,.86], warm:"#C8E1EB",
    ridges:[{base:.73,amp:0,col:"#182C36",seed:2.6,rough:.26},{base:.83,amp:0,col:"#101F27",seed:4.4,rough:.38},
            {base:.92,amp:0,col:"#0A141A",seed:6.0,rough:.54},{base:.98,amp:0,col:"#04080C",seed:7.5,rough:.68}],
    haze:[[.65,.12,.075],[.79,.08,.045]] },
  // 19 Ecosystem · warm teal, many things sharing one ground.
  { sky: [[0,"#03080A"],[.38,"#08191A"],[.68,"#0F2E2A"],[.88,"#1E432F"],[1,"#3C5426"]],
    sun:"rgba(190,220,140,ALPHA)", sunPos:[.44,.92], warm:"#BEDC8C",
    ridges:[{base:.79,amp:0,col:"#122622",seed:1.5,rough:.2},{base:.88,amp:0,col:"#0B1A17",seed:3.6,rough:.34},
            {base:.96,amp:0,col:"#050E0C",seed:5.7,rough:.5}],
    haze:[[.74,.10,.055]] },
  // 21 Final CTA · the last light in the page, and the warmest.
  { sky: [[0,"#050406"],[.28,"#12100C"],[.52,"#33251A"],[.74,"#7A4A16"],[.92,"#C08810"],[1,"#FEED6C"]],
    sun:"rgba(254,237,108,ALPHA)", sunPos:[.5,.99], warm:"#FEED6C",
    ridges:[{base:.68,amp:0,col:"rgba(62,44,26,.84)",seed:1.0,rough:.22},{base:.79,amp:0,col:"rgba(42,28,16,.9)",seed:2.9,rough:.34},
            {base:.88,amp:0,col:"#241708",seed:4.7,rough:.48},{base:.96,amp:0,col:"#0E0903",seed:6.5,rough:.62}],
    haze:[[.64,.12,.08],[.78,.08,.05]] },
];

// Ridge amplitudes scale with height, so they are filled in at draw time.
const AMPS = [.030,.026,.020,.014];

/**
 * 01 Hero · the operational loop, drawn rather than animated.
 *
 * It is the page's own claim — research, decide, execute, monitor, continuously
 * — so the opening section carries it as an instrument face: a dial with its
 * ticks, the four stages seated on the ring, feeds arriving from the data side.
 * The cycle runs, because a loop that does not close is only a diagram.
 */
function heroLoop(x: Ctx, w: number, h: number, t = 0) {
  const g = x.createLinearGradient(0, 0, 0, h);
  g.addColorStop(0, "#04070B");
  g.addColorStop(0.55, "#071A1C");
  g.addColorStop(1, "#0A2624");
  x.fillStyle = g;
  x.fillRect(0, 0, w, h);

  const cx = w * 0.76;
  const cy = h * 0.5;
  const R = Math.min(w, h) * 0.34;

  // A faint field grid, so the ring sits on a plane instead of in a void.
  x.strokeStyle = "rgba(255,255,255,.035)";
  x.lineWidth = 1;
  const step = 58;
  for (let i = 0; i <= w / step; i++) { x.beginPath(); x.moveTo(i * step, 0); x.lineTo(i * step, h); x.stroke(); }
  for (let j = 0; j <= h / step; j++) { x.beginPath(); x.moveTo(0, j * step); x.lineTo(w, j * step); x.stroke(); }

  // Feeds converging on the ring from the left.
  x.strokeStyle = "rgba(24,152,144,.16)";
  for (let i = 0; i < 9; i++) {
    const y = h * (0.1 + i * 0.1);
    x.beginPath();
    x.moveTo(0, y);
    x.lineTo(cx - R - 16, cy + (y - cy) * 0.22);
    x.stroke();
    const q = ((t / 3200) + i * 0.11) % 1;
    x.globalAlpha = 0.75 * Math.sin(q * Math.PI);
    x.fillStyle = TEAL;
    x.fillRect(q * (cx - R - 16), y - 1, 26, 1.6);
    x.globalAlpha = 1;
  }

  x.strokeStyle = "rgba(255,255,255,.09)";
  for (const k of [0.42, 0.62, 0.82]) { x.beginPath(); x.arc(cx, cy, R * k, 0, 6.284); x.stroke(); }

  const ring = x.createLinearGradient(cx - R, cy - R, cx + R, cy + R);
  ring.addColorStop(0, TEAL_DEEP);
  ring.addColorStop(1, TEAL);
  const p = (t / 5600) % 1;
  const head = p * 6.284 - 1.5708;
  x.strokeStyle = "rgba(255,255,255,.10)";
  x.lineWidth = 2.2;
  x.beginPath();
  x.arc(cx, cy, R, 0, 6.284);
  x.stroke();
  x.strokeStyle = ring;
  x.lineWidth = 2.6;
  x.lineCap = "round";
  x.beginPath();
  x.arc(cx, cy, R, -1.5708, head);
  x.stroke();

  // The dial's ticks: every sixth one runs longer.
  x.strokeStyle = "rgba(255,255,255,.20)";
  x.lineWidth = 1;
  for (let i = 0; i < 72; i++) {
    const a = (i / 72) * 6.284;
    const r1 = R * 1.05;
    const r2 = R * (i % 6 ? 1.08 : 1.13);
    x.beginPath();
    x.moveTo(cx + Math.cos(a) * r1, cy + Math.sin(a) * r1);
    x.lineTo(cx + Math.cos(a) * r2, cy + Math.sin(a) * r2);
    x.stroke();
  }

  // The four stages, and their spokes to the core.
  for (let i = 0; i < 4; i++) {
    const a = (i / 4) * 6.284 - 1.5708;
    const nx = cx + Math.cos(a) * R;
    const ny = cy + Math.sin(a) * R;
    x.strokeStyle = "rgba(24,152,144,.13)";
    x.lineWidth = 1;
    x.beginPath();
    x.moveTo(cx, cy);
    x.lineTo(nx, ny);
    x.stroke();
    const reached = p >= i / 4;
    x.beginPath();
    x.arc(nx, ny, reached ? 7.5 : 4.5, 0, 6.284);
    x.fillStyle = reached ? TEAL : "rgba(255,255,255,.22)";
    x.fill();
    if (reached) {
      x.globalAlpha = 0.32 + 0.18 * Math.sin(t / 700 + i);
      x.beginPath();
      x.arc(nx, ny, 18, 0, 6.284);
      x.strokeStyle = TEAL_DEEP;
      x.lineWidth = 1.5;
      x.stroke();
      x.globalAlpha = 1;
    }
  }

  x.beginPath();
  x.arc(cx + Math.cos(head) * R, cy + Math.sin(head) * R, 5, 0, 6.284);
  x.fillStyle = "#EAF2EF";
  x.fill();

  x.beginPath();
  x.arc(cx, cy, 4.5, 0, 6.284);
  x.fillStyle = WARM_HI;
  x.fill();

  const vg = x.createRadialGradient(cx, cy, R * 0.4, w * 0.4, cy, Math.max(w, h) * 0.9);
  vg.addColorStop(0, "rgba(0,0,0,0)");
  vg.addColorStop(1, "rgba(0,0,0,.55)");
  x.fillStyle = vg;
  x.fillRect(0, 0, w, h);
}

const PHOTOS: ((x: Ctx, w: number, h: number) => void)[] = STILL_SCENES.map(
  (cfg) => (x, w, h) =>
    photo(x, w, h, {
      ...cfg,
      ridges: cfg.ridges.map((r, i) => ({ ...r, amp: h * (AMPS[i] ?? 0.016) })),
    })
);

// The hero takes the loop; the remaining odd sections take the photographs.
export const STILL: ((x: Ctx, w: number, h: number) => void)[] = [() => {}, ...PHOTOS.slice(1)];

/** The hero's dial, which runs. Kept apart from LIVE so the page order holds. */
export const HERO_LOOP = heroLoop;

/** Ten fields, one per even section, in page order. No two share a mechanic. */
export const LIVE: ((x: Ctx, w: number, h: number, t: number, dpr: number) => void)[] = [
  // 02 The Problem · a lattice that never changes beside one that breathes.
  (x, w, h, t, dpr) => {
    ground(x, w, h, [[0,"#050B12"],[.45,"#0A1C24"],[1,"#0E2B2E"]], { at:[.78,.5], color:"rgba(24,152,144,.16)" });
    const m = w * .5;
    x.fillStyle = "rgba(255,255,255,.10)";
    for (let i=0;i<24;i++) for (let j=0;j<12;j++) x.fillRect(20+i*(m-40)/23, h*.08+j*h*.075, 2*dpr, 2*dpr);
    for (let j=0;j<12;j++) {
      x.beginPath();
      for (let i=0;i<=48;i++) {
        const px=m+20+i*(w-m-40)/48, py=h*.08+j*h*.075+Math.sin(i*.26+t/620+j*.5)*8*dpr;
        i?x.lineTo(px,py):x.moveTo(px,py);
      }
      x.strokeStyle=TEAL; x.globalAlpha=.16+.14*Math.sin(t/900+j); x.lineWidth=1.3; x.stroke();
    }
    x.globalAlpha=1;
  },
  // 04 Market Opportunity · the addressable field filling in.
  (x, w, h, t, dpr) => {
    ground(x, w, h, [[0,"#04090C"],[.42,"#0A1F1E"],[.78,"#20301C"],[1,"#4A3A15"]], { at:[.62,.94], color:"rgba(254,237,108,.18)" });
    const step=26*dpr;
    for (let i=0;i<Math.ceil(w/step);i++) for (let j=0;j<Math.ceil(h/step);j++) {
      const d=Math.sin(i*.4+j*.31+t/1700), lit=(i*7+j*13)%29===0;
      x.globalAlpha=lit?.30+.42*Math.abs(d):.07+.10*Math.abs(d);
      x.fillStyle=lit?WARM_HI:"#DDE8E5";
      x.beginPath(); x.arc(i*step+step/2, j*step+step/2, (lit?2.8:1.6)*dpr, 0, 6.284); x.fill();
    }
    x.globalAlpha=1;
  },
  // 06 Investment Intelligence · signals resolving into a reading.
  (x, w, h, t, dpr) => {
    ground(x, w, h, [[0,"#04080E"],[.5,"#0A1A26"],[1,"#102C34"]], { at:[.3,.35], color:"rgba(24,152,144,.15)" });
    for (let k=0;k<5;k++) {
      x.beginPath();
      for (let i=0;i<=w;i+=6) {
        const y=h*(.22+k*.14)+Math.sin(i*.008+t/900+k)*14*dpr*Math.sin(i*.0016+k)+Math.sin(i*.03+t/420+k*2)*4*dpr;
        i?x.lineTo(i,y):x.moveTo(i,y);
      }
      x.strokeStyle=k===2?WARM_HI:TEAL; x.globalAlpha=k===2?.5:.2; x.lineWidth=k===2?1.8:1.1; x.stroke();
    }
    x.globalAlpha=1;
  },
  // 08 Investment Experience · a slow sweep reading the whole surface.
  (x, w, h, t, dpr) => {
    ground(x, w, h, [[0,"#040A10"],[.5,"#08202A"],[1,"#0C3038"]], { at:[.5,.5], color:"rgba(24,152,144,.13)" });
    const cx=w*.5, cy=h*.5, a=(t/4200)%1*6.284, R=Math.max(w,h)*.62;
    const sweep=x.createLinearGradient(cx,cy,cx+Math.cos(a)*R,cy+Math.sin(a)*R);
    sweep.addColorStop(0,"rgba(24,152,144,.30)"); sweep.addColorStop(1,"rgba(24,152,144,0)");
    x.strokeStyle=sweep; x.lineWidth=44*dpr;
    x.beginPath(); x.moveTo(cx,cy); x.lineTo(cx+Math.cos(a)*R, cy+Math.sin(a)*R); x.stroke();
    x.strokeStyle="rgba(255,255,255,.07)"; x.lineWidth=1;
    for (const r of [.18,.34,.5,.66]) { x.beginPath(); x.arc(cx,cy,R*r,0,6.284); x.stroke(); }
    for (let i=0;i<22;i++) {
      const ia=i*2.399, ir=R*(.14+((i*7)%60)/100);
      const px=cx+Math.cos(ia)*ir, py=cy+Math.sin(ia)*ir;
      const lit=Math.abs(((a-ia)%6.284+6.284)%6.284)<.6;
      x.globalAlpha=lit?.9:.22; x.fillStyle=lit?WARM_HI:"#CFE0DC";
      x.beginPath(); x.arc(px,py,(lit?3.4:2)*dpr,0,6.284); x.fill();
    }
    x.globalAlpha=1;
  },
  // 10 The New Software · instructions descending in columns.
  (x, w, h, t, dpr) => {
    ground(x, w, h, [[0,"#03080B"],[.5,"#071A1C"],[1,"#0B2A26"]], { at:[.5,.1], color:"rgba(24,152,144,.12)" });
    const cols=Math.floor(w/(34*dpr));
    for (let c=0;c<cols;c++) {
      const speed=.6+((c*13)%7)/10, len=6+((c*5)%7);
      for (let k=0;k<len;k++) {
        const q=((t/2600)*speed+c*.13+k*.045)%1;
        x.globalAlpha=(1-k/len)*.5;
        x.fillStyle=k===0?WARM_HI:TEAL;
        x.fillRect(c*34*dpr+8*dpr, q*h, 2*dpr, 14*dpr);
      }
    }
    x.globalAlpha=1;
  },
  // 12 Elleva Loop · the cycle itself, the only closed shape in the page.
  (x, w, h, t, dpr) => {
    ground(x, w, h, [[0,"#04090D"],[.5,"#0A2022"],[1,"#0E3230"]], { at:[.74,.5], color:"rgba(192,136,16,.12)" });
    const cx=w*.74, cy=h*.5, R=Math.min(w,h)*.30;
    x.strokeStyle="rgba(255,255,255,.08)"; x.lineWidth=1;
    for (const k of [.55,.78,1]) { x.beginPath(); x.arc(cx,cy,R*k,0,6.284); x.stroke(); }
    const p=(t/5600)%1, a=p*6.284-1.5708;
    const g=x.createLinearGradient(cx-R,cy-R,cx+R,cy+R); g.addColorStop(0,TEAL_DEEP); g.addColorStop(1,TEAL);
    x.strokeStyle=g; x.lineWidth=2.4*dpr; x.lineCap="round";
    x.beginPath(); x.arc(cx,cy,R,-1.5708,a); x.stroke();
    for (let i=0;i<4;i++) {
      const na=(i/4)*6.284-1.5708, nx=cx+Math.cos(na)*R, ny=cy+Math.sin(na)*R, on=p>=i/4;
      x.beginPath(); x.arc(nx,ny,(on?7:4)*dpr,0,6.284); x.fillStyle=on?TEAL:"rgba(255,255,255,.2)"; x.fill();
    }
    x.beginPath(); x.arc(cx+Math.cos(a)*R, cy+Math.sin(a)*R, 5*dpr, 0, 6.284); x.fillStyle=WARM_HI; x.fill();
  },
  // 14 Strategic Pillars · standing columns, lit one after another.
  (x, w, h, t, dpr) => {
    ground(x, w, h, [[0,"#050710"],[.5,"#0C1524"],[1,"#12223A"]], { at:[.5,.95], color:"rgba(24,152,144,.13)" });
    const n=9, gap=w/(n+1);
    for (let i=0;i<n;i++) {
      const px=gap*(i+1), lit=Math.floor((t/700)%n)===i;
      const bh=h*(.30+((i*17)%40)/120);
      const g2=x.createLinearGradient(px,h,px,h-bh);
      g2.addColorStop(0, lit?"rgba(254,237,108,.35)":"rgba(24,152,144,.20)");
      g2.addColorStop(1,"rgba(0,0,0,0)");
      x.fillStyle=g2; x.fillRect(px-9*dpr, h-bh, 18*dpr, bh);
      x.fillStyle=lit?WARM_HI:TEAL; x.globalAlpha=lit?.95:.4;
      x.fillRect(px-9*dpr, h-bh, 18*dpr, 2*dpr); x.globalAlpha=1;
    }
  },
  // 16 Modern Financial Infrastructure · capital crossing and coming out changed.
  (x, w, h, t, dpr) => {
    ground(x, w, h, [[0,"#040D10"],[.5,"#0A2426"],[1,"#0D3330"]], { at:[.5,.5], color:"rgba(192,136,16,.14)" });
    const bx=w*.42, bw=w*.16;
    x.fillStyle="rgba(12,95,90,.12)"; x.fillRect(bx,0,bw,h);
    x.strokeStyle="rgba(24,152,144,.24)"; x.lineWidth=1;
    x.beginPath(); x.moveTo(bx,0); x.lineTo(bx,h); x.moveTo(bx+bw,0); x.lineTo(bx+bw,h); x.stroke();
    for (let i=0;i<36;i++) {
      const lane=h*(.05+(i%18)*.052), q=((t/6400)+i*.028)%1, px=q*w, inside=px>bx&&px<bx+bw;
      x.fillStyle=px<bx?"rgba(255,255,255,.32)":inside?WARM_HI:TEAL;
      x.globalAlpha=inside?.95:.55;
      x.beginPath(); x.arc(px, lane+(inside?Math.sin(t/300+i)*4:0), (inside?3.6:2.3)*dpr, 0, 6.284); x.fill();
    }
    x.globalAlpha=1;
  },
  // 18 Trust · one steady centre, everything orbiting it.
  (x, w, h, t, dpr) => {
    ground(x, w, h, [[0,"#03070C"],[.5,"#07161F"],[1,"#0B2530"]], { at:[.5,.5], color:"rgba(24,152,144,.14)" });
    const cx=w*.5, cy=h*.5;
    for (let r=0;r<4;r++) {
      const R=Math.min(w,h)*(.16+r*.13);
      x.strokeStyle="rgba(255,255,255,.06)"; x.lineWidth=1;
      x.beginPath(); x.arc(cx,cy,R,0,6.284); x.stroke();
      const count=3+r;
      for (let i=0;i<count;i++) {
        const a=(t/(5200+r*1400))*(r%2?-1:1)+i*6.284/count;
        x.beginPath(); x.arc(cx+Math.cos(a)*R, cy+Math.sin(a)*R, 3*dpr, 0, 6.284);
        x.fillStyle=r===1?WARM_HI:TEAL; x.globalAlpha=.75; x.fill();
      }
    }
    x.globalAlpha=1;
    x.beginPath(); x.arc(cx,cy,6*dpr,0,6.284); x.fillStyle="#EAF2EF"; x.fill();
  },
  // 20 FAQ · venues and the orders crossing between them.
  (x, w, h, t, dpr) => {
    ground(x, w, h, [[0,"#04080F"],[.5,"#081A22"],[1,"#0B2A2C"]], { at:[.5,.4], color:"rgba(24,152,144,.14)" });
    const N: [number,number][] = [[.14,.3],[.3,.62],[.46,.24],[.58,.7],[.72,.38],[.86,.6],[.66,.14]];
    x.strokeStyle="rgba(255,255,255,.09)"; x.lineWidth=1;
    for (let i=0;i<N.length;i++) for (let j=i+1;j<N.length;j++) {
      if ((i*j)%3) continue;
      x.beginPath(); x.moveTo(N[i][0]*w,N[i][1]*h); x.lineTo(N[j][0]*w,N[j][1]*h); x.stroke();
    }
    for (let i=0;i<N.length;i++) for (let j=i+1;j<N.length;j++) {
      if ((i*j)%3) continue;
      const q=((t/2600)+(i+j)*.13)%1;
      x.globalAlpha=Math.sin(q*Math.PI); x.fillStyle=TEAL;
      x.beginPath(); x.arc(N[i][0]*w+(N[j][0]-N[i][0])*w*q, N[i][1]*h+(N[j][1]-N[i][1])*h*q, 2.6*dpr, 0, 6.284); x.fill();
    }
    x.globalAlpha=1;
    N.forEach(([nx,ny],i)=>{
      const pulse=1+Math.sin(t/850+i)*.22;
      x.beginPath(); x.arc(nx*w,ny*h,4.6*dpr*pulse,0,6.284);
      x.fillStyle=i===4?WARM_HI:"#DDE8E5"; x.globalAlpha=.85; x.fill();
      x.globalAlpha=.18; x.beginPath(); x.arc(nx*w,ny*h,15*dpr*pulse,0,6.284);
      x.strokeStyle=i===4?WARM:TEAL_DEEP; x.stroke(); x.globalAlpha=1;
    });
  },
];
