import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { fetchImagesWithAxios } from './fetchimages';

// DOM elementleri
const form = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery-list');
const loader = document.querySelector('#loader');
const loadMoreBtn = document.querySelector('.load-more-btn');

// Durum (State) değişkenleri
let currentPage = 1;
let currentQuery = '';
let totalHits = 0;

const lightbox = new SimpleLightbox('.gallery a');

// Sayfa yüklendiğinde load more butonunu gizle
hideLoadMoreBtn();

// Loader yardımcı fonksiyonlar
function showLoadingText() {
  loader.classList.remove('hidden');
}

function hideLoadingText() {
  loader.classList.add('hidden');
}

// -- OLAY DİNLEYİCİLERİ --
form.addEventListener('submit', handleFormSubmit);
loadMoreBtn.addEventListener('click', handleLoadMore);

async function handleFormSubmit(event) {
  event.preventDefault();
  const searchQuery = event.target.elements.searchQuery.value.trim();

  if (!searchQuery) {
    showToast('info', 'Arama alanı boş olamaz!');
    return;
  }

  currentQuery = searchQuery;
  currentPage = 1;
  gallery.innerHTML = '';
  hideLoadMoreBtn();
  showLoader();

  try {
    const { hits, totalHits: apiTotalHits } = await fetchImagesWithAxios(
      currentQuery,
      currentPage
    );
    totalHits = apiTotalHits;

    if (hits.length === 0) {
      showToast(
        'error',
        'Üzgünüz, arama sorgunuza uygun görsel bulunamadı. Lütfen tekrar deneyin!'
      );
      return;
    }

    renderImages(hits);

    if (totalHits > hits.length) {
      showLoadMoreBtn();
    }

    checkEndOfCollection();
  } catch (error) {
    showToast('error', 'Bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
    console.error(error);
  } finally {
    hideLoader();
  }
}

async function handleLoadMore() {
  currentPage += 1;
  showLoader();
  showLoadingText();
  hideLoadMoreBtn();

  try {
    const { hits } = await fetchImagesWithAxios(currentQuery, currentPage);
    renderImages(hits, false);
    smoothScroll();
    checkEndOfCollection();
  } catch (error) {
    showToast('error', 'Görseller yüklenirken bir hata oluştu.');
    console.error(error);
  } finally {
    hideLoader();
    hideLoadingText();
  }
}

function renderImages(images, clear = true) {
  const markup = images.map(createImageMarkup).join('');
  if (clear) {
    gallery.innerHTML = markup;
  } else {
    gallery.insertAdjacentHTML('beforeend', markup);
  }
  lightbox.refresh();
}

function createImageMarkup(img) {
  return `
    <li class="image-card">
      <a href="${img.largeImageURL}">
        <img src="${img.webformatURL}" alt="${img.tags}" loading="lazy" />
        <div class="info">
          <p><b>Likes</b> ${img.likes}</p>
          <p><b>Views</b> ${img.views}</p>
          <p><b>Comments</b> ${img.comments}</p>
          <p><b>Downloads</b> ${img.downloads}</p>
        </div>
      </a>
    </li>
  `;
}

function checkEndOfCollection() {
  const currentImageCount = gallery.children.length;

  if (currentImageCount >= totalHits) {
    hideLoadMoreBtn();
    if (totalHits > 0) {
      showToast('info', 'Üzgünüz, arama sonuçlarının sonuna ulaştınız.');
    }
  } else {
    showLoadMoreBtn();
  }
}

function smoothScroll() {
  const cardHeight = gallery.firstElementChild.getBoundingClientRect().height;
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}

function showLoader() {
  loader.classList.remove('hidden');
}
function hideLoader() {
  loader.classList.add('hidden');
}
function showLoadMoreBtn() {
  loadMoreBtn.classList.remove('hidden');
}
function hideLoadMoreBtn() {
  loadMoreBtn.classList.add('hidden');
}

function showToast(type, message) {
  iziToast[type]({
    message: message,
    position: 'topRight',
    timeout: 3000,
  });
}
