let searchWords = location.search.split("=").pop();

const access_key = "ESDjSj2JEgvd-Fhuolf4mGHaIagjWFVWZpTh8dLNp20";
const random_photo_url = `https://api.unsplash.com/photos/random?client_id=${access_key}&count=5`;
const search_photo_url = `https://api.unsplash.com/search/photos?client_id=${access_key}&query=${searchWords}&per_page=5`;

const gallery = document.querySelector(".gallery");

let allImages;
let current_image;
let data_2;

const getImages = () => {
	fetch(random_photo_url)
		.then((res) => res.json())
		.then((data) => {
			// console.log(data);
			allImages = data;
			displayImages(allImages);
		});
};

const searchImages = () => {
	fetch(search_photo_url)
		.then((res) => res.json())
		.then((data) => {
			console.log(data);
			allImages = data.results;
			displayImages(allImages);
			console.log(allImages);
		});
};


const displayImages = (data) => {
	data.forEach((photo, index) => {
		console.log(photo);

    let img = document.createElement("img");
    let itemDiv = document.createElement("div");
    let h2 = document.createElement("h2");

    const photographerName = document.createTextNode(photo.user.name);
    img.src = photo.urls.regular;
    img.alt = "An image from Unsplash.com"; 

    gallery.appendChild(itemDiv);
    itemDiv.className = "item";
    itemDiv.appendChild(img);
    itemDiv.appendChild(h2); // photographer's name
    h2.appendChild(photographerName);

	// social media links 
	let twitter_btn = document.querySelector('.twitter-btn');
	let instagram_btn = document.querySelector('.insta-btn');
	let twitter_link = photo.user.social.twitter_username;
	let instagram_link = photo.user.instagram_username;

		twitter_btn.href = `https://twitter.com/${twitter_link}`;	
		instagram_btn.href = `https://instagram.com/${instagram_link}`;

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

const showPopup = (photo) => {
	const popup = document.querySelector(".popup-bg");
	const image = document.querySelector(".large-img");
	const closeBtn = document.querySelector(".close-btn");
	const linkBtn = document.querySelector(".link-btn");
	const info = document.querySelector(".info");

	popup.classList.remove("hide");
	gallery.classList.remove("hide");
	linkBtn.href = photo.links.html;
	image.src = photo.urls.regular;

	// click 'close btn' to close
	
	closeBtn.addEventListener("click", () => {
		popup.classList.add("hide");
		gallery.classList.add("hide");
	});

		// thumbnail photo
		let thumbnail = document.querySelector('#thumb-nail');
		thumbnail.src = photo.user.profile_image.small;	
		console.log(thumbnail.src);

	// pop-up photo info :
	// photographer's name | location | camera or size

	info.innerHTML =
	photo.user.name +
	'&nbsp &nbsp &nbsp' +
	'|' +
	'&nbsp &nbsp &nbsp' +
	photo.user.location +
	'&nbsp &nbsp &nbsp' +
	'|' +
	'&nbsp &nbsp &nbsp' +
	photo.height + ' x ' + photo.width;

info.innerHTML =
	photo.user.name +
	'&nbsp &nbsp &nbsp' +
	'|' +
	'&nbsp &nbsp &nbsp' +
	photo.user.location +
	'&nbsp &nbsp &nbsp' +
	'|' +
	'&nbsp &nbsp &nbsp' +
	photo.exif.name; // phto


	
	//click image to close
	image.addEventListener('click', ()=>{
		popup.classList.add('hide');
		gallery.classList.add('hide');
	})

	}
	

if (searchWords === "") {
	getImages();
} else {
	searchImages();
}

// pre & next button

const preBtn = document.querySelector(".pre-btn");
const nextBtn = document.querySelector(".next-btn");

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


