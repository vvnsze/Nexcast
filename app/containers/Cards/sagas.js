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

const createCardAsync = (params) => (
  HttpClient.post('/api/card', params)
);

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
  try {
    const result = yield call(createCardAsync, action.payload);
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
    yield put({ type: CARD_UPDATED, payload: { updatedCard: action.payload, result } });
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
