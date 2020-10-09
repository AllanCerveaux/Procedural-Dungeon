export function keepNumberBetwwen(number: number, min: number, max: number) {
  return number > max ? max : number < min ? min : number
}
