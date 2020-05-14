// import { storage } from '@core/utils';
import { defaultStyles, defaultTitle } from '@/constants';
import { clone } from '@core/utils';

export const defaultState = {
  rowState: {},
  columnState: {},
  dataState: {},
  stylesState: {},
  currentText: '',
  title: defaultTitle,
  openedDate: new Date().toJSON(),
  currentStyles: defaultStyles
};

const normalize = state => ({
  ...state,
  currentStyles: defaultStyles,
  currentText: ''
});

// export const initialState = storage('excel-state')
//   ? normalize(storage('excel-state'))
//   : defaultState;

export const normalizeInitialState = state => {
  return state ? normalize(state) : clone(defaultState);
};
