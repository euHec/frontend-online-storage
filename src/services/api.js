export async function getCategories() {
  // retorna todas as categorias
  const endPoint = 'https://api.mercadolibre.com/sites/MLB/categories';
  const response = await fetch(endPoint);
  const data = await response.json();
  return data;
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  const endPointQuery = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`;
  const response = await fetch(endPointQuery);
  const data = await response.json();
  return data;
}

export async function getProductById(productId) {
  const fetchProductDetails = await fetch(`https://api.mercadolibre.com/items/${productId}`);
  const data = fetchProductDetails.json();
  return data;
}
