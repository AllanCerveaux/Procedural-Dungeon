export default class LoadAnims
{
  constructor(ctx) {
    this.ctx = ctx;
    this.frameName = [];
    this.anims = [{name: 'idle', frame: 4, repeat: -1}, {name: 'run', frame: 4, repeat: -1}, {name: 'hit', frame: 1,repeat: 0}];
    this.heroes = ['knight_m','knight_f','elf_m','elf_f','wizzard_m','wizzard_f','lizard_m','lizard_f'];
    this.ennemies = ['big_demon', 'big_zombie', 'chort', 'goblin', 'ice_zombie', 'imp', 'masked_orc', 'muddy', 'necromancer', 'ogre', 'orc_shaman', 'orc_warrior', 'skelet', 'swampy', 'tiny_zombie', 'wogol', 'zombie'];
  }

  init() {
    console.log('anims loaded');
    this.initializeAnimation();
  }

  initializeAnimation() {
    this.anims.forEach(anim =>{
      this.heroes.forEach(hero => {
        this.createAnims(hero, anim);
      });
      this.ennemies.forEach(ennemy => {
        if(anim.name !== 'hit'){
          this.createAnims(ennemy, anim);
          return
        }
      });
    });
  }

  createAnims(char, anim) {
    this.generateFrame(char, anim);
    this.ctx.anims.create({
      key: `${char}_${anim.name}`,
      frames: this.frameName,
      frameRate: 8,
      repeat: anim.repeat
    });
    this.frameName = [];
  }

  generateFrame(char, anim){
    for (let i = 0; i < anim.frame; i++){
      this.frameName.push({ key: 'characters', frame: `${char}_${anim.name}_anim_f${i}` });
    }
  }
}
