import { EntityBase } from '../entity/EntityBase'
import { Control } from './Control'

export class Weapon<Entity extends EntityBase> extends Phaser.GameObjects.Sprite {
	_entity: Entity
	_last_facing: number = 1
	constructor({ scene, entity, texture }: { scene: Phaser.Scene; entity: Entity; texture: string }) {
		super(scene, 0, 0, texture)
		scene.add.existing(this)

		this.setFrame('weapon_baton_with_spikes')

		this._entity = entity
	}

	protected preUpdate(time: number, delta: number): void {
		super.preUpdate(time, delta)

		this.copyPosition(new Phaser.Math.Vector2(this._entity.x + this.width * 0.75 * this.weaponFacing, this._entity.y))
	}

	private get getEntityFacing(): Phaser.Math.Vector2 {
		if ('control' in this._entity) {
			return (this._entity.control as Control).axe
		}
		return new Phaser.Math.Vector2(0, 0)
	}

	private get weaponFacing() {
		if (this.getEntityFacing.x !== 0) {
			this.setFlipX(this.getEntityFacing.x < 0)
			this._last_facing = this.getEntityFacing.x
		}
		return this._last_facing
	}
}
