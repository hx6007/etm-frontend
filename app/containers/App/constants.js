/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const LOAD_SUCCESS = 'boilerplate/App/LOAD_SUCCESS';
export const LOAD_ERROR = 'boilerplate/App/LOAD_ERROR';
export const SIGN_IN = 'boilerplate/App/SIGN_IN';
export const SIGN_OUT = 'boilerplate/App/SIGN_OUT';
export const UPDATE_CATEGORY = 'boilerplate/App/UPDATE_CATEGORY';
export const UPDATE_TICKET = 'boilerplate/App/UPDATE_TICKET';
export const UPDATE_NAVBAR = 'boilerplate/App/UPDATE_NAVBAR';
export const UPDATE_WAREHOUSE = 'boilerplate/App/UPDATE_WAREHOUSE';
export const UPDATE_SPECIAL_SUPPLY = 'boilerplate/App/UPDATE_SPECIAL_SUPPLY';
export const DEFAULT_LOCALE = 'en';
