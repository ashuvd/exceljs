import { ExcelComponent } from '@core/ExcelComponent';
import { createTable } from '@/components/table/table.template';

export class Table extends ExcelComponent {
  static classList = ['excel__table', 'table'];
  toHTML() {
    return createTable(20);
  }
}
