// Unsplash Radom Photo API
let searchWords = location.search.split("=").pop();
console.log(searchWords);

const access_key = "ESDjSj2JEgvd-Fhuolf4mGHaIagjWFVWZpTh8dLNp20";
const random_photo_url = `https://api.unsplash.com/photos/random?client_id=${access_key}&count=10`;
const search_photo_url = `https://api.unsplash.com/search/photos?client_id=${access_key}&query=${searchWords}&per_page=10`;

const gallery = document.querySelector(".gallery");

let allImages;
let current_image;

const getImages = () => {
	fetch(random_photo_url)
		.then((res) => res.json())
		.then((data) => {

			allImages = data;
			displayImages(allImages);
		});
};

const searchImages = () => {
	fetch(search_photo_url)
		.then((res) => res.json())
		.then((data) => {

			allImages = data.results;
			displayImages(allImages);
			console.log(allImages);
			console.log(data);
		
			const errorMessage = document.querySelector('.error-message');
			const triangle = document.querySelector('.triangle');
			
		
			const showError = () => {
				if (data.total === 0) {
				
					errorMessage.style.opacity = 1;
					triangle.style.opacity = 1;
					errorMessage.innerHTML = `We could not find "${searchWords}", try again`;
				};		
			}
			showError()
				
		});
};


const displayImages = (data) => {
	data.forEach((photo, index) => {

    let img = document.createElement("img");
    let itemDiv = document.createElement("div");
    let h2 = document.createElement("h2");

    const photographerName = document.createTextNode(photo.user.name);
    img.src = photo.urls.regular;
    img.alt = "An image from Unsplash.com"; 

    gallery.appendChild(itemDiv);
    itemDiv.className = "item";
    itemDiv.appendChild(img);
    itemDiv.appendChild(h2);
    h2.appendChild(photographerName);

    // popup image
    img.addEventListener("click", () => {
		current_image = index;
		showPopup(photo);
		});

    h2.addEventListener("click", () => {
		current_image = index;
		showPopup(photo);
		});
	});
};

const preBtn = document.querySelector(".pre-btn");
const nextBtn = document.querySelector(".next-btn");

const pageEnd1 = document.querySelector('.page-end-1');
const pageEnd2 = document.querySelector('.page-end-2'); 


const showPopup = (photo) => {
	const popup = document.querySelector(".popup-bg");
	const image = document.querySelector(".large-img");
	const closeBtn = document.querySelector(".close-btn");
	const downloadBtn = document.querySelector(".link-btn");
	const info = document.querySelector(".info");

	popup.classList.remove("hide");
	gallery.classList.remove("hide");
	downloadBtn.href = photo.links.html;
	image.src = photo.urls.regular;

	// indicating page-end icons
	for (let i = 0; i < allImages.length; i++)
	if (current_image === 0){
			preBtn.classList.remove('visible');
			pageEnd1.classList.add('visible');
			pageEnd2.classList.remove('visible');
		} else if (current_image !== 0){
			preBtn.classList.add('visible');
			pageEnd1.classList.remove('visible');
		}
	if (current_image === allImages.length - 1){
			nextBtn.classList.remove('visible');
			pageEnd1.classList.remove('visible');
			pageEnd2.classList.add('visible');
		} else if (current_image !== allImages.length){
			nextBtn.classList.add('visible');
			pageEnd2.classList.remove('visible');
		}

	// social media links (connecting to corresponding icons)
	let twitter_btn = document.querySelector('.twitter-btn');
	let instagram_btn = document.querySelector('.insta-btn');
	let twitter_link = photo.user.social.twitter_username;
	let instagram_link = photo.user.instagram_username;

	console.log(twitter_link);
	console.log(instagram_link);

	twitter_btn.href = `https://twitter.com/${twitter_link}`;	
	instagram_btn.href = `https://instagram.com/${instagram_link}`;

	// to remove social media icon when 'null'
	if (twitter_link  == null){
		twitter_btn.style.display = 'none';
	} else {
		twitter_btn.style.display = 'inline';
	}
	if (instagram_link  == null){
		instagram_btn.style.display = 'none';
	} else {
		instagram_btn.style.display = 'inline';
	}

	// close btn
	closeBtn.addEventListener("click", () => {
		popup.classList.add("hide");
		gallery.classList.add("hide");
	});

	
	//hit image to close
	image.addEventListener('click', () => {
		popup.classList.add('hide');
		gallery.classList.add('hide');
		
	})

	// thumbnail photo
	let thumbnail = document.querySelector('#thumb-nail');

	thumbnail.src = photo.user.profile_image.small;	

	// to link thumbnail photo to photographer's collection page
	thumbnail.addEventListener('click', ()=>{
		let thumb_link = document.querySelector('.collection');
		thumb_link.href = photo.user.links.html;
	})
	
		let camera;
		// info of photo
		const showInfo = ()=>{
		const Name = photo.user.name;
		const spacing = '&nbsp &nbsp &nbsp' + '|' + '&nbsp &nbsp &nbsp' 
	
		info.innerHTML =
		Name + spacing + photo.user.location + spacing + photo.height + ' x ' + photo.width;

		// show 'N/A' when no specific photo info

		let camera = photo.exif.name;

		if (photo.user.location == null && camera == null){
			Name + spacing + 'N/A' + spacing + 'N/A';
		} else if (photo.user.location == null){
			info.innerHTML = 
			Name + spacing + 'N/A' + spacing + photo.exif.name; 
		} else if (camera == null){
			info.innerHTML = 
			Name + spacing + photo.user.location + spacing + 'N/A'; 
		} else {
			info.innerHTML =
			Name + spacing + photo.user.location + spacing + photo.exif.name;
			}
		}
		showInfo()		
	}
	
if (searchWords === "") {
	getImages();
} else {
	searchImages();
}

// pre & next button

preBtn.addEventListener("click", () => {
	if (current_image > 0) {
		current_image--;
		showPopup(allImages[current_image]);
	} 
});
nextBtn.addEventListener("click", () => {
		if (current_image < allImages.length - 1) {
		current_image++;
		showPopup(allImages[current_image]);
	}
});


