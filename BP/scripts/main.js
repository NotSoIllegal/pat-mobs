import {
    world,
    system
} from "@minecraft/server";
import { pattableMobs } from './config.js';

world.beforeEvents.playerInteractWithEntity.subscribe((event) => {
    const player = event.player;
    const entity = event.target;

    const mob = pattableMobs[entity.typeId];
    const [px, py, pz] = mob ? mob.particleOffset ?? [0, 0, 0] : [0, 0, 0];

    //if (!player.isSneaking && forceSneakForPat) return;
    if (!player.isSneaking) return;

    if (mob) {
        event.cancel = true;
        system.run(() => {
            entity.playAnimation("animation.pat");
            entity.runCommand(`execute at @s run particle pattmobs:hand ~${px} ~${py} ~${pz}`);
            entity.runCommand(`execute at @s run playsound pattmobs:pat @a ~ ~ ~`);
        })
    }
});