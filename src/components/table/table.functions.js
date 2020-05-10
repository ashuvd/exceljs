import { range } from '@core/utils';

export function shouldResize(event) {
  return event.target.dataset.resize;
}
export function isCell(event) {
  return event.target.dataset.type === 'cell';
}
export function matrix($target, $current) {
  const target = $target.id(true);
  const current = $current.id(true);
  const columns = range(current.column, target.column);
  const rows = range(current.row, target.row);
  return columns.reduce((acc, column) => {
    rows.forEach(row => acc.push(`${row}:${column}`));
    return acc;
  }, []);
}
export function nextSelector(key, {row, column}) {
  const MIN_VALUE = 0;
  switch (key) {
    case 'Enter':
    case 'ArrowDown':
      row++;
      break;
    case 'Tab':
    case 'ArrowRight':
      column++;
      break;
    case 'ArrowUp':
      row = row > MIN_VALUE ? row - 1 : row;
      break;
    case 'ArrowLeft':
      column = column > MIN_VALUE ? column - 1 : column;
      break;
  }
  return `[data-id="${row}:${column}"]`;
}
