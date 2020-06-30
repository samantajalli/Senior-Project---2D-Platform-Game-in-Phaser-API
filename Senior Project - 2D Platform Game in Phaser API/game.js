
var coinCount = 0;

var mainState = {
    preload: function() {
        game.load.image('player', 'assets/player.png');
        game.load.image('wall', 'assets/wall.png');
        game.load.image('coin', 'assets/coin.png');
        game.load.image('enemy', 'assets/enemy.png');
        game.load.image('orb', 'assets/MagicOrb.png');
    },
    
    create: function() {
        game.stage.backgroundColor = '#8B4513';
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.world.enableBody = true;
        game.world.setBounds(0, 0, 2000, 2000);
        
        // store arrow key pressed
        this.cursor = game.input.keyboard.createCursorKeys();
        // Create the player in the middle of the game
        this.player = game.add.sprite(70, 100, 'player');
        // Add gravity to make it fall
        this.player.body.gravity.y = 600;
        
        // Create 3 groups that will contain our objects
        this.walls = game.add.group();
        this.coins = game.add.group();
        this.enemies = game.add.group();
        this.orbs = game.add.group();
        
        
        this.levelAccumulator = 1; // This is a marker to the level number
                                   // At end of each level we increment with method
        
        // Pointer to each level. Design the level. x = wall, o = coin, ! = lava.
       this.level = { "level1": [
       'xxxxxxxxxxxxxxxxxxxxxx',
       '!                    x',
       '!                 o  x',
       '!         o          x',
       '!                    x',
       '!    o  !     x      x                                                  x',
       'xxxxxxxxxxxxxxxx   !!x                                                  x',
       '                                       xxxxxxx                          x',
       '                                                                        x',
       '                                x                 x                     x',
       '                                                                        x',
       '                  xx                x                 x                 x',
       '                                                                        x',
       '            xx        xx    xxxxxx                                      x',
       '   xx                                                                   x',
       '                                                             xx         x',
       '                                                                        x',
       '                                                                        x',
       '                                                                        x',
       ' !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!     O    x',
       '                                                                        x',
       '                                                                !!!!!!! x', 
       ],
                
                "level2" : [
         '             ',
         '             ',
         '             ',
         '             ', 
         '             ',
         '             ',
         'xxxxxxxxxxxxx',
                    
         ],};
        
        //var currLevel = this.level.level1;
        var currLevel;
        if (this.levelAccumulator == 1)
            currLevel = this.level.level1;
        else if (this.levelAccumulator == 2)
            currLevel = this.level.level2;
        
        
       
        
        // Create the level by going through the array
        for (var i = 0; i < currLevel.length; i++) {
            for (var j = 0; j < currLevel[i].length; j++) {
            
            // Create a wall and add it to the 'walls' group
            if (currLevel[i][j] == 'x') {
                var wall = game.add.sprite(30+20*j, 30+20*i, 'wall');
                this.walls.add(wall);
                wall.body.immovable = true; // so walls don't fall when player walks on them
            }
            
            // Create a coin and add it to the 'coins' group
            else if (currLevel[i][j] == 'o') {
                var coin = game.add.sprite(30+20*j, 30+20*i, 'coin');
                this.coins.add(coin);
            }
            
            // Create a enemy and add it to the 'enemies' group
            else if (currLevel[i][j] == '!') {
                var enemy = game.add.sprite(30+20*j, 30+20*i, 'enemy');
                this.enemies.add(enemy);
            }
                
            else if (currLevel[i][j] == 'O') {
                var orb = game.add.sprite(30+20*j, 20+20*i, 'orb');
                this.orbs.add(orb);
                orb.body.immovable = true; // so orb can be touched to complete level
            }
            }
        }
    },
    
    update: function() {
        // Move the player when an arrow key is pressed
        if (this.cursor.left.isDown) {
            this.player.body.velocity.x = -200;
            game.camera.x -= 2;
        }
        else if (this.cursor.right.isDown) {
            this.player.body.velocity.x = 200;
            game.camera.x += 2;
        }
        else
            this.player.body.velocity.x = 0;
        
        if (this.cursor.down.isDown) {
            game.camera.y += 100
        }
        
            
            
            
        // Make the player and the walls collide
        game.physics.arcade.collide(this.player, this.walls);
        
        // Make the player and the orbs collide
      //  game.physics.arcade.collide(this.player, this.orbs);
        
         // Make the player jump if he is touching the ground
        if (this.cursor.up.isDown && this.player.body.touching.down) 
            this.player.body.velocity.y = -250;
        
        // Call the 'takeCoin' function when the player takes a coin
        game.physics.arcade.overlap(this.player, this.coins, this.takeCoin, null, this);
        // Call the 'restart' function when the player touches the enemy
        game.physics.arcade.overlap(this.player, this.enemies, this.restart, null, this);
        
        // Change to next level when player touches magic orb
        game.physics.arcade.overlap(this.player, this.orbs, this.nextLevel, null,
        this);
        
       
        
    },
    
     // Function to kill a coin
    takeCoin: function(player, coin) {
         coin.kill();
        coinCount++;
    },
        
        // Function to restart the game
    restart: function() {
        game.state.start('main');
    },
    
    // Function to change the level
    nextLevel: function() { // try adding Level2 here
        this.levelAccumulator++;
        game.state.add('level2',levelTwo)
        game.state.start('level2');
    },
};

















var levelTwo = {
    preload: function() {
        game.load.image('player', 'assets/player.png');
        game.load.image('wall', 'assets/wall.png');
        game.load.image('coin', 'assets/coin.png');
        game.load.image('enemy', 'assets/enemy.png');
        game.load.image('bird', 'assets/bird.png');
        game.load.image('orb', 'assets/MagicOrb.png');
    },
    
    create: function() {
        game.stage.backgroundColor = '#5DADE2';
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.world.enableBody = true;
        game.world.setBounds(0, 0, 2000, 2000);
        
        // store arrow key pressed
        this.cursor = game.input.keyboard.createCursorKeys();
        // Create the player in the middle of the game
        this.player = game.add.sprite(70, 100, 'player');
        // Add gravity to make it fall
        this.player.body.gravity.y = 600;
        
        // Create 3 groups that will contain our objects
        this.walls = game.add.group();
        this.coins = game.add.group();
        this.enemies = game.add.group();
        this.birds = game.add.group();
        this.orbs = game.add.group();
        
        
        
        
        // Pointer to each level. Design the level. x = wall, o = coin, ! = lava.
       var level =  [
         '             ',
         '             ',
         '             ',
         '             ', 
         '             ',
         '             ',
         '             ',
         '             ',
         '    o        ',
         'xxxxx        ',
         '             ',
         '             ',
         '          x  ',
         '             ',
         '             ',
         '     x       ',
         '             ',
         '             ',
         '                  o        b ',
         '                 xx           ',
         '                         x            O',  
         '                xxxxxxxxxxxxxxxxxxxxxxxxx',
                    
         ];
        
        
        
        // Create the level by going through the array
        for (var i = 0; i < level.length; i++) {
            for (var j = 0; j < level[i].length; j++) {
            
            // Create a wall and add it to the 'walls' group
            if (level[i][j] == 'x') {
                var wall = game.add.sprite(30+20*j, 30+20*i, 'wall');
                this.walls.add(wall);
                wall.body.immovable = true; // so walls don't fall when player walks on them
            }
            
            // Create a bird enemy and add to 'birds' group
            else if (level[i][j] == 'b') {
                var bird = game.add.sprite(30+20*j, 30+20*i, 'bird');
                this.birds.add(bird);
                bird.body.gravity.y = 600;
            }
            
            // Create a coin and add it to the 'coins' group
            else if (level[i][j] == 'o') {
                var coin = game.add.sprite(30+20*j, 30+20*i, 'coin');
                this.coins.add(coin);
            }
            
            // Create a lava enemy and add it to the 'enemies' group
            else if (level[i][j] == '!') {
                var enemy = game.add.sprite(30+20*j, 30+20*i, 'enemy');
                this.enemies.add(enemy);
            }
                
            else if (level[i][j] == 'O') {
                var orb = game.add.sprite(30+20*j, 30+20*i, 'orb');
                this.orbs.add(orb);
                orb.body.immovable = true; // so orb can be touched to complete level
            }
            }
        }
    },
    
    update: function() {
        // Move the player when an arrow key is pressed
        if (this.cursor.left.isDown) {
            this.player.body.velocity.x = -200;
            game.camera.x -= 2;
        }
        else if (this.cursor.right.isDown) {
            this.player.body.velocity.x = 200;
            game.camera.x += 2;
        }
        else
            this.player.body.velocity.x = 0;
        
        if (this.cursor.down.isDown) {
            game.camera.y += 100
        }
        
            
       //  Make the bird move up and down periodically
      setInterval(this.moveBirdUp, 20);
            
        // Make the player and the walls collide
        game.physics.arcade.collide(this.player, this.walls);
        
        // Make the bird enemy and the walls collide
        game.physics.arcade.collide(this.birds, this.walls)
        
        // Make the player and the orbs collide
      //  game.physics.arcade.collide(this.player, this.orbs);
        
         // Make the player jump if he is touching the ground
        if (this.cursor.up.isDown && this.player.body.touching.down) 
            this.player.body.velocity.y = -250;
        
        // Call the 'takeCoin' function when the player takes a coin
        game.physics.arcade.overlap(this.player, this.coins, this.takeCoin, null, this);
        // Call the 'restart' function when the player touches the enemy lava
        game.physics.arcade.overlap(this.player, this.enemies, this.restart, null, this);
        
        // Call the 'restart' function when the player touches the enemy bird
        game.physics.arcade.overlap(this.player, this.birds, this.restart, null, 
        this);
        
        // Change to next level when player touches magic orb
        game.physics.arcade.overlap(this.player, this.orbs, this.nextLevel, null,
        this);
        
       
        
    },
    
    // Function to move the bird up and down
    
    moveBirdUp: function(bird) {
        if(bird.body.touching.down)
        bird.body.velocity.y = -400;
    }, 
    
     // Function to kill a coin
    takeCoin: function(player, coin) {
         coin.kill();
        coinCount++;
    },
        
        // Function to restart the game
    restart: function() {
        game.state.start('level2');
    },
    
    // Function to change the level
    nextLevel: function() { 
        game.stage.backgroundColor = '#5DADE2';
        game.state.add('level3',levelThree)
        game.state.start('level3');
    },
};




// Add a NPC merchant, then make a function to talk and buy items
var levelThree = {
    preload: function() {
        game.load.image('player', 'assets/player.png');
        game.load.image('wall', 'assets/wall.png');
        game.load.image('coin', 'assets/coin.png');
        game.load.image('enemy', 'assets/enemy.png');
        game.load.image('bird', 'assets/bird.png');
        game.load.image('stall', 'assets/stall.png');
        game.load.image('orb', 'assets/MagicOrb.png');
        
        game.load.json('speech', 'assets/speech.json');
    },
    
    create: function() {
        game.stage.backgroundColor = '#5DADE2';
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.world.enableBody = true;
        game.world.setBounds(0, 0, 2000, 2000);
        
        // store arrow key pressed
        this.cursor = game.input.keyboard.createCursorKeys();
        // Create the player in the middle of the game
        this.player = game.add.sprite(70, 100, 'player');
        // Add gravity to make it fall
        this.player.body.gravity.y = 600;
        
        // Create 3 groups that will contain our objects
        this.walls = game.add.group();
        this.coins = game.add.group();
        this.enemies = game.add.group();
        this.birds = game.add.group();
        this.stalls = game.add.group();
        this.orbs = game.add.group();
        
        
        
        
        // Pointer to each level. Design the level. x = wall, o = coin, ! = lava.
       var level =  [
         '                ',
         '                ',
         '                ',
         '                ', 
         '                ',
         '                ',
         '                ',
         '                ',
         '                ',
         '                ',
         '                ',
         '                ',
         '                ',
         '                ',
         '               s',
         '                ',
         '                ', 
         '                ',
         '                              ',
         '                              ',
         '                              ',  
         'xxxxxxxxxxxxxxxxxxxxxxxxxxxx  ',
                    
         ];
        
        
        
        // Create the level by going through the array
        for (var i = 0; i < level.length; i++) {
            for (var j = 0; j < level[i].length; j++) {
            
            // Create a wall and add it to the 'walls' group
            if (level[i][j] == 'x') {
                var wall = game.add.sprite(30+20*j, 30+20*i, 'wall');
                this.walls.add(wall);
                wall.body.immovable = true; // so walls don't fall when player walks on them
            }
            
            // Create a bird enemy and add to 'birds' group
            else if (level[i][j] == 'b') {
                var bird = game.add.sprite(30+20*j, 30+20*i, 'bird');
                this.birds.add(bird);
            }
            
            // Create a coin and add it to the 'coins' group
            else if (level[i][j] == 'o') {
                var coin = game.add.sprite(30+20*j, 30+20*i, 'coin');
                this.coins.add(coin);
            }
            
            // Create a lava enemy and add it to the 'enemies' group
            else if (level[i][j] == '!') {
                var enemy = game.add.sprite(30+20*j, 30+20*i, 'enemy');
                this.enemies.add(enemy);
            }
                
            else if (level[i][j] == 's') {
                var stall = game.add.sprite(30+20*j, 30+20*i, 'stall');
                this.stalls.add(stall);
                
            }
                
            else if (level[i][j] == 'O') {
                var orb = game.add.sprite(30+20*j, 30+20*i, 'orb');
                this.orbs.add(orb);
                orb.body.immovable = true; // so orb can be touched to complete level
            }
            }
        }
    },
    
    update: function() {
        // Move the player when an arrow key is pressed
        if (this.cursor.left.isDown) {
            this.player.body.velocity.x = -200;
            game.camera.x -= 2;
        }
        else if (this.cursor.right.isDown) {
            this.player.body.velocity.x = 200;
            game.camera.x += 2;
        }
        else
            this.player.body.velocity.x = 0;
        
        if (this.cursor.down.isDown) {
            game.camera.y += 100
        }
        
            
       //  Make the bird move up and down periodically
      setInterval(this.moveBirdUp, 20);
            
        // Make the player and the walls collide
        game.physics.arcade.collide(this.player, this.walls);
        
        // Make the player and the orbs collide
      //  game.physics.arcade.collide(this.player, this.orbs);
        
         // Make the player jump if he is touching the ground
        if (this.cursor.up.isDown && this.player.body.touching.down) 
            this.player.body.velocity.y = -250;
        
        // Call the 'takeCoin' function when the player takes a coin
        game.physics.arcade.overlap(this.player, this.coins, this.takeCoin, null, this);
        // Call the 'restart' function when the player touches the enemy lava
        game.physics.arcade.overlap(this.player, this.enemies, this.restart, null, this);
        
        // Call the 'restart' function when the player touches the enemy bird
        game.physics.arcade.overlap(this.player, this.birds, this.restart, null, 
        this);
        
        // Call the 'buyItem' function when the player touches the stall
        game.physics.arcade.overlap(this.player,this.stalls, this.buyItem,null,
        this);
        
        // Change to next level when player touches magic orb
        game.physics.arcade.overlap(this.player, this.orbs, this.nextLevel, null,
        this);
        
       
        
    },
    
    // Function to move the bird up and down
    
    moveBirdUp: function(bird) {
        bird.body.velocity.y = -400;
    }, 
    
     // Function to kill a coin
    takeCoin: function(player, coin) {
         coin.kill();
        coinCount++;
    },
        
        // Function to restart the game
    restart: function() {
        game.state.start('level2');
    },
    
    buyItem: function() {
        var speech = game.cache.getJSON('speech');
        game.paused = true;
        game.paused = false;
    },
   
    
    // Function to change the level
    nextLevel: function() { 
        game.stage.backgroundColor = '#5DADE2';
        game.state.add('level3',levelThree)
        game.state.start('level3');
    },
};






var game = new Phaser.Game(800,600);
game.state.add('main',mainState); 
game.state.start('main');         
                                  