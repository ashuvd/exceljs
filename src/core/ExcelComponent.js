import { DomListener } from '@core/DomListener';

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name || '';
    this.emitter = options.emitter;
    this.subscribe = options.subscribe || [];
    this.store = options.store;
    // this.storeSub = {};
    this.unsubs = [];
    this.prepare();
  }
  // Настраиваем компонент до init
  prepare() {}
  // Возвращает шиблон компонента
  toHTML() {
    return '';
  }
  // Уведомляем слушателей про событие event
  $emit(event, ...args) {
    this.emitter.emit(event, ...args);
  }
  $on(event, fn) {
    const unsub = this.emitter.subscribe(event, fn);
    this.unsubs.push(unsub);
  }
  $dispatch(action) {
    this.store.dispatch(action);
  }
  // Сюда приходят изменения только по тем полям, которые мы изменяли
  storeChanged() {}
  isWatching(key) {
    return this.subscribe.includes(key);
  }
  // $subscribe(fn) {
  //   this.storeSub = this.store.subscribe(fn);
  // }
  // Инициализируем компонент
  // Добавляем слушателей
  init() {
    this.initDOMListeners();
  }
  // Удаляем компонент
  // Чистим слушателей
  destroy() {
    this.removeDOMListeners();
    this.unsubs.forEach(unsub => unsub());
    // this.storeSub.unsubscribe();
  }
}
