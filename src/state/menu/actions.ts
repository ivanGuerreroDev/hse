import {SaveMenu, SaveMenuAction, MENU_ACTIONS} from './types';
import {IMenu} from 'utils/types/menu';

export const saveMenu: SaveMenu = (menu: IMenu): SaveMenuAction => {
  let action: SaveMenuAction = {
    type: MENU_ACTIONS.SAVE_MENU,
    payload: {
      menu,
    },
  };

  return action;
};
