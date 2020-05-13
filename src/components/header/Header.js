import { ExcelComponent } from '@core/ExcelComponent';
import { $ } from '@core/dom';
import * as actions from '@/redux/actions';
import { createHeader } from '@/components/header/header.template';
import { debounce } from '@core/utils';

export class Header extends ExcelComponent {
  static classList = ['excel__header', 'header'];
  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input'],
      ...options
    });
  }
  prepare() {
    this.onInput = debounce(this.onInput.bind(this), 300);
  }

  toHTML() {
    return createHeader(this.store.getState());
  }
  onInput(event) {
    const $target = $(event.target);
    this.$dispatch(actions.changeTitle($target.text()));
  }
}
