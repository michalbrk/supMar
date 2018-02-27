import Timer from './Timer.js';
import Entity from './Entity.js';
import {loadLevel} from './loaders.js';
import {createMario} from './entities.js';
import Keyboard from './KeyboardState.js';
import {createCollisionLayer} from './layers.js';

window.addEventListener('keydown', event => {
    console.log(event);
});

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');

Promise.all([
    createMario(),
    loadLevel('1-1'),
])
.then(([mario, level]) => {
    
    const gravity = 2000;
    mario.pos.set(64,64);
    
    createCollisionLayer(level);
    
    level.entities.add(mario);
    
    const SPACE = 32;
    const input = new Keyboard();
    input.addMapping(SPACE, keyState => {
        if(keyState) {
            mario.jump.start();
        } else {
            mario.jump.cancel();
        }
    });
    input.listenTo(window);
    
    ['mousedown', 'mousemove'].forEach(evenName => {
        canvas.addEventListener(evenName, event => {
            if(event.buttons === 1) {
                mario.vel.set(0,0);
                mario.pos.set(event.offsetX, event.offsetY);
            }
        });
    });
    
    const timer = new Timer(1/60);
    
    timer.update = function update(deltaTime) {
        level.update(deltaTime);
        level.comp.draw(context);
        mario.vel.y += gravity * deltaTime;
    }
    
    timer.start();
});
