export function isLighthouse(): boolean {
  if (typeof navigator === 'undefined') return false;
  return /lighthouse/i.test(navigator.userAgent);
}
