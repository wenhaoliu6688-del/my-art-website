/**
 * Project: Digital Strata (p5.js version)
 * Converted from Processing
 */

let img;
let smoothPresence = 0.0;

function preload() {
  img = loadImage("LWH_8128.JPG");
}

function setup() {
  createCanvas(500, 750);
  pixelDensity(1);
  frameRate(60);

  if (img) {
    img.resize(width, height);
    image(img, 0, 0);
  }
}

function draw() {
  let distFromCenter = abs(width / 2 - mouseX);
  let distFactor = map(distFromCenter, 0, width / 2, 1.0, 0.0);
  smoothPresence = lerp(smoothPresence, distFactor, 0.03);

  let glitchIntensity = 1.0 - smoothPresence;

  // 底图控制（冻结效果）
  if (smoothPresence > 0.05 && img) {
    tint(255, smoothPresence * 255);
    image(img, 0, 0);
    noTint();
  }

  // 横向拉伸
  let count = int(map(glitchIntensity, 0, 1, 0, 40));

  for (let i = 0; i < count; i++) {
    let y = int(random(height));
    let h = int(random(2, 15));
    let x = int(width / 2 + random(-50, 50));
    let w = int(random(1, 3));

    copy(img, x, y, w, h, 0, y, width, h);
  }

  // 局部修复
  if (smoothPresence > 0.2) {
    let restoreCount = int(map(smoothPresence, 0, 1, 0, 200));
    for (let i = 0; i < restoreCount; i++) {
      let x = int(random(width));
      let y = int(random(height));
      let w = int(random(20, 100));
      let h = int(random(2, 5));
      copy(img, x, y, w, h, x, y, w, h);
    }
  }

  if (mouseIsPressed) {
    fill(0);
    rect(0, 0, 200, 30);
    fill(255);
    text("Stability Mode", 20, 20);
  }
}
