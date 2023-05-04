export function sleep(ms: number, logger: any) {
  logger.log('[SLEEP] start sleep', 'default');

  const start = performance.now();

  while (performance.now() - start < ms) {
    // console.log(data, Math.floor(performance.now() - start));
  }
  logger.log('[SLEEP] end sleep', 'default');
}
