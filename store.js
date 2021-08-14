import { createStore, combineReducers } from 'redux';
import { createAction, handleActions } from 'redux-actions';

const appInitialState = {
  lol: false,
  data: [],
};

const SET_LOL = 'SET_LOL';
const SET_DATA = 'SET_DATA';

export const setLol = createAction(SET_LOL);
export const setData = createAction(SET_DATA);

const App = handleActions(
  {
    [SET_LOL]: (state, { payload }) => ({
      ...state,
      lol: payload,
    }),
    [SET_DATA]: (state, { payload }) => ({
      ...state,
      data: payload,
    }),
  },
  appInitialState,
);

const rootReducer = combineReducers({
  App,
});

const configureStore = () => createStore(rootReducer);
export const store = configureStore();