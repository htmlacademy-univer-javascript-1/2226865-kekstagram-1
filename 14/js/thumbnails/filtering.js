import {randomElements, debounce} from '../util.js';

const ACTIVE_FILTER_CLASS = 'img-filters__button--active';
const INACTIVE_FILTERS_CLASS = 'img-filters--inactive';
const RERENDER_DELAY = 500;

const filtersBlock = document.querySelector('.img-filters');
const filtersForm = filtersBlock.querySelector('.img-filters__form');
const buttons = filtersForm.querySelectorAll('button');
const defaultFilterButton = document.querySelector('#filter-default');

const postsComparator = (post1, post2) => post2.likes - post1.likes;
const doFilteredRender = {
  'filter-default': (posts, render) => render(posts),
  'filter-random': (posts, render) => render(randomElements(10, posts)),
  'filter-discussed': (posts, render) => render(posts.slice().sort(postsComparator))
};

let prevClickedButton = defaultFilterButton;

export function adjustFiltering(posts, renderFun) {
  filtersBlock.classList.remove(INACTIVE_FILTERS_CLASS);
  buttons.forEach((button) =>
    button.addEventListener('click', (evt) => {
      const clickedButton = evt.target;
      prevClickedButton.classList.remove(ACTIVE_FILTER_CLASS);
      clickedButton.classList.add(ACTIVE_FILTER_CLASS);
      prevClickedButton = clickedButton;
      const filteredRenderFun = doFilteredRender[clickedButton.id];
      debounce(() => filteredRenderFun(posts, renderFun), RERENDER_DELAY);
    }));
}
