/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable import/no-mutable-exports */
function easeOutQuad(x) {
  return 1 - (1 - x) * (1 - x);
}

const controls = {};

window.addEventListener('keydown', e => {
  controls[e.key.toLowerCase()] = true;
});
window.addEventListener('keyup', e => {
  controls[e.key.toLowerCase()] = false;
});

const maxVelocity = 0.04;
let jawVelocity = 0;
let pitchVelocity = 0;
const planeSpeed = 0.01;
let turbo = 0;

const updatePlaneAxis = (x, y, z, planePosition, camera) => {
  jawVelocity *= 0.95;
  pitchVelocity *= 0.95;

  if (Math.abs(jawVelocity) > maxVelocity) {
    jawVelocity = Math.sign(jawVelocity) * maxVelocity;
  }

  if (Math.abs(pitchVelocity) > maxVelocity) {
    pitchVelocity = Math.sign(pitchVelocity) * maxVelocity;
  }

  if (controls.a) {
    jawVelocity += 0.0025;
  }

  if (controls.d) {
    jawVelocity -= 0.0025;
  }

  if (controls.w) {
    pitchVelocity -= 0.0013;
  }

  if (controls.s) {
    pitchVelocity += 0.0013;
  }

  if (controls.r) {
    jawVelocity = 0;
    pitchVelocity = 0;
    turbo = 0;
    x.set(1, 0, 0);
    y.set(0, 1, 0);
    z.set(0, 0, 1);
    planePosition.set(0, 3, 7);
  }

  x.applyAxisAngle(z, jawVelocity);
  y.applyAxisAngle(z, jawVelocity);

  y.applyAxisAngle(x, pitchVelocity);
  z.applyAxisAngle(x, pitchVelocity);

  x.normalize();
  y.normalize();
  z.normalize();

  // plane position & velocity
  if (controls.shift) {
    turbo += 0.025;
  } else {
    turbo *= 0.95;
  }
  turbo = Math.min(Math.max(turbo, 0), 1);

  const turboSpeed = easeOutQuad(turbo) * 0.02;

  camera.fov = 45 + turboSpeed * 900;
  camera.updateProjectionMatrix();

  planePosition.add(z.clone().multiplyScalar(-planeSpeed - turboSpeed));
};

export { controls, turbo, updatePlaneAxis };
