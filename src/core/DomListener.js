import { capitalize } from '@core/utils';

export class DomListener {
  constructor($root, listeners = []) {
    if (!$root) {
      throw new Error('No $root provided for DomListener');
    }
    this.$root = $root;
    this.listeners = listeners;
  }
  initDOMListeners() {
    this.listeners.forEach(listener => {
      const method = getMethodName(listener);
      if (!this[method]) {
        throw new Error(
          `Method ${method} is not implemented in ${this.name} Component`
        );
      }
      this[method] = this[method].bind(this);
      // Тоже самое что и addEventListener
      this.$root.on(listener, this[method]);
      // тут this указывает на instance класса Formula например,
      // а не DomListener, т.к. мы создали этот instance через new Formula()
    });
  }
  removeDOMListeners() {
    this.listeners.forEach(listener => {
      const method = getMethodName(listener);
      this.$root.off(listener, this[method]);
    });
  }
}

// input => onInput
function getMethodName(eventName) {
  return 'on' + capitalize(eventName);
}
