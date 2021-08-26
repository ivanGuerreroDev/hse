import {MenuState, MenuAction, MENU_ACTIONS} from './types';

const initialMenusState: MenuState = {
  menus: [],
};

export const menuReducer = (
  state: MenuState = initialMenusState,
  action: MenuAction,
): MenuState => {
  switch (action.type) {
    case MENU_ACTIONS.SAVE_MENU:
      const {menu} = action.payload;

      return {
        menus: [
          ...state.menus.filter(item => item.IdModulo !== menu.IdModulo),
          menu,
        ],
      };

    default:
      return state;
  }
};
