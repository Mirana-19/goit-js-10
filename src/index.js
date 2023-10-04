import SlimSelect from 'slim-select';
import { fetchBreeds, fetchCatByBreed } from './js/cat-api';
import 'slim-select/dist/slimselect.css';

const refs = {
  selectInput: document.querySelector('.breed-select'),
  error: document.querySelector('.error'),
  cardContainer: document.querySelector('.cat-info'),
  loader: document.querySelector('.loader'),
};

refs.selectInput.addEventListener('change', onOptionChange);
onPageLoad();

function onPageLoad() {
  fetchBreeds()
    .then(res => {
      const markup = createCatOptionsMarkup(res);

      renderOptions(markup);

      new SlimSelect({
        select: '.breed-select',
      });

      addVisuallyHidden(refs.loader);
    })
    .catch(err => {
      console.log(err);
      removeVisuallyHidden(refs.error);
    });
}

function onOptionChange(e) {
  const selectedCat = e.target.value;

  removeVisuallyHidden(refs.loader);
  addVisuallyHidden(refs.cardContainer);
  addVisuallyHidden(refs.error);

  fetchCatByBreed(selectedCat)
    .then(res => {
      renderCatInfo(res);

      removeVisuallyHidden(refs.cardContainer);
      addVisuallyHidden(refs.loader);
    })
    .catch(err => {
      console.log(err);
      removeVisuallyHidden(refs.error);
      addVisuallyHidden(refs.loader);
    });
}

function createCatOptionMarkup({ name, id }) {
  return `<option value="${id}">${name}</option>`;
}

function createCatOptionsMarkup(cats) {
  return cats.map(cat => createCatOptionMarkup(cat)).join('');
}

function renderOptions(cats) {
  refs.selectInput.innerHTML = cats;
}

function renderCatInfo(cat) {
  const { name, description, temperament } = cat[0].breeds[0];

  refs.cardContainer.innerHTML = `
    <img src="${cat[0].url}" width="400px" height="250px" alt="${name}" />
    <div class="cat-desc">
      <h1>${name}</h1>
      <p>${description}</p>
      <p>${temperament}</p>
    </div>`;
}

function addVisuallyHidden(el) {
  el.classList.add('visually-hidden');
}

function removeVisuallyHidden(el) {
  el.classList.remove('visually-hidden');
}
