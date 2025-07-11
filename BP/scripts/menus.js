import { ActionFormData, ModalFormData } from "@minecraft/server-ui"
import { forceSneakForPat } from './config.js';
class Menus {
    settings(player) {
        const _modal = new ModalFormData();
        _modal.title('Mod configuration')
        _modal.toggle('Need sneaking to pet mobs(recommend to avoid issues)');
        _modal.show(player).then((FormData) => {
            if (FormData.canceled) return;
            forceSneakForPat = Boolean(FormData.formValues[0])
        })
    }
}

export const menus = new Menus();