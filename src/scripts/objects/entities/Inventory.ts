import {InventoryDefault, Item} from "@objects/player/type";
import {GlobalEmitter} from "@utils/events";
import {GLOBAL_EMITTER} from "@types";
import {ITEM_TYPE} from "@constants";

export class Inventory implements InventoryDefault {
  private _activeItem: Item | null;
  private _consumable: Item | null;
  private _trinket: Item | null;
  private _items: {
    item: Item
    quantity: number
  }[];
  private _size: 10 | number;
  
  constructor() {
    this.items = []
    this.size = 10
    this.activeItem = null
    this.consumable = null
    this.trinket = null
  }

  get activeItem(): Item | null {
    return this._activeItem;
  }

  set activeItem(value: Item | null) {
    this._activeItem = value;
  }
  
  get consumable(): Item | null {
    return this._consumable;
  }

  set consumable(value: Item | null) {
    this._consumable = value;
  }

  get items(): {
    item: Item
    quantity: number
  }[] {
    return this._items;
  }

  set items(value: {
    item: Item
    quantity: number
  }[]) {
    this._items = value;
  }

  get size(): 10 | number {
    return this._size;
  }

  set size(value: 10 | number) {
    this._size = value;
  }

  get trinket(): Item | null {
    return this._trinket;
  }

  set trinket(value: Item | null) {
    this._trinket = value;
  }
  
  haveSpace() {
    return this.items.length <= this.size
  }
  
  findItem(item_name: string) {
    return this.items.find(({ item: { name} }) => name === item_name)
  }

  add(item: Item, quantity: number) {
    switch (item.type) {
      case ITEM_TYPE.ACTIVE:
        if(this.activeItem) this.drop(this.activeItem)
        this.activeItem = item
        break
      case ITEM_TYPE.CONSUMABLE:
        if(this.consumable) this.drop(this.consumable)
        this.consumable = item
        break
      case ITEM_TYPE.TRINKET:
        if(this.trinket) this.drop(this.trinket, quantity)
        this.trinket = item
        break
      case ITEM_TYPE.RESOURCE:
        this.addItem(item, quantity)
        break
      default:
        break
    }
  }

  remove(item: Item, quantity: number, isDropped: boolean) {
    switch (item.type) {
      case ITEM_TYPE.CONSUMABLE:
        if(this.consumable) this.drop(this.consumable, quantity)
        this.consumable = null
        break
      case ITEM_TYPE.TRINKET:
        if(this.trinket) this.drop(this.trinket, quantity)
        this.trinket = null
        break
      case ITEM_TYPE.RESOURCE:
        this.removeItem(item, quantity, isDropped)
        break
      default:
        break
    }
  }
  
  private addItem(item: Item, quantity: number) {
    const existingItem = this.findItem(item.name)
    if(this.haveSpace() && existingItem) {
      existingItem.quantity += quantity
    } else {
      this.items.push({item, quantity: 1})
    }
  }
  
  private removeItem(item: Item, quantity: number, isDropped: boolean) {
    const foundItem = this.findItem(item.name)
    if(foundItem && foundItem.quantity > 1) {
      foundItem.quantity -= quantity
    } else {
      this.items = this.items.filter(i => i.item.name !== item.name)
    }
    
    if(isDropped) this.drop(item, quantity)
  }
  
  private drop(item: Item, quantity?: number) {
    GlobalEmitter.emit(GLOBAL_EMITTER.PLAYER_ITEM_DROP, { item, quantity })
  }
}
