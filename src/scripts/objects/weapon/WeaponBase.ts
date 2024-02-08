import { EntityBase } from '../entity/EntityBase'
import { Control } from '../base/Control'
import object from '@assets/sprites/objects/objects.json' // for debug remove when finsh

export class WeaponBase<Entity extends EntityBase> extends Phaser.GameObjects.Sprite {
	declare body: Phaser.Physics.Arcade.Body

	private _entity: Entity | undefined
	private _last_facing: number = 1
	private _just_drop: boolean = false

	private _on_ground_tween: Phaser.Tweens.Tween

	constructor({ scene, x = 0, y = 0, entity }: { scene: Phaser.Scene; entity?: Entity; x?: number; y?: number }) {
		super(scene, x, y, 'objects')
		scene.add.existing(this)
		scene.physics.add.existing(this)
		const weapons = Object.keys(object.frames).filter((frame) => frame.includes('weapon')) // for debug remove when finsh

		this.setFrame(Phaser.Utils.Array.Shuffle(weapons).shift() as string)
		this.setDepth(-1)
		this.body.setSize(this.body.halfWidth)
		this._entity = entity

		this.setOnGroundAnimation()
	}

	protected preUpdate(time: number, delta: number): void {
		super.preUpdate(time, delta)
		if (!this._entity && this._on_ground_tween.isPaused()) {
			this._on_ground_tween.play()
		}
		if (this._entity && !this._just_drop) {
			/**
			 * @todo: Find better way to calculate offset
			 */
			const entityOffsetX = this._entity.x + this.width * 0.8 * this.weaponFacing
			this.copyPosition(new Phaser.Math.Vector2(entityOffsetX, this._entity.y))
		}

		if (this._entity && this._just_drop && Phaser.Math.Distance.BetweenPoints(this, this._entity) >= 15) {
			this._just_drop = false
			this.body.setEnable(true)
			this.setOnGroundAnimation()
			this._entity = undefined
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
		this._on_ground_tween.stop()
		this._entity = entity
	}

	detach() {
		if (!this._entity) return

		this._just_drop = true

		this.body.setEnable(false)
	}

	/**
	 * IDK what better way to stop and restart tweens,
	 * But it's work.
	 */
	setOnGroundAnimation() {
		this._on_ground_tween = this.scene.tweens.add({
			targets: this,
			y: {
				from: this.y,
				to: this.y + 5,
			},
			ease: 'Power1',
			duration: 500,
			yoyo: true,
			repeat: -1,
			stop: !this._entity,
			isPendingRemove: false,
		})
	}
}
