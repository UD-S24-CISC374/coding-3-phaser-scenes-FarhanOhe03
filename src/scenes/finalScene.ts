import Phaser from "phaser";

export default class FirstScene extends Phaser.Scene {
    private platform?: Phaser.Physics.Arcade.StaticGroup;
    private player?: Phaser.Physics.Arcade.Sprite;
    private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
    private playerStartPosition?: { x: number; y: number };

    constructor() {
        super({ key: "FINAL" });
    }

    preload() {
        this.load.image("favicon", "assets/img/favicon.jpeg");
    }

    init(data: any) {
        // Assuming data.playerX and data.playerY are passed from MainScene
        this.playerStartPosition = { x: data.playerX, y: data.playerY };
    }

    create() {
        const bg = this.add.image(
            this.cameras.main.width / 2,
            this.cameras.main.height / 2,
            "favicon"
        );
        const scale = Math.max(
            this.cameras.main.width / bg.width,
            this.cameras.main.height / bg.height
        );
        bg.setScale(scale).setScrollFactor(0);

        // Recreate the platform
        this.platform = this.physics.add.staticGroup();

        const groundHeight = 65;
        const groundY = this.cameras.main.height - groundHeight / 5;

        const screenWidth = this.cameras.main.width;
        const ground = this.platform.create(screenWidth / 2, groundY, "ground");
        ground.setScale(screenWidth / ground.width, 1); // Scale horizontally to fit screen width
        ground.refreshBody(); // Update the physics body to match the new scale

        //Create the sprite
        this.player = this.physics.add.sprite(100, groundY - 150, "dude"); // Ensure the player starts above the platform
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);

        // Enable collision between the player and the platform
        this.physics.add.collider(this.player, this.platform);

        //trying to add the portal
        const portal = this.physics.add.sprite(780, groundY - 400, "portal");
        // If you want to do something when the player touches the portal, add a collider and an overlap event
        this.physics.add.collider(portal, this.platform); // To ensure the portal sits on the platform if needed
        this.physics.add.overlap(this.player, portal, () => {
            // Using an arrow function without parameters
            const portalMessage = "enter meeeeeeeeeeeee";
            this.add
                .text(this.cameras.main.width / 2, 250, portalMessage, {
                    color: "black",
                    fontSize: "30px",
                    fontFamily: "Serif",
                })
                .setOrigin(0.5, 0);

            console.log("Player has entered the portal!");
            // Correctly reference 'this' to start the new scene
            this.scene.start("SECOND"); // Switch scenes without passing specific data
        });

        //trying to add animation

        this.cursors = this.input.keyboard?.createCursorKeys();

        this.anims.create({
            key: "left",
            frames: this.anims.generateFrameNumbers("dude", {
                start: 0,
                end: 3,
            }),
            frameRate: 10,
            repeat: -1,
        });

        this.anims.create({
            key: "turn",
            frames: [{ key: "dude", frame: 4 }],
            frameRate: 20,
        });

        this.anims.create({
            key: "right",
            frames: this.anims.generateFrameNumbers("dude", {
                start: 5,
                end: 8,
            }),
            frameRate: 10,
            repeat: -1,
        });

        // Displaying a message
        const message =
            "Ah first day of a super hero, city saved.. until next time guys from: citySaverBoyMan";
        this.add
            .text(this.cameras.main.width / 2, 250, message, {
                color: "white",
                fontSize: "17px",
                fontFamily: "Serif",
            })
            .setOrigin(0.5, 0); // Center the text horizontally

        //this.scene.start("firstScene");
    }

    update() {
        if (!this.cursors) {
            return;
        }
        if (this.cursors.left.isDown) {
            this.player?.setVelocityX(-160);
            this.player?.anims.play("left", true);
        } else if (this.cursors.right.isDown) {
            this.player?.setVelocityX(160);
            this.player?.anims.play("right", true);
        } else {
            this.player?.setVelocityX(0);
            this.player?.anims.play("turn");
        }
        if (this.cursors.up.isDown && this.player?.body?.touching.down) {
            this.player.setVelocityY(-330);
        }
    }
}
