const API_KEY = '6MCV4zCBBWhA4p8V53RasoaxaBXkEGtWffCclPwCP71s4vrwpYRPILBK'; // Substitua pela sua chave real
const PER_PAGE = 20; // Número de imagens por requisição
const QUERY = 'arte'; // Pode trocar por qualquer termo (ex: pintura, artista)

async function fetchImages() {
  const res = await fetch(`https://api.pexels.com/v1/search?query=${QUERY}&per_page=${PER_PAGE}`, {
    headers: {
      Authorization: API_KEY
    }
  });

  const data = await res.json();
  return data.photos;
}

function createCard(photo) {
  return `
    <div class="col-md-3">
      <div class="card">
        <img src="${photo.src.medium}" class="card-img-top" alt="${photo.photographer}">
        <div class="card-body">
          <p class="card-text">Foto de ${photo.photographer}</p>
        </div>
      </div>
    </div>
  `;
}

async function renderGallery() {
  const gallery = document.getElementById('gallery');
  const photos = await fetchImages();

  gallery.innerHTML = ''; // limpa se necessário

  for (let i = 0; i < photos.length; i += 4) {
    const row = document.createElement('div');
    row.className = 'row mb-4';

    const group = photos.slice(i, i + 4);
    group.forEach(photo => {
      row.innerHTML += createCard(photo);
    });

    gallery.appendChild(row);
  }
}

document.addEventListener('DOMContentLoaded', renderGallery);