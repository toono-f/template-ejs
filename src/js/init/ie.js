import imagesLoaded from 'imagesloaded';
import objectFitImages from 'object-fit-images';
import Stickyfill from 'stickyfilljs';
// import picturefill from 'picturefill';

export default function () {
  const html = document.getElementsByTagName('html');
  html[0].classList.add('is-ie');

  // sticky
  const elements = document.querySelectorAll('.js-sticky');
  Stickyfill.add(elements);

  // object-fit
  const page = document.querySelector('.js-page');
  const imgLoad = imagesLoaded(page);
  imgLoad.on('always', () => setTimeout(objectFitImages(), 3000));
}
