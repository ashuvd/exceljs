import { defaultTitle } from '@/constants';

export function createHeader(state = {}) {
  return `
    <input type="text" class="header__input input" value="${state.title ||
      defaultTitle}">
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
