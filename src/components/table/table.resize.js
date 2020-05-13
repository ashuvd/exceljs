import { $ } from '@core/dom';

export function resizeHandler($root, event) {
  return new Promise((resolve, reject) => {
    const resize = event.target.dataset.resize;
    const $resize = $(event.target);
    // const $parent = $resize.$el.parentElement; // bad !!!
    // const $parent = $resize.$el.closest('.column') // better but bad !
    const $parent = $resize.closest('[data-type="resizable"]');
    const coords = $parent.getCoords();
    const sideProp = resize === 'column' ? 'bottom' : 'right';
    $resize.css({
      opacity: 1,
      [sideProp]: '-5000px'
    });
    const cells = $root.findAll(`[data-column="${$parent.data.column}"]`);
    let value = null;
    document.onmousemove = e => {
      let delta = null;
      if (resize === 'column') {
        delta = e.pageX - coords.right;
        value = coords.width + delta;
        $resize.css({
          right: -delta + 'px'
        });
        // $parent.css({ width: value + 'px' });
        // cells.forEach(el => (el.style.width = value + 'px'));
      } else {
        delta = e.pageY - coords.bottom;
        value = coords.height + delta;
        $resize.css({
          bottom: -delta + 'px'
        });
      }
    };
    document.onmouseup = e => {
      if (resize === 'column') {
        $parent.css({ width: value + 'px' });
        cells.forEach(el => (el.style.width = value + 'px'));
      } else {
        $parent.css({ height: value + 'px' });
      }
      resolve({
        value,
        type: resize,
        id: $parent.data[resize]
      });
      $resize.css({
        opacity: 0,
        bottom: 0,
        right: 0
      });
      document.onmouseup = null;
      document.onmousemove = null;
    };
  });
}
