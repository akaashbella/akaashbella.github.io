/** Standalone illustration; does not import or execute research project code. */
export const WEIGHTS = Object.freeze([
  -0.8, -0.4, 0.1, 0.5, 0.9, 0.3,
  -0.6, -0.2, 0.4, 0.8, 0.6, -0.1,
  0.2, 0.7, 1.0, 0.3, -0.3, -0.7,
  0.5, 0.9, 0.2, -0.5, -0.9, -0.4,
  0.1, 0.4, -0.3, -0.8, -0.2, 0.6,
  -0.4, 0.0, 0.5, -0.1, 0.7, 1.1,
]);
export function populationStd(values: readonly number[]): number {
  if (!values.length || values.some(v => !Number.isFinite(v))) throw new RangeError('Expected finite, non-empty tensor');
  const mean = values.reduce((sum, v) => sum + v, 0) / values.length;
  return Math.sqrt(values.reduce((sum, v) => sum + (v - mean) ** 2, 0) / values.length);
}
/** Seeded PRNG + Box–Muller transform. One fixed realization across alpha values. */
export function normalNoise(length: number, seed = 2047): number[] {
  if (!Number.isInteger(length) || length < 0) throw new RangeError('Invalid noise length');
  let state = seed >>> 0;
  const uniform = () => { state = (Math.imul(1664525, state) + 1013904223) >>> 0; return (state + 0.5) / 4294967296; };
  return Array.from({ length }, () => Math.sqrt(-2 * Math.log(uniform())) * Math.cos(2 * Math.PI * uniform()));
}
export const NOISE = Object.freeze(normalNoise(WEIGHTS.length));
export function perturb(weights: readonly number[], noise: readonly number[], alpha: number): number[] {
  if (!Number.isFinite(alpha) || alpha < 0 || alpha > 1) throw new RangeError('Alpha must lie in [0, 1]');
  if (weights.length !== noise.length || noise.some(v => !Number.isFinite(v))) throw new RangeError('Invalid noise tensor');
  const std = populationStd(weights);
  return weights.map((weight, i) => weight + alpha * std * noise[i]);
}
/** Fixed scale prevents apparent normalization changes as alpha varies. */
export function heatColor(value: number, limit = 2.2): string {
  const amount = Math.min(1, Math.abs(value) / limit);
  const neutral = [243, 240, 230];
  const endpoint = value < 0 ? [52, 79, 69] : [163, 79, 53];
  return `rgb(${neutral.map((channel, i) => Math.round(channel + amount * (endpoint[i] - channel))).join(',')})`;
}
