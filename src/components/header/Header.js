import { ExcelComponent } from '@core/ExcelComponent';

export class Header extends ExcelComponent {
  static classList = ['excel__header', 'header'];
  constructor($root, options) {
    super($root, {
      name: 'Header',
      ...options
    });
  }
  toHTML() {
    return `
      <input type="text" class="header__input input" value="Новая таблица">
      <div>
        <div class="header__button button">
          <i class="material-icons">delete</i>
        </div>
        <div class="header__button button">
          <i class="material-icons">exit_to_app</i>
        </div>
      </div>
    `;
  }
}
