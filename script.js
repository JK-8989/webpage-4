// Unsplash Radom Photo API
let searchWords = location.search.split("=").pop();

const access_key = "ESDjSj2JEgvd-Fhuolf4mGHaIagjWFVWZpTh8dLNp20";
const random_photo_url = `https://api.unsplash.com/photos/random?client_id=${access_key}&count=15`;
const search_photo_url = `https://api.unsplash.com/search/photos?client_id=${access_key}&query=${searchWords}&per_page=10`;

const gallery = document.querySelector(".gallery");

let allImages;
let current_image;

const getImages = () => {
	fetch(random_photo_url)
		.then((res) => res.json())
		.then((data) => {
			console.log(data);
			allImages = data;
			displayImages(allImages);
		});
};

const searchImages = () => {
	fetch(search_photo_url)
		.then((res) => res.json())
		.then((data) => {
			// console.log(data);
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
	
	closeBtn.addEventListener("click", () => {
		popup.classList.add("hide");
		gallery.classList.add("hide");
	});

	
	//hit image to close
	image.addEventListener('click', ()=>{
		popup.classList.add('hide');
		gallery.classList.add('hide');
	})

	
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
			photo.exif.name;
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
