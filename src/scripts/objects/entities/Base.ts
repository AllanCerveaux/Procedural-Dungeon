import { MainScene } from '@scenes/main.scene'
import { Life, LifeDamageOrHealType } from '@objects/entities/Life'
import { Statistics } from '@objects/entities/Statistics'
import { Control } from '@objects/entities/Control'

export type BaseOptions = {
	key: string
	name: string
	type: 'enemy' | 'player'
}

export default class Base extends Phaser.GameObjects.Sprite {
	declare scene: MainScene
	declare body: Phaser.Physics.Arcade.Body

	life: Life
	statistics: Statistics
	control: Control

	entity_type: BaseOptions['type']
	speed: number

	protected constructor(scene: Phaser.Scene, x: number, y: number, { key, name, type }: BaseOptions) {
		super(scene, x, y, key)
		this.scene.add.existing(this)
		this.scene.physics.add.existing(this)
		this.setFrame(`${this.name}_idle_anim_f0`)
		this.anims.play(`${this.name}_idle`)

		this.name = name
		this.entity_type = type

		this.life = new Life()
		this.statistics = new Statistics()
		this.control = new Control(this.scene)

		this.speed = 0

		this.body.setCollideWorldBounds(true)
		this.body.setDamping(false)
		this.body.setSize(this.body.halfWidth / 2, this.body.halfHeight / 1.5).setOffset(this.body.halfWidth, 14)
	}

	protected preUpdate(time: number, delta: number) {
		super.preUpdate(time, delta)

		this.control.update()

		if (this.control.horizontal_axe === 0 && this.control.vertical_axe === 0) {
			this.anims.play(`${this.name}_idle`, true)
			this.body.setVelocity(0, 0)
		} else this.anims.play(`${this.name}_run`, true)

		this.setFlipX(this.control.horizontal_axe < 0)

		const velocity_interop = 0.005 * delta

		const vertical_speed = Phaser.Math.Linear(
			this.body.velocity.y,
			this.body.maxSpeed * this.control.vertical_axe,
			velocity_interop,
		)
		const horizontal_speed = Phaser.Math.Linear(
			this.body.velocity.x,
			this.body.maxSpeed * this.control.horizontal_axe,
			velocity_interop,
		)

		this.body.setVelocity(horizontal_speed, vertical_speed)
	}

	knockback(force = 100) {
		if (this.body.facing === 13 || this.body.facing === 14) {
			this.body.velocity.x = this.flipX ? force : -1 * force
		} else if (this.body.facing === 11 || this.body.facing === 12) {
			this.body.velocity.y = this.body.facing === 11 ? force : -1 * force
		}
	}

	hit(cost: number, damage_type: LifeDamageOrHealType) {
		this.anims.play(`${this.name}_hit`, true)
		this.setTint(0xff0000)
		this.scene.time.addEvent({
			delay: 100,
			callback: () => {
				this.clearTint()
			},
		})

		this.life.decrease(damage_type, cost)
	}

	heal(cost: number, heal_type: LifeDamageOrHealType) {
		this.life.increase(heal_type, cost)
	}

	updateStatistic(state, name, cost) {
		if (state === 'UP') this.statistics.increase(name, cost)
		else this.statistics.decrease(name, cost)
	}

	freeze(value = false) {
		this.body.moves = value
	}
}
