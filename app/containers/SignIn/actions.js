import {
   SIGNIN,
 } from './constants';

export function signIn(payload) {
  return {
    type: SIGNIN, payload,
  };
}
