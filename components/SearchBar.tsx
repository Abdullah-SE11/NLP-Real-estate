import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { Search } from 'lucide-react';
import { allPropertyTypes, allLocations, listingMarkets } from '@/data/properties';
import type { ListingPurpose } from '@/types';

const priceRanges = [
  { value: '-1000000', label: 'Up to $1M' },
  { value: '1000000-2500000', label: '$1M – $2.5M' },
  { value: '2500000-4000000', label: '$2.5M – $4M' },
  { value: '4000000-', label: '$4M and above' },
];
const rentRanges = [
  { value: '-3000', label: 'Up to $3,000' },
  { value: '3000-5000', label: '$3,000 – $5,000' },
  { value: '5000-', label: '$5,000 and above' },
];

const fieldClass = 'h-11 w-full min-w-0 rounded-md border border-[#dbe4de] bg-[#f7f9f7] px-3 text-sm font-medium text-[#182c28] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#126553] dark:border-[#405650] dark:bg-[#15211e] dark:text-white dark:focus-visible:outline-[#8dd8c0]';
const labelClass = 'grid min-w-0 gap-1.5 text-xs font-bold';

export default function SearchBar() {
  const navigate = useNavigate();
  const [purpose, setPurpose] = useState<ListingPurpose>('buy');

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const fields = new FormData(event.currentTarget);
    const location = String(fields.get('location') ?? '').trim();
    const type = String(fields.get('type') ?? '');
    const bedrooms = String(fields.get('bedrooms') ?? '');
    const [minPrice, maxPrice] = String(fields.get('price') ?? '').split('-');
    const params = new URLSearchParams();

    if (location) params.set('location', location);
    if (type) params.set('type', type);
    if (bedrooms) params.set('bedrooms', bedrooms);
    if (minPrice) params.set('minPrice', minPrice);
    if (maxPrice) params.set('maxPrice', maxPrice);

    navigate({ pathname: listingMarkets[purpose].path, search: params.toString() });
  }

  return (
    <form aria-label="Property search" role="search" onSubmit={handleSearch}
      className="mt-5 grid grid-cols-2 items-end gap-3 rounded-xl border border-[#dde4df] bg-white p-3.5 text-[#182c28] shadow-lg dark:border-[#30413b] dark:bg-[#1b2925] dark:text-white sm:grid-cols-3 sm:p-4 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(10.5rem,1fr)_auto]">
      <div role="group" aria-label="Listing purpose" className="col-span-full mx-auto flex flex-wrap justify-center gap-1 rounded-lg bg-[#edf5f0] p-1 dark:bg-[#15211e]">
        {(Object.keys(listingMarkets) as ListingPurpose[]).map((key) => (
          <button key={key} type="button" aria-pressed={purpose === key} onClick={() => setPurpose(key)}
            className="rounded-md px-3 py-2 text-sm font-bold hover:bg-[#e7f2ed] aria-pressed:bg-[#126553] aria-pressed:text-white dark:hover:bg-[#263e35] dark:aria-pressed:bg-[#8dd8c0] dark:aria-pressed:text-[#10241d]">
            {listingMarkets[key].label}
          </button>
        ))}
      </div>
      <div className="col-span-2 min-w-0 sm:col-span-3 lg:col-span-1">
        <label htmlFor="property-location" className="mb-1.5 block text-xs font-bold">Location</label>
        <Autocomplete
          id="property-location"
          className="property-location"
          freeSolo
          openOnFocus
          size="small"
          options={allLocations}
          slotProps={{ paper: { className: 'property-location-options' } }}
          renderInput={(params) => (
            <TextField {...params} name="location" placeholder="City or neighborhood" />
          )}
        />
      </div>
      <label className={labelClass}>
        Property type
        <select name="type" className={fieldClass + ' font-normal'}>
          <option value="">All types</option>
          {allPropertyTypes.map((type) => <option key={type}>{type}</option>)}
        </select>
      </label>
      <label className={labelClass}>
        {purpose === 'rent' ? 'Monthly rent (USD)' : 'Price (USD)'}
        <select key={purpose} name="price" className={fieldClass + ' font-normal'}>
          <option value="">Any price</option>
          {(purpose === 'rent' ? rentRanges : priceRanges).map(({ value, label }) => <option key={value} value={value}>{label}</option>)}
        </select>
      </label>
      <fieldset className="col-span-2 min-w-0 sm:col-span-1">
        <legend className="mb-1.5 text-xs font-bold">Bedrooms</legend>
        {/* Segmented radio styling adapted from Uiverse, Pradeepsaranbishnoi. */}
        <div className="grid h-11 grid-cols-5 gap-0.5 rounded-md border border-[#dbe4de] bg-[#f7f9f7] p-0.5 dark:border-[#405650] dark:bg-[#15211e]">
          {['', '1', '2', '3', '4'].map((count) => (
            <label key={count} className="relative min-w-0 cursor-pointer">
              <input type="radio" name="bedrooms" value={count} defaultChecked={!count} className="peer sr-only" />
              <span className="grid h-full place-items-center rounded-[4px] text-xs font-bold hover:bg-[#e7f2ed] peer-checked:bg-[#126553] peer-checked:text-white peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[#126553] dark:hover:bg-[#263e35] dark:peer-checked:bg-[#8dd8c0] dark:peer-checked:text-[#10241d] dark:peer-focus-visible:outline-[#8dd8c0]">
                {count ? `${count}+` : 'Any'}
              </span>
            </label>
          ))}
        </div>
      </fieldset>
      <button type="submit" className="col-span-2 inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-[#126553] px-5 text-sm font-bold text-white hover:bg-[#0b5141] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#126553] dark:bg-[#8dd8c0] dark:text-[#10241d] dark:hover:bg-[#a7e5d2] sm:col-span-3 lg:col-span-1">
        <Search size={17} aria-hidden="true" /> Search properties
      </button>
    </form>
  );
}
