import { Link } from 'react-router-dom';
import { ArrowUpRight, Bath, Bed, MapPin, Square } from 'lucide-react';
import type { Property } from '@/types';

interface PropertyCardProps {
  property: Property;
  featured?: boolean;
}

const usd = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

export default function PropertyCard({ property, featured = false }: PropertyCardProps) {
  return (
    <article className="overflow-hidden rounded-xl border border-[#dde4df] bg-white text-[#182c28] transition-colors hover:border-[#126553] dark:border-[#30413b] dark:bg-[#1b2925] dark:text-white dark:hover:border-[#8dd8c0]">
      <Link to={`/property/${property.id}`} className="group block h-full focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[#126553]">
        <div className="property-photo relative aspect-[16/9] overflow-hidden bg-[#e7f2ed] dark:bg-[#263e35]">
          <img src={property.image} alt="" loading="lazy" className="h-full w-full object-cover motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover:scale-[1.03]" />
          {(featured || property.demo) && <span className="absolute left-3 top-3 rounded-md bg-white px-2 py-1 text-xs font-bold text-[#182c28]">{property.demo ? 'Sample listing' : 'Featured'}</span>}
        </div>
        <div className="p-4 sm:p-5">
          <div className="flex items-center justify-between gap-2">
            <p className="text-xl font-extrabold tracking-tight">{usd.format(property.price)}{property.purpose === 'rent' && <span className="text-sm font-semibold">/mo</span>}</p>
            <span className="text-xs font-semibold text-[#4c625b] dark:text-[#b5c8c1]">{property.type}</span>
          </div>
          <h3 className="mt-1 flex items-start justify-between gap-2 text-base font-bold group-hover:text-[#126553] dark:group-hover:text-[#8dd8c0]">
            {property.title} <ArrowUpRight size={17} aria-hidden="true" className="mt-0.5 shrink-0" />
          </h3>
          <p className="mt-1 flex items-start gap-1.5 text-sm text-[#4c625b] dark:text-[#b5c8c1]">
            <MapPin size={15} aria-hidden="true" className="mt-0.5 shrink-0" />{property.location}
          </p>
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 border-t border-[#dde4df] pt-3 text-xs font-medium text-[#4c625b] dark:border-[#30413b] dark:text-[#b5c8c1]">
            <span className="inline-flex items-center gap-1.5"><Bed size={15} aria-hidden="true" />{property.bedrooms} beds</span>
            <span className="inline-flex items-center gap-1.5"><Bath size={15} aria-hidden="true" />{property.bathrooms} baths</span>
            <span className="inline-flex items-center gap-1.5"><Square size={14} aria-hidden="true" />{property.area.toLocaleString()} sq ft</span>
          </div>
        </div>
      </Link>
    </article>
  );
}
