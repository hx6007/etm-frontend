/*
 *
 * LoginPage actions
 *
 */

import {
  SIGN_IN, SIGN_OUT,UPDATE_CATEGORY,UPDATE_NAVBAR,UPDATE_WAREHOUSE,UPDATE_TICKET,UPDATE_SPECIAL_SUPPLY,UPDATE_FUTURES
} from './constants';


export const updateWarehouse = (warehouse) => ({
  type: UPDATE_WAREHOUSE,
  warehouse
});

export const updateSpecialSupply = (special_supply) => ({
  type: UPDATE_SPECIAL_SUPPLY,
  special_supply
});

export const updateFutures = (Futures) => ({
  type: UPDATE_FUTURES,
  Futures
});

export const updateNavbarAction = (navbar) => ({
  type: UPDATE_NAVBAR,
  navbar
});

export const updateCategoryAction = (category) => ({
  type: UPDATE_CATEGORY,
  category
});

export const updateTicket = (ticket) => {
  window.ticket=ticket;
  return {
    type: UPDATE_TICKET,
    ticket
  }

};

export const signInAction = (userInfo,siteCode, productHalls) => ({
  type: SIGN_IN,
  userInfo,
  siteCode,
  productHalls,
});

export const signOutAction = () => {
  window.ticket=null;
  return {
    type: SIGN_OUT
  };
};

