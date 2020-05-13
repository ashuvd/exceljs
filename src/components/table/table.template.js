import { DEFAULT_HEIGHT, DEFAULT_WIDTH } from '@/redux/types';
import { toInlineStyles } from '@core/utils';
import { defaultStyles } from '@/constants';
import { parse } from '@core/parse';

const CODES = {
  A: 65,
  Z: 90
};

function toCell(state) {
  return function({ column: row, index, width }) {
    const id = `${row}:${index}`;
    const data = state.dataState[id];
    const styles = toInlineStyles({
      ...defaultStyles,
      ...state.stylesState[id]
    });
    return `
      <div class="table__cell"
        contenteditable
        data-id=${id}
        data-type="cell"
        data-column="${index}"
        data-value="${data || ''}"
        style="${styles};width: ${width}"
      >${parse(data) || ''}</div>
    `;
  };
}

function toColumn({ column, index, width }) {
  return `
    <div 
      class="table__column column"
      data-type="resizable"
      data-column="${index}"
      style="width: ${width}"
    >
      ${column}
      <div class="column__resize" data-resize="column"></div>
    </div>
  `;
}

function createRow(content, index = '', height = DEFAULT_HEIGHT + 'px') {
  const resize = index
    ? '<div class="row__resize" data-resize="row"></div>'
    : '';
  return `
    <div class="table__row row" data-type="resizable" data-row="${index}" style="height: ${height}">
      <div class="table__info">
        ${index}
        ${resize}
      </div>
      <div class="table__data">${content}</div>
    </div>
  `;
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index);
}

function getWidth(state, index) {
  return (state[index] || DEFAULT_WIDTH) + 'px';
}

function getHeight(state, index) {
  return (state[index] || DEFAULT_HEIGHT) + 'px';
}

function withWidthFrom(state) {
  return function(column, index) {
    return {
      column,
      index,
      width: getWidth(state.columnState, index)
    };
  };
}

export function createTable(rowsCount = 15, state = {}) {
  const columnsCount = CODES.Z - CODES.A + 1;
  const rows = [];

  const columns = new Array(columnsCount)
    .fill('')
    .map(toChar)
    .map(withWidthFrom(state))
    .map(toColumn)
    .join('');
  rows.push(createRow(columns));
  for (let i = 0; i < rowsCount; i++) {
    const cells = new Array(columnsCount)
      .fill(i)
      .map(withWidthFrom(state))
      .map(toCell(state))
      .join('');
    rows.push(createRow(cells, i + 1, getHeight(state.rowState, i + 1)));
  }
  return rows.join('');
}
