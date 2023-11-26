import { renderPictures } from './previews.js';
import { getData } from './api.js';
import { setFormSubmit, closeImageUploadForm } from './form.js';
import { showErrorMessage } from './status-messages.js';
import { setPicturesFilter } from './image-filters.js';

getData().then((picturesArray) => {
  renderPictures(picturesArray);
  setPicturesFilter(picturesArray);
}).catch(() => showErrorMessage());

setFormSubmit(closeImageUploadForm);
