/**
 * 封面互动影像 - 抽象动画版
 */

let particles = [];
let numParticles = 50;

function setup() {
  // 使用固定尺寸，避免本地文件系统的问题
  let cnv = createCanvas(800, 600);
  cnv.parent("stage");

  pixelDensity(1);
  frameRate(60);

  console.log("Canvas 创建成功！尺寸:", width, "x", height);

  // 创建粒子
  for (let i = 0; i < numParticles; i++) {
    particles.push(new Particle());
  }
}

function draw() {
  background(250);

  // 检测是触摸设备还是鼠标设备
  let pointerX = mouseX;
  if (touchX !== undefined && touchX > 0) {
    pointerX = touchX;
  }

  let distFromCenter = abs(width / 2 - pointerX);
  let intensity = map(distFromCenter, 0, width / 2, 0, 1);

  // 更新和绘制粒子
  for (let i = 0; i < particles.length; i++) {
    particles[i].update(intensity);
    particles[i].display();
  }

  // 连线
  stroke(200, 150);
  strokeWeight(0.5);
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      let d = dist(particles[i].pos.x, particles[i].pos.y, particles[j].pos.x, particles[j].pos.y);
      if (d < 80) {
        line(particles[i].pos.x, particles[i].pos.y, particles[j].pos.x, particles[j].pos.y);
      }
    }
  }

  // 中心圆
  noStroke();
  let centerSize = map(sin(frameCount * 0.02), -1, 1, 60, 100) + intensity * 50;
  fill(50, 100, 200, 180);
  ellipse(width / 2, height / 2, centerSize, centerSize);

  // 文字
  fill(80);
  textAlign(CENTER, CENTER);
  textSize(32);
  text("HARRY6", width / 2, height / 2 - 120);
  textSize(13);
  fill(150);
  text("Slide to interact", width / 2, height / 2 + 120);
}

// 粒子类
class Particle {
  constructor() {
    this.pos = createVector(random(width), random(height));
    this.vel = createVector(random(-1, 1), random(-1, 1));
    this.size = random(3, 8);
    this.color = color(50 + random(50), 100 + random(100), 200 - random(50), 180);
  }

  update(intensity) {
    this.pos.add(this.vel);

    // 边界反弹
    if (this.pos.x < 0 || this.pos.x > width) this.vel.x *= -1;
    if (this.pos.y < 0 || this.pos.y > height) this.vel.y *= -1;

    // 鼠标互动
    let d = dist(mouseX, mouseY, this.pos.x, this.pos.y);
    if (d < 100) {
      let force = p5.Vector.sub(this.pos, createVector(mouseX, mouseY));
      force.setMag(0.5);
      this.vel.add(force);
    }

    // 速度限制
    this.vel.limit(3 + intensity * 2);
  }

  display() {
    noStroke();
    fill(this.color);
    ellipse(this.pos.x, this.pos.y, this.size, this.size);
  }
}

// 窗口大小改变时重新调整
function windowResized() {
  resizeCanvas(windowWidth * 0.8, windowHeight * 0.7);

  // 重新创建粒子
  particles = [];
  for (let i = 0; i < numParticles; i++) {
    particles.push(new Particle());
  }
}

// 触摸设备：只有在触摸 canvas 时才阻止默认行为
function touchStarted() {
  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    return false;
  }
  return true;
}
