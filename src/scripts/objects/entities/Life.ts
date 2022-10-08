export type LifeDamageOrHealType = 'extra' | 'heal'

export class Life {
  private _heart: number = 6
  private _extra: number = 0
  private _max: number = 20

  setLife(life: { heart: number, extra: number, max: number }) {
    this._heart = life.heart
    this._extra = life.extra
    this.max = life.max
  }

  get heart(): number {
    return this._heart;
  }

  set heart(value: number) {
    this._heart = value;
  }

  get extra(): number {
    return this._extra;
  }

  set extra(value: number) {
    this._extra = value;
  }

  get max(): number {
    return this._max;
  }

  set max(value: number) {
    this._max = value;
  }


  increase(heal_type: LifeDamageOrHealType, cost: number) {
    const totalOfLife = this.heart + this.extra
    if(totalOfLife<= this.max) {
      (this[heal_type] as number) += cost
    }
  }

  decrease(damage_type: LifeDamageOrHealType, cost: number) {
    (this[damage_type] as number) -= cost
  }
}
