import { takeLatest, call, put } from 'redux-saga/effects';

import {
  CREATE_CARD,
  CARD_CREATED,
  DELETE_CARD,
  CARD_DELETED,
  UPDATE_CARD,
  CARD_UPDATED,
} from './constants';

import HttpClient from '../../httpClient';

const createCardAsync = (body) => {
  const params = { ...body, tagged_timestamp: body.time_stamp };
  return HttpClient.post('/api/card', params);
};

const updateCardAsync = (params) => (
  HttpClient.put(`/api/card/${params.id}`, params)
);

const deleteCardAsync = (params) => (
  HttpClient.delete(`/api/card/${params}`)
);

function* createCard() {
  yield takeLatest(CREATE_CARD, callCreateCard);
}

// ASYNC Actions (Sagas)
function* callCreateCard(action) {
  console.log('card before being sent to backend: ', action.payload);
  try {
    const result = yield call(createCardAsync, action.payload);
    console.log('+++35 this is the result!: ', result);
    yield put({ type: CARD_CREATED, payload: { result, createdCard: action.payload } });
  } catch (e) {
    console.error(e);
  }
}

function* updateCard() {
  yield takeLatest(UPDATE_CARD, callUpdateCard);
}

function* callUpdateCard(action) {
  try {
    const result = yield call(updateCardAsync, action.payload);
    yield put({ type: CARD_UPDATED, payload: { result, updatedCard: action.payload } });
  } catch (e) {
    console.error(e);
  }
}

function* deleteCard() {
  yield takeLatest(DELETE_CARD, callDeleteCard);
}

function* callDeleteCard(action) {
  try {
    const result = yield call(deleteCardAsync, action.payload.id);
    console.log('+++line 64 result from deletedCard: ', result);
    yield put({ type: CARD_DELETED, payload: { cardId: action.payload.id, result } });
  } catch (e) {
    console.error(e);
  }
}


// All sagas to be loaded
export default [
  createCard,
  updateCard,
  deleteCard,
];
