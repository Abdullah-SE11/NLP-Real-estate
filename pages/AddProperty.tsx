import { useState, type FormEvent } from 'react';
import { allPropertyTypes, listingMarkets } from '@/data/properties';
import { Button } from '@/components/ui/button';

const draftKey = 'nlp-real-estate.listing-draft';
const field = 'mt-2 block w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm';
const emptyDraft = { title: '', location: '', purpose: 'buy', type: '', price: '', description: '' };

function readDraft(): typeof emptyDraft {
  try {
    const stored = JSON.parse(localStorage.getItem(draftKey) ?? 'null');
    return { ...emptyDraft, ...stored };
  } catch {
    return emptyDraft;
  }
}

export default function AddProperty() {
  const [draft, setDraft] = useState(readDraft);
  const [status, setStatus] = useState('');

  function change(key: keyof typeof emptyDraft, value: string) {
    setDraft((current) => ({ ...current, [key]: value }));
    setStatus('');
  }

  function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      localStorage.setItem(draftKey, JSON.stringify(draft));
      setStatus('Draft saved in this browser.');
    } catch {
      setStatus('The draft could not be saved in this browser.');
    }
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-8">
      <h1 className="text-4xl font-extrabold tracking-tight">Add a property</h1>
      <p className="mt-2 text-muted-foreground">Prepare a listing draft. Drafts are private to this browser.</p>
      <form onSubmit={save} className="mt-6 grid gap-4 rounded-xl border bg-card p-5 sm:grid-cols-2 sm:p-7">
        <label className="text-sm font-semibold sm:col-span-2">Listing title
          <input value={draft.title} onChange={(e) => change('title', e.target.value)} maxLength={100} required className={field} />
        </label>
        <label className="text-sm font-semibold">Listing purpose
          <select value={draft.purpose} onChange={(e) => change('purpose', e.target.value)} className={field}>
            {Object.entries(listingMarkets).map(([key, market]) => <option key={key} value={key}>{market.label}</option>)}
          </select>
        </label>
        <label className="text-sm font-semibold">Property type
          <select value={draft.type} onChange={(e) => change('type', e.target.value)} required className={field}>
            <option value="">Select a type</option>
            {allPropertyTypes.map((type) => <option key={type}>{type}</option>)}
          </select>
        </label>
        <label className="text-sm font-semibold">Location
          <input value={draft.location} onChange={(e) => change('location', e.target.value)} maxLength={120} required className={field} />
        </label>
        <label className="text-sm font-semibold">{draft.purpose === 'rent' ? 'Monthly rent (USD)' : 'Price (USD)'}
          <input type="number" min="1" value={draft.price} onChange={(e) => change('price', e.target.value)} required className={field} />
        </label>
        <label className="text-sm font-semibold sm:col-span-2">Description
          <textarea rows={5} value={draft.description} onChange={(e) => change('description', e.target.value)} maxLength={3000} required className={field} />
        </label>
        <div className="flex flex-wrap items-center gap-3 sm:col-span-2">
          <Button type="submit">Save draft</Button>
          <p role="status" className="text-sm text-muted-foreground">{status}</p>
        </div>
      </form>
    </div>
  );
}
