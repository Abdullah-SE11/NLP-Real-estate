const storageKey = 'nlp-real-estate.saved-listings';

export function readSavedListings(): number[] {
  try {
    const value: unknown = JSON.parse(localStorage.getItem(storageKey) ?? '[]');
    return Array.isArray(value) ? value.filter((id) => Number.isSafeInteger(id)) : [];
  } catch {
    return [];
  }
}

export function writeSavedListings(ids: number[]) {
  localStorage.setItem(storageKey, JSON.stringify(ids));
}
