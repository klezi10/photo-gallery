async function getPhotos() {
  let response = await fetch('photos.json');
  let photos = await response.json();
  return photos;
}

function showPhotos(photos) {
  const renderPhotos = photos
    .map((photo) => {
      return `
    <img class="my-photo" src="https://picsum.photos/id/${photo.id}/100/100" alt="${photos.title}" />
    `;
    })
    .join('');
  return `
    <div class="my-photos">${renderPhotos}</div>
    `;
}

getPhotos().then((photos) => {
  const renderPhotos = showPhotos(photos);
  document.body.innerHTML = `
  <div class="my-gallery">
  <img id="my-selected-photo" class="my-photo" src="https://picsum.photos/id/1/300/300" />
  ${renderPhotos}
  </div>
  `;

  const photoImgs = Array.from(document.querySelectorAll('.my-photo'));
  photoImgs.forEach((photoImg) => {
    photoImg.addEventListener('click', (event) => {
      const selectedPhotoSrc =
        photoImg.src.substr(0, photoImg.src.length - 7) + `200/200`;
      const selectedPhoto = document.getElementById('my-selected-photo');
      selectedPhoto.src = selectedPhotoSrc;
      selectedPhoto.style.display = 'inline';
    });
  });
});
