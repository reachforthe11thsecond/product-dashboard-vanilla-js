function fetchProductsThen() {
  fetch('https://www.course-api.com/javascript-store-products')
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(products => {
      products.forEach(product => {
        console.log(product.fields.name);
      });
    })
    .catch(handleError);
}


async function fetchProductsAsync() {
  try {
    const response = await fetch('https://www.course-api.com/javascript-store-products');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const products = await response.json();
    displayProducts(products);
  } catch (error) {
    handleError(error);
  }
}


function displayProducts(products) {
  const container = document.getElementById("product-container");
  container.innerHTML = "";

  const limitedProducts = products.slice(0, 5);

  limitedProducts.forEach(product => {
    const { name, price, image } = product.fields;

    const card = document.createElement("div");
    card.className = "product-card";

    const productImg = document.createElement("img");
    productImg.src = image[0].url;
    productImg.alt = name;
    productImg.style.width = "100%";
    productImg.style.borderRadius = "5px";

    const productName = document.createElement("h3");
    productName.textContent = name;

    const productPrice = document.createElement("p");
    productPrice.textContent = price ? `$${(price / 100).toFixed(2)}` : "Price not available";

    card.appendChild(productImg);
    card.appendChild(productName);
    card.appendChild(productPrice);

    container.appendChild(card);
  });
}


function handleError(error) {
  console.error(`An error occurred: ${error.message}`);
  const container = document.getElementById("product-container");
  if (container) {
    container.innerHTML = `<p style="color:red;">An error occurred while loading products. Please try again later.</p>`;
  }
}


fetchProductsThen();
fetchProductsAsync();


