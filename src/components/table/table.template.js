const CODES = {
  A: 65,
  Z: 90
};

function toCell(cell) {
  return `
    <div class="table__cell" contenteditable>${cell}</div>
  `;
}

function toColumn(column) {
  return `
     <div class="table__column">${column}</div>
  `;
}

function createRow(content, index = '') {
  return `
    <div class="table__row">
      <div class="table__info">${index}</div>
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
      .fill('')
      .map(toCell)
      .join('');
    rows.push(createRow(cells, i+1));
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
