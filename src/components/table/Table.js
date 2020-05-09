import { ExcelComponent } from '@core/ExcelComponent';
import { createTable } from '@/components/table/table.template';
import { resizeHandler } from '@/components/table/table.resize';
import { shouldResize } from '@/components/table/table.functions';

export class Table extends ExcelComponent {
  static classList = ['excel__table', 'table'];
  constructor($root) {
    super($root, {
      listeners: ['mousedown']
    });
  }
  toHTML() {
    return createTable(20);
  }
  onMousedown(event) {
    if (shouldResize(event)) {
      resizeHandler(this.$root, event);
    }
  }
}
