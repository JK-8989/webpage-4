// let searchParam = location.search.split('=').pop();

// const access_key = 'ESDjSj2JEgvd-Fhuolf4mGHaIagjWFVWZpTh8dLNp20';

// const random_photo_url = `https://api.unsplash.com/photos/random?client_id=${access_key}&count=10`;
// const search_photo_url = `https://api.unsplash.com/search/photos?client_id=${access_key}&query=${searchParam}&per_page=50`;

// const gallery = document.querySelector('.gallery');


// let allImages;
// let current_image;

// const getImages = () => {
//     fetch(random_photo_url)
//     .then(res => res.json())
//     .then(data => {
//       allImages = data;
//         makeImages(allImages);
//     });
// }


// const searchImages = () => {
//   fetch(search_photo_url)
//   .then(res => res.json())
//   .then(data => {
//       allImages = data.results;
//       makeImages(allImages);
//   });
// }


// const makeImages = (data) => {
//   data.forEach((item, index) => {

//       let img = document.createElement('img');
//       img.src = item.urls.regular;
//       img.className = 'gallery-img';

//       gallery.appendChild(img);

//   })
// }

// const showPopup = (item) => {
//   let popup = document.querySelector('.image-popup');
//   const downloadBtn = document.querySelector('.download-btn');
//   const closeBtn = document.querySelector('.close-btn');
//   const image = document.querySelector('.large-img');

//   popup.classList.remove('hide');
//   downloadBtn.href = item.links.html;
//   image.src = item.urls.regular;

//   closeBtn.addEventListener('click', ()=>{
//     popup.classList.add('hide');
//   })
//   showPopup()
// }



// if(searchParam == ''){
//   getImages();
// }else{
//   searchImages();
// }

// getImages();

// // pre & next button arrows

// const preBtn = document.querySelector('.pre-btn');
// const nextBtn = document.querySelector('.next-btn');

// preBtn.addEventListener('click', () => {
//   if(current_image > 0){
//     current_image--;
//     showPopup(allImages[current_image]);
//   } 
// })
// nextBtn.addEventListener('click', () => {
//   if(current_image < allImages.length -1){
//     current_image++;
//     showPopup(allImages[current_image]);
//   } 
// })


//===============================
// Unsplash
const access_key = 'ESDjSj2JEgvd-Fhuolf4mGHaIagjWFVWZpTh8dLNp20';
const random_photo_url = `https://api.unsplash.com/photos/random?client_id=${access_key}&count=12`;
// ------------------------


const gallery = document.querySelector('.gallery');
// const img = document.querySelector('img')


let allImages;

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
      let itemDiv = document.createElement('div');
      let h2 = document.createElement('h2');
      let a = document.createElement('a');
      const text = document.createTextNode('Photographer');
      img.src = item.urls.regular;
    

      gallery.appendChild(itemDiv);
      itemDiv.className = 'item';
      itemDiv.appendChild(a);
      a.appendChild(img);
      a.appendChild(h2);
      h2.appendChild(text);

  })
}

getImages();