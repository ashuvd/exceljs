const CODES = {
  A: 65,
  Z: 90
};

function toCell(i, index) {
  return `
    <div class="table__cell" contenteditable data-row="${i}" data-column="${index}"></div>
  `;
}

function toColumn(column, index) {
  return `
    <div class="table__column column" data-type="resizable" data-column="${index}">
      ${column}
      <div class="column__resize" data-resize="column"></div>
    </div>
  `;
}

function createRow(content, index = '') {
  const resize = index ? '<div class="row__resize" data-resize="row"></div>' : '';
  return `
    <div class="table__row row" data-type="resizable" data-row="${index}">
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

export function createTable(rowsCount = 15) {
  const columnsCount = CODES.Z - CODES.A + 1;
  const rows = [];

  const columns = new Array(columnsCount)
    .fill('')
    .map(toChar)
    .map(toColumn)
    .join('');
  rows.push(createRow(columns));
  for (let i = 0; i < rowsCount; i++) {
    const cells = new Array(columnsCount)
      .fill(i+1)
      .map(toCell)
      .join('');
    rows.push(createRow(cells, i + 1));
  }
  return rows.join('');
  // `
  //     <div class="table__row">
  //       <div class="table__info"></div>
  //       <div class="table__data">
  //         <div class="table__column">A</div>
  //         <div class="table__column">B</div>
  //         <div class="table__column">C</div>
  //       </div>
  //     </div>
  //     <div class="table__row">
  //       <div class="table__info">1</div>
  //       <div class="table__data">
  //         <div class="table__cell selected" contenteditable>A1</div>
  //         <div class="table__cell" contenteditable>B1</div>
  //         <div class="table__cell" contenteditable>C1</div>
  //       </div>
  //     </div>
  // `
}
