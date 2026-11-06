const gallery = document.getElementById("gallery");
const button = document.getElementById("load-more");
const searchForm = document.getElementById("search-form");
const inputElement = document.getElementById("search");

let currentPage = 1;

const main = async (currentPage) => {
  const response = await fetch(`https://api.unsplash.com/photos/?page=${currentPage}`, {
    headers: {
      Authorization: "Client-ID WImkMsbSZL7_zkqcblz1jYzwrwFesiCNH8CEL1a8ce0",
    },
  });
  const result = await response.json();
  gallery.innerHTML = "";
  result.forEach((photo) => {
    const id = photo.id;
    const imageUrl = photo.urls.small;
    gallery.innerHTML += `<img src="${imageUrl}" alt="${id}" loading="lazy" class="h-auto w-full mb-6 rounded-2xl" />`;
  });
};

main(currentPage);

const searchPhotos = async () => {
  const value = inputElement.value.trim();
 
  const response = await fetch(`https://api.unsplash.com/search/photos?page=${currentPage}&query=${value}`, {
    headers: {
      Authorization: "Client-ID WImkMsbSZL7_zkqcblz1jYzwrwFesiCNH8CEL1a8ce0",
    },
  });

  const result = await response.json();

  const photos = result.results;
  gallery.innerHTML = "";

  photos.forEach((photo) => {
    const id = photo.id;
    const imageUrl = photo.urls.small;
    gallery.innerHTML += `<img src="${imageUrl}" alt="${id}" class="h-auto w-full mb-6 rounded-2xl" />`;
  });
};

button.addEventListener("click", async () => {
  button.textContent = "Loading...";
  currentPage++;

  if (inputElement.value.trim()) {
    await searchPhotos();
  } else {
    await main(currentPage);
  }
  button.textContent = "Load more ↓";
});

searchForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  await searchPhotos();
});
