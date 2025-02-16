export class Pattern {
  getPatterPraci(number: string) {
    return number.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, " ")
  }
}
