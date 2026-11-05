const images = document.getElementById("images");
const button = document.getElementById("load-more");

let currentPage = 1;

const main = async (currentPage) => {
  const response = await fetch(`https://api.unsplash.com/photos/?page=${currentPage}`, {
    headers: {
      Authorization: "Client-ID WImkMsbSZL7_zkqcblz1jYzwrwFesiCNH8CEL1a8ce0",
    },
  });
  const result = await response.json();
  result.forEach((photo) => {
    const id = photo.id;
    const imageUrl = photo.urls.full;
    images.innerHTML += `<img src="${imageUrl}" alt="${id}" loading="lazy" class="h-auto w-full mb-6 rounded-2xl" />`;
  });
};
main(currentPage);
button.addEventListener("click", () => {
  currentPage++;
  main(currentPage);
});
