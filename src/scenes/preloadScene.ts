import Phaser from "phaser";

export default class PreloadScene extends Phaser.Scene {
    constructor() {
        super({ key: "PreloadScene" });
    }

    preload() {
        this.load.image("firstImage", "assets/img/firstImage.jpeg");
        this.load.image("secondImage", "assets/img/secondImage.jpeg");
        this.load.image("midImage", "assets/img/midImage.jpeg");
        this.load.image("favicon", "assets/img/favicon.jpeg");
        this.load.image("ground", "assets/img/platform.png");
        this.load.image("theEnd", "assets/img/theEnd.jpeg");
        this.load.spritesheet("portal", "assets/portal.jpeg", {
            frameWidth: 32,
            frameHeight: 48,
        });
        this.load.spritesheet("dude", "assets/dude.png", {
            frameWidth: 32,
            frameHeight: 48,
        });
    }

    create() {
        this.scene.start("MainScene");
    }
}
