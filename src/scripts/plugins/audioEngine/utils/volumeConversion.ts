/**
 * Volume is expressed in percentage
 */
export function dbToVolume(db: number) {
  return Math.pow(10, 0.05 * db)
}

/**
 * Volume is expressed in percentage
 */
export function volumeToDb(volume: number) {
  return 20 * Math.log10(volume)
}
