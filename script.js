const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;
const gravity = 1.5;

class Player {
    constructor() {
        this.position = {
            x: 100,
            y: 100
        }
        this.velocity = {
            x: 0,
            y: 0
        }
        this.width = 30;
        this.height = 30;
    }
    draw() {
        c.fillStyle = 'blue';
        c.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
    update() {
        this.draw();
        this.position.x += this.velocity.x
         this.position.y += this.velocity.y; 
         if(this.position.y +this.height +this.velocity.y <= canvas.height)
         this.velocity.y += gravity;
        else this.velocity.y = 0;
    }
}

class Platform {
    constructor({ x,y }) {
        this.position = {
            x,
            y
        }

        this.width = 200;
        this.height = 20;
    }
    draw() {
    c.fillStyle ='red';
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}

const player = new Player();
const platforms = [new Platform({
    x: 200,
    y: 100
}), new Platform({
    x: 500,
    y: 200
})];

const keys = {
    right: {
        pressed: false 
    },
    left: {
        pressed: false
    }
}
player.update();

let win = 0;

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);
    player.update();
    platforms.forEach(platform => {
        platform.draw()
    })
    if(keys.right.pressed && player.position.x < 400) {
        player.velocity.x = 5;
    }else if(keys.left.pressed && player.position.x > 100) {
        player.velocity.x = -5;
    }else {
        player.velocity.x = 0;

        if(keys.right.pressed) {
            win += 5;
            platforms.forEach(platform => {
                platform.draw()
          
            platform.position.x -= 5
       }) }  

        if(keys.left.pressed) {
            win -= 5;
            platforms.forEach(platform => {
                platform.draw()
            
            platform.position.x += 5
        })}

        if (win > 200) {
            console.log("win");
        }
    }

    platforms.forEach(platform => {
        platform.draw()
    if(player.position.y + player.height <= platform.position.y && player.position.y + player.height + player.velocity.y >= platform.position.y && player.position.x + player.width  >= platform.position.x && player.position.x <= platform.position.x + platform.width) {
        player.velocity.y = 0;
    }
})
}

animate();

addEventListener('keydown', ({ keyCode }) => {
    console.log(keyCode);
    switch (keyCode) {
        case 65: 
        keys.left.pressed = true
        console.log('left');
        break;
        case 83: 
        console.log('down');
        break;
        case 68: 
        keys.right.pressed = true
        console.log('right');
        break;
        case 87: 
        console.log('up');
        player.velocity.y -= 20;
        break;
        case 32: 
        console.log('up');
        player.velocity.y -= 20;
        break;
        case 37: 
        keys.left.pressed = true;
        console.log('left');
        break;
        case 40: 
        console.log('down');
        break;
        case 39:
        keys.right.pressed = true
        console.log('right');
        break;
        case 38: 
        player.velocity.y -= 20;
        console.log('up');
        break;
    }
})

addEventListener('keyup', ({ keyCode }) => {
    console.log(keyCode);
    switch (keyCode) {
        case 65: 
        keys.left.pressed = false
        console.log('left');
        break;
        case 83: 
        console.log('down');
        break;
        case 68: 
        keys.right.pressed = false
        console.log('right');
        break;
        case 87: 
        console.log('up');
        player.velocity.y -= 20;
        break;
        case 32: 
        console.log('up');
        player.velocity.y -= 20;
        break;
        case 37: 
        keys.left.pressed = false
        console.log('left');
        break;
        case 40: 
        console.log('down');
        break;
        case 39:
        keys.right.pressed = false
        console.log('right');
        break;
        case 38: 
        player.velocity.y -= 20;
        console.log('up');
        break;
    }
})