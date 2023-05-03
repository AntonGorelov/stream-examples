export function sleep(ms: number, logger: any) {
  logger.log('START SLEEP', 'sleep');

  const start = performance.now();

  while (performance.now() - start < ms) {
    // console.log(data, Math.floor(performance.now() - start));
  }
  logger.log('END SLEEP', 'sleep');
}
