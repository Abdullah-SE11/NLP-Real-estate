import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, ChevronDown, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

/* ─── Pakistan Market Data ─── */
const TABS = ['Buy', 'Rent', 'New Projects', 'Invest', 'Commercial'];

const CITIES = [
  'All Cities',
  'Islamabad',
  'Lahore',
  'Karachi',
  'Rawalpindi',
  'Faisalabad',
  'Multan',
  'Peshawar',
  'Quetta',
  'Sialkot',
  'Gujranwala',
  'Hyderabad',
  'Abbottabad',
  'Bahawalpur',
  'Murree',
];

const PROPERTY_TYPES: Record<string, string[]> = {
  Buy:            ['Homes', 'Apartments', 'Residential Plots', 'Villas', 'Farmhouses', 'Commercial'],
  Rent:           ['Homes', 'Apartments', 'Rooms', 'Office Space', 'Shops', 'Warehouses'],
  'New Projects': ['Residential Projects', 'Commercial Projects', 'Housing Societies', 'DHA Phases', 'Bahria Town'],
  Invest:         ['Residential Plots', 'Commercial Units', 'Apartments', 'Shops', 'Offices'],
  Commercial:     ['Offices', 'Shops', 'Showrooms', 'Warehouses', 'Factories', 'Buildings'],
};

const AREA_OPTIONS = [
  'Area (Marla)',
  'Under 3 Marla',
  '3 Marla',
  '5 Marla',
  '7 Marla',
  '10 Marla',
  '1 Kanal',
  '2 Kanal',
  '4 Kanal+',
];

const BED_OPTIONS = ['Beds', 'Studio', '1', '2', '3', '4', '5', '6+'];

const PRICE_OPTIONS = [
  { label: 'Price (PKR)', value: '' },
  { label: 'Under 30 Lac',        value: 'u30' },
  { label: '30 - 60 Lac',         value: '30-60' },
  { label: '60 Lac - 1 Crore',    value: '60-100' },
  { label: '1 - 2 Crore',         value: '100-200' },
  { label: '2 - 5 Crore',         value: '200-500' },
  { label: '5 - 10 Crore',        value: '500-1000' },
  { label: '10 - 20 Crore',       value: '1000-2000' },
  { label: '20 Crore+',           value: '2000p' },
];

const SELECT_CLS =
  'w-full h-11 px-3 pr-8 text-sm text-[#374151] bg-[#F9FAFB] border border-[#E5E7EB] ' +
  'rounded-xl appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#1E3A5F]/50 ' +
  'dark:bg-[#1E2D42] dark:text-[#E5E7EB] dark:border-[#374151] transition-colors hover:border-[#1E3A5F]/40';

const HeroPKSearch: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Buy');
  const [city, setCity]           = useState('All Cities');
  const [query, setQuery]         = useState('');
  const [propType, setPropType]   = useState('');
  const [area, setArea]           = useState('');
  const [beds, setBeds]           = useState('');
  const [price, setPrice]         = useState('');

  const currentTypes = PROPERTY_TYPES[activeTab] ?? PROPERTY_TYPES.Buy;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    const loc = query.trim() || (city !== 'All Cities' ? city : '');
    if (loc) params.append('location', loc);
    if (propType) {
      const typeMap: Record<string, string> = {
        'Homes': 'House', 'Apartments': 'Apartment', 'Villas': 'Villa',
        'Farmhouses': 'Villa', 'Residential Plots': 'House',
      };
      params.append('type', typeMap[propType] ?? 'House');
    }
    navigate(`/listings?${params.toString()}`);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Tab Row */}
      <div className="flex items-end gap-0.5 overflow-x-auto pb-0">
        {TABS.map((tab) => {
          const isActive = tab === activeTab;
          return (
            <button
              key={tab}
              type="button"
              onClick={() => { setActiveTab(tab); setPropType(''); }}
              className={`
                px-4 sm:px-6 py-2.5 text-xs sm:text-sm font-semibold whitespace-nowrap
                rounded-t-xl transition-all duration-200 flex-shrink-0
                ${isActive
                  ? 'bg-white dark:bg-[#162436] text-[#1E3A5F] dark:text-white shadow-md relative z-10'
                  : 'bg-white/25 text-white hover:bg-white/35 backdrop-blur-sm'}
              `}
            >
              {tab}
            </button>
          );
        })}
      </div>

      {/* Search Card */}
      <form
        onSubmit={handleSearch}
        className="bg-white dark:bg-[#162436] rounded-b-2xl rounded-tr-2xl shadow-2xl overflow-hidden border border-white/10"
      >
        <div className="p-4 sm:p-5">
          {/* Row 1: City | Location text | Property type */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
            {/* City dropdown */}
            <div className="relative">
              <select
                id="pk-city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className={SELECT_CLS + ' pl-9'}
                aria-label="Select city"
              >
                {CITIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              <MapPin className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1E3A5F] dark:text-[#CFC8BE] pointer-events-none" />
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#9CA3AF] pointer-events-none" />
            </div>

            {/* Free-text location */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF] pointer-events-none" />
              <input
                id="pk-location"
                type="text"
                placeholder="Search location, area, or project..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className={
                  'w-full h-11 pl-9 pr-4 text-sm text-[#374151] bg-[#F9FAFB] border border-[#E5E7EB] ' +
                  'rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1E3A5F]/50 placeholder:text-[#9CA3AF] ' +
                  'dark:bg-[#1E2D42] dark:text-[#E5E7EB] dark:border-[#374151] dark:placeholder:text-[#6B7280] transition-colors'
                }
                aria-label="Search location"
              />
            </div>

            {/* Property type */}
            <div className="relative">
              <select
                id="pk-type"
                value={propType}
                onChange={(e) => setPropType(e.target.value)}
                className={SELECT_CLS}
                aria-label="Property type"
              >
                <option value="">All Types</option>
                {currentTypes.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#9CA3AF] pointer-events-none" />
            </div>
          </div>

          {/* Row 2: Area | Beds | Price | Search button */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="relative">
              <select
                id="pk-area"
                value={area}
                onChange={(e) => setArea(e.target.value)}
                className={SELECT_CLS}
                aria-label="Area size"
              >
                {AREA_OPTIONS.map((o) => (
                  <option key={o} value={o}>{o}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#9CA3AF] pointer-events-none" />
            </div>

            <div className="relative">
              <select
                id="pk-beds"
                value={beds}
                onChange={(e) => setBeds(e.target.value)}
                className={SELECT_CLS}
                aria-label="Bedrooms"
              >
                {BED_OPTIONS.map((o) => (
                  <option key={o} value={o}>{o}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#9CA3AF] pointer-events-none" />
            </div>

            <div className="relative">
              <select
                id="pk-price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className={SELECT_CLS}
                aria-label="Price range"
              >
                {PRICE_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#9CA3AF] pointer-events-none" />
            </div>

            <Button
              id="pk-search-btn"
              type="submit"
              className="h-11 w-full bg-[#1E3A5F] hover:bg-[#162C49] active:bg-[#0E1A2C] text-white font-bold rounded-xl text-sm shadow-md transition-all"
            >
              <Search className="w-4 h-4 mr-1.5" />
              Search
            </Button>
          </div>
        </div>

        {/* Promo Banner */}
        <div className="px-5 py-2.5 bg-[#162C49] dark:bg-[#0E1A2C] flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="text-[9px] font-black text-[#1E3A5F] bg-[#CFC8BE] px-1.5 py-0.5 rounded flex-shrink-0 uppercase tracking-wider">
              NEW
            </span>
            <p className="text-xs text-white/90 font-medium truncate">
              Premium Plots with Flexible Installment Plans &mdash;&nbsp;
              <span className="text-[#CFC8BE] font-semibold">Explore Now &rarr;</span>
            </p>
          </div>
          <Zap className="w-4 h-4 text-[#CFC8BE] flex-shrink-0" />
        </div>
      </form>
    </div>
  );
};

export default HeroPKSearch;
