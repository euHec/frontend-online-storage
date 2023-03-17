export async function getCategories() {
  // retorna todas as categorias
  const endPoint = 'https://api.mercadolibre.com/sites/MLB/categories';
  const response = await fetch(endPoint);
  const data = await response.json();
  return data;
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  // Caso receba uma categoria
  if (categoryId) {
    const endPointCategory = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}`;
    const response = await fetch(endPointCategory);
    const data = await response.json();
    return data;
  }
  // caso receba uma query
  const endPointQuery = `https://api.mercadolibre.com/sites/MLB/search?q=${query}`;
  const response = await fetch(endPointQuery);
  const data = await response.json();
  return data;
}

export async function getProductById() {
  // Esta implementação específica não é avaliada, mas pode ajudar você 🙂
  // Atenção: essa função não deverá ser chamada na tela do carrinho de compras.
}
