import Phaser from "phaser";

export default class endingScene extends Phaser.Scene {
    constructor() {
        super({ key: "END" });
    }

    preload() {
        this.load.image("theEnd", "assets/img/theEnd.jpeg");
    }

    create() {
        const bg = this.add.image(
            this.cameras.main.width / 2,
            this.cameras.main.height / 2,
            "theEnd"
        );
        const scale = Math.max(
            this.cameras.main.width / bg.width,
            this.cameras.main.height / bg.height
        );
        bg.setScale(scale).setScrollFactor(0);
    }
}
