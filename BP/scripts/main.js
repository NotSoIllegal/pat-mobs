import {
    world,
    system
} from "@minecraft/server";
import { pettableMobs } from './config.js';

world.beforeEvents.playerInteractWithEntity.subscribe((event) => {
    const player = event.player;
    const entity = event.target;

    if (!player.isSneaking) return; //Todo sneaking patting toggle option 

    if (pettableMobs.includes(entity.typeId)) {
        event.cancel = true;
        system.run(() => {
            entity.playAnimation("animation.pat");
            entity.runCommand(`execute at @s run particle minecraft:heart_particle ~ ~1 ~`);
            entity.runCommand(`execute at @s run playsound random.pop @a ~ ~ ~`);
        })
    }
});