import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import PropertyCard from '@/components/PropertyCard';
import { propertiesData } from '@/data/properties';
import { readSavedListings, writeSavedListings } from '@/lib/saved-listings';

export default function SavedListings() {
  const [ids, setIds] = useState(readSavedListings);
  const properties = propertiesData.properties.filter((property) => ids.includes(property.id));

  function remove(id: number) {
    const next = readSavedListings().filter((savedId) => savedId !== id);
    try {
      writeSavedListings(next);
      setIds(next);
    } catch {
      toast.error('Could not update saved listings on this device.');
    }
  }

  return (
    <div className="mx-auto min-h-[50vh] max-w-7xl px-4 py-10 sm:px-8">
      <h1 className="text-4xl font-extrabold tracking-tight">Saved properties</h1>
      <p className="mt-2 text-muted-foreground">Your shortlist is stored in this browser.</p>
      {properties.length === 0 ? (
        <div className="mt-7 rounded-xl border bg-card p-6">
          <p className="font-semibold">Your shortlist is empty.</p>
          <Link to="/listings" className="mt-3 inline-block font-bold text-primary underline">Browse properties</Link>
        </div>
      ) : (
        <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {properties.map((property) => (
            <div key={property.id}>
              <PropertyCard property={property} />
              <button type="button" className="mt-2 rounded-md px-2 py-2 text-sm font-semibold text-primary hover:underline"
                aria-label={`Remove ${property.title} from saved properties`} onClick={() => remove(property.id)}>
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
