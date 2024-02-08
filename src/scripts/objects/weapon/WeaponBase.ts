import { EntityBase } from '../entity/EntityBase'
import { Control } from '../base/Control'

export class WeaponBase<Entity extends EntityBase> extends Phaser.GameObjects.Sprite {
	declare body: Phaser.Physics.Arcade.Body
	_entity: Entity | undefined
	_last_facing: number = 1

	constructor({ scene, x = 0, y = 0, entity }: { scene: Phaser.Scene; entity?: Entity; x?: number; y?: number }) {
		super(scene, x, y, 'objects')
		scene.add.existing(this)
		scene.physics.add.existing(this)

		this.setFrame('weapon_baton_with_spikes')
		this.setDepth(-1)
		this.body.setSize(this.body.halfWidth)
		this._entity = entity
	}

	protected preUpdate(time: number, delta: number): void {
		super.preUpdate(time, delta)
		if (this._entity) {
			/**
			 * @todo: Find better way to calculate offset
			 */
			const entityOffsetX = this._entity.x + this.width * 0.8 * this.weaponFacing
			this.copyPosition(new Phaser.Math.Vector2(entityOffsetX, this._entity.y))
		}
	}

	private get getEntityFacing(): Phaser.Math.Vector2 {
		if (this._entity && 'control' in this._entity) {
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

	attach(entity: Entity) {
		this._entity = entity
	}

	detach() {
		if (!this._entity) return
		this._entity = undefined
	}
}
