const backendFetchUrl =
  typeof window === 'undefined'
    ? 'http://backend:9876/api' // Utilisé dans Docker
    : 'http://localhost:9876/api';

export async function allItemsPagination(queryParameters) {
  try {
    const res = await fetch(
      `${backendFetchUrl}/items/getallitemspagination?${queryParameters}`
    );
    if (!res.ok) {
      throw new Error(
        'Erreur lors de la récupération des produits:',
        res.error
      );
    }
    return await res.json();
  } catch (err) {
    console.error('Erreur type:', err);
    return null;
  }
}

export async function getSpecificVariants(idQuery) {
  try {
    const res = await fetch(
      `${backendFetchUrl}/items/getspecificvariants/${idQuery}`
    );
    if (!res.ok) {
      throw new Error(
        'Erreur lors de la récupération des produits:',
        res.error
      );
    }
    return await res.json();
  } catch (err) {
    console.error('Erreur', err);
    return null;
  }
}
