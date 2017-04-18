/*
 *
 * SignUp actions
 *
 */

import {
  SIGNUP,
} from './constants';

export function signUp(payload) {
  return {
    type: SIGNUP, payload,
  };
}
