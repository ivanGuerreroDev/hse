import {SaveMenu, SaveMenuAction, MENU_ACTIONS} from './types';
import {MenuData} from 'utils/types/menu';

export const saveMenu: SaveMenu = (menu: MenuData): SaveMenuAction => {
  let action: SaveMenuAction = {
    type: MENU_ACTIONS.SAVE_MENU,
    payload: {
      menu,
    },
  };

  return action;
};
