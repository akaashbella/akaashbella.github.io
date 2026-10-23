import test from 'node:test';
import assert from 'node:assert/strict';
import { populationStd, normalNoise, perturb, WEIGHTS, NOISE, heatColor } from '../src/lib/perturbation.ts';

test('population deviation uses N rather than N minus one', () => {
  assert.equal(populationStd([1, 2, 3, 4]), Math.sqrt(1.25));
  assert.equal(populationStd([7]), 0);
});
test('alpha zero exactly preserves baseline without mutation', () => {
  const baseline = [...WEIGHTS];
  assert.deepEqual(perturb(WEIGHTS, NOISE, 0), baseline);
  assert.deepEqual(WEIGHTS, baseline);
});
test('a known example agrees with independently calculated offsets', () => {
  assert.deepEqual(perturb([0, 2], [-1, 1], 0.5), [-0.5, 2.5]);
});
test('changing alpha scales fixed noise linearly', () => {
  const half = perturb(WEIGHTS, NOISE, .5);
  const full = perturb(WEIGHTS, NOISE, 1);
  full.forEach((value, i) => assert.ok(Math.abs(value - WEIGHTS[i] - 2 * (half[i] - WEIGHTS[i])) < 1e-12));
  assert.deepEqual(perturb(WEIGHTS, NOISE, 1), full);
});
test('seeded normal realization is stable and finite', () => {
  assert.deepEqual(normalNoise(36, 2047), NOISE);
  assert.notDeepEqual(normalNoise(36, 2048), NOISE);
  assert.equal(NOISE.length, WEIGHTS.length);
  assert.ok(NOISE.every(Number.isFinite));
  // A loose statistical sanity check for the Box–Muller transform.
  const many = normalNoise(100000, 1234);
  const mean = many.reduce((a,b)=>a+b,0)/many.length;
  assert.ok(Math.abs(mean) < .02);
  assert.ok(Math.abs(populationStd(many)-1) < .02);
});
test('zero variance yields no perturbation for any alpha', () => {
  assert.deepEqual(perturb([3, 3, 3], [1, -1, 2], 1), [3, 3, 3]);
});
test('invalid inputs fail explicitly', () => {
  for (const alpha of [-1, 1.01, NaN, Infinity]) assert.throws(()=>perturb(WEIGHTS,NOISE,alpha),RangeError);
  assert.throws(()=>populationStd([]),RangeError);
  assert.throws(()=>populationStd([NaN]),RangeError);
  assert.throws(()=>perturb([1],[1,2],.5),RangeError);
  assert.throws(()=>perturb([1],[NaN],.5),RangeError);
});
test('fixed color scale has neutral zero and clamps extreme values', () => {
  assert.equal(heatColor(0), 'rgb(243,240,230)');
  assert.equal(heatColor(-10), 'rgb(52,79,69)');
  assert.equal(heatColor(10), 'rgb(163,79,53)');
});
