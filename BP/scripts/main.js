import {
    world,
    system
} from "@minecraft/server";

world.beforeEvents.playerInteractWithEntity.subscribe((event) => {
    const player = event.player;
    const entity = event.target;

    if (!entity || !player) return;
    if (!player.isSneaking) return;

    system.run(() => {
        entity.playAnimation("animation.pat");
        entity.runCommand(`execute at @s run particle minecraft:heart_particle ~ ~1 ~`);
        entity.runCommand(`execute at @s run playsound random.pop @a ~ ~ ~`);
    })
});