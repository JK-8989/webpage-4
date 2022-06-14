const access_key = 'ESDjSj2JEgvd-Fhuolf4mGHaIagjWFVWZpTh8dLNp20';

const random_photo_url = `https://api.unsplash.com/photos/random?client_id=${access_key}&count=30`;

const gallery = document.querySelector('.gallery');


let allImages; // this will store all the images
let current_image;

const getImages = () => {
    fetch(random_photo_url)
    .then(res => res.json())
    .then(data => {
        allImages = data;
        makeImages(allImages);
    });
}

const makeImages = (data) => {
  data.forEach((item, index) => {

    let img = document.createElement('img');
    img.src = item.urls.regular;
    img.className = 'gallery-img';

    gallery.appendChild(img);

    img.addEventListener('click', () => {
      current_image = index;
      showPopup(item);
    })
  })
}
const showPopup = (item) => {
  let popup = document.querySelector('.image-popup');
  const downloadBtn = document.querySelector('.download-btn');
  const closeBtn = document.querySelector('.close-btn');
  const image = document.querySelector('.large-img');

  popup.classList.remove('hide');
  downloadBtn.href = item.links.html;
  image.src = item.urls.regular;

}

getImages()