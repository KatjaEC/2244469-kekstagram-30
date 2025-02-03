// import { renderPictures } from './previews.js';
// import { getData } from './api.js';
import { photosArray, renderPictures } from './mocks.js';
import { setFormSubmit, closeImageUploadForm } from './form.js';
import { showErrorMessage } from './status-messages.js';
import { setPicturesFilter } from './image-filters.js';

// In case of mock data

setPicturesFilter(photosArray);

try {
  renderPictures(photosArray);
  setPicturesFilter(photosArray);
} catch {
  showErrorMessage();
}

// In case of server data

// getData().then((picturesArray) => {
//   renderPictures(picturesArray);
//   setPicturesFilter(picturesArray);
// }).catch(() => showErrorMessage());

setFormSubmit(closeImageUploadForm);
