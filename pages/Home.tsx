import { Link } from 'react-router-dom';
import { ArrowRight, Bookmark, Building2, Calculator, HousePlus, Ruler, Users } from 'lucide-react';
import SearchBar from '@/components/SearchBar';
import PropertyCard from '@/components/PropertyCard';
import { allAgents, listingsFor, propertyImages } from '@/data/properties';
import houseImage from '@/assets/images/property-1.jpg';
import apartmentImage from '@/assets/images/property-2.jpg';
import villaImage from '@/assets/images/property-3.jpg';

const categories = [
  { type: 'House', label: 'Houses', image: houseImage },
  { type: 'Apartment', label: 'Apartments', image: apartmentImage },
  { type: 'Villa', label: 'Villas', image: villaImage },
];
const tools = [
  { label: 'New projects', detail: 'Browse property developments', to: '/projects', icon: Building2, color: 'bg-amber-100 text-amber-800' },
  { label: 'Mortgage calculator', detail: 'Estimate monthly payments', to: '/tools#mortgage', icon: Calculator, color: 'bg-emerald-100 text-emerald-800' },
  { label: 'Area converter', detail: 'Convert square feet, marla and more', to: '/tools#area', icon: Ruler, color: 'bg-sky-100 text-sky-800' },
  { label: 'Agent directory', detail: 'Find an agent by property', to: '/agents', icon: Users, color: 'bg-violet-100 text-violet-800' },
  { label: 'Saved properties', detail: 'Return to your shortlist', to: '/saved', icon: Bookmark, color: 'bg-rose-100 text-rose-800' },
  { label: 'Add property', detail: 'Prepare a listing draft', to: '/add-property', icon: HousePlus, color: 'bg-teal-100 text-teal-800' },
];
const cities = ['New York', 'Dubai', 'Tokyo'];
const properties = listingsFor('buy');
const rentals = listingsFor('rent');
const projects = listingsFor('projects');
const featured = properties.filter((property) => property.featured).slice(0, 3);
const titleClass = 'text-xl font-extrabold tracking-tight sm:text-2xl';
const linkClass = 'inline-flex items-center gap-1.5 text-sm font-bold text-[#126553] underline-offset-4 hover:underline dark:text-[#8dd8c0]';

export default function Home() {
  return (
    <div className="bg-[#f7f8f5] pb-12 text-[#182c28] dark:bg-[#101a18] dark:text-white">
      <section className="relative isolate mx-2 flex min-h-[32rem] flex-col justify-center overflow-hidden rounded-xl bg-[#24352f] text-white sm:mx-5 sm:min-h-[35rem] lg:min-h-[40rem]">
        <img src={propertyImages.property6} alt="" className="absolute inset-0 -z-20 h-full w-full object-cover object-center" />
        <div className="absolute inset-0 -z-10 bg-[#15211e]/65" aria-hidden="true" />
        <div className="mx-auto w-full max-w-4xl px-3 py-12 sm:px-6 sm:py-16">
          <h1 className="text-center text-[2rem] font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-[2.75rem]">
            Find property for sale and rent
          </h1>
          <SearchBar />
          <div className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm">
            <span className="text-white/85">Explore by city</span>
            {cities.map((city) => (
              <Link key={city} to={`/listings?location=${encodeURIComponent(city)}`}
                className="font-bold underline-offset-4 hover:underline">{city}</Link>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl space-y-10 px-4 pt-8 sm:px-8 sm:pt-10">
        <section aria-labelledby="browse-properties">
          <h2 id="browse-properties" className={titleClass}>Browse properties</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {categories.map(({ type, label, image }) => {
              const saleCount = properties.filter((property) => property.type === type).length;
              const rentCount = rentals.filter((property) => property.type === type).length;
              return (
                <article key={type} className="rounded-xl border border-[#dde4df] bg-white p-3.5 dark:border-[#30413b] dark:bg-[#15211e]">
                  <div className="flex items-center gap-3">
                    <img src={image} alt="" loading="lazy" className="h-12 w-16 rounded-md object-cover" />
                    <h3 className="font-extrabold">{label}</h3>
                  </div>
                  <div className="mt-3 grid grid-cols-2 gap-2 border-t border-[#dde4df] pt-3 dark:border-[#30413b]">
                    <Link className={linkClass + ' rounded-md bg-[#edf5f0] px-2 py-2 dark:bg-[#263e35]' + (rentCount ? '' : ' col-span-2')} to={`/listings?type=${type}`}>Buy ({saleCount})</Link>
                    {rentCount > 0 && <Link className={linkClass + ' rounded-md bg-[#edf5f0] px-2 py-2 dark:bg-[#263e35]'} to={`/rent?type=${type}`}>Rent ({rentCount})</Link>}
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section aria-labelledby="explore-homeverse">
          <h2 id="explore-homeverse" className={titleClass}>Explore Homeverse</h2>
          <div className="mt-4 grid gap-x-5 gap-y-2 sm:grid-cols-2 lg:grid-cols-3">
            {tools.map(({ label, detail, to, icon: Icon, color }) => (
              <Link key={to} to={to} className="flex items-center gap-3 rounded-lg px-2 py-2.5 hover:bg-white dark:hover:bg-[#1b2925]">
                <span className={`grid size-11 shrink-0 place-items-center rounded-lg ${color}`}><Icon size={21} aria-hidden="true" /></span>
                <span><span className="block text-sm font-extrabold">{label}</span><span className="block text-xs text-muted-foreground">{detail}</span></span>
              </Link>
            ))}
          </div>
        </section>

        <section aria-labelledby="home-agents">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 id="home-agents" className={titleClass}>Property agents</h2>
            <Link to="/agents" className={linkClass}>View directory <ArrowRight size={16} aria-hidden="true" /></Link>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {allAgents.slice(0, 4).map((agent) => (
              <Link key={agent.propertyId} to={`/property/${agent.propertyId}`} className="flex items-center gap-3 rounded-lg border border-[#dde4df] bg-white p-3 hover:border-[#126553] dark:border-[#30413b] dark:bg-[#15211e]">
                <img src={agent.image} alt="" width={40} height={40} loading="lazy" className="size-10 shrink-0 rounded-full object-cover" />
                <span className="min-w-0"><span className="block text-sm font-extrabold">{agent.name}</span><span className="block text-xs text-muted-foreground">{agent.propertyLocation}</span></span>
              </Link>
            ))}
          </div>
        </section>

        <section aria-labelledby="home-projects" className="rounded-xl border border-[#dce8e4] bg-[#edf5f2] p-4 dark:border-[#30413b] dark:bg-[#15211e] sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 id="home-projects" className={titleClass}>New projects</h2>
            <Link to="/projects" className={linkClass}>View all projects <ArrowRight size={16} aria-hidden="true" /></Link>
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((property) => <PropertyCard key={property.id} property={property} />)}
          </div>
        </section>

        <section aria-labelledby="home-featured">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 id="home-featured" className={titleClass}>Featured properties</h2>
            <Link to="/listings" className={linkClass}>View all listings <ArrowRight size={16} aria-hidden="true" /></Link>
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((property) => <PropertyCard key={property.id} property={property} />)}
          </div>
        </section>
      </div>
    </div>
  );
}
