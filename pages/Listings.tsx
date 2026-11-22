import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Filter, Grid3X3, List, SlidersHorizontal, X, Bed, Bath, Square, MapPin, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Slider } from '@/components/ui/slider';
import PropertyCard from '@/components/PropertyCard';
import { listingsFor, listingMarkets, allLocations, allPropertyTypes } from '@/data/properties';
import type { ListingPurpose, SortOption } from '@/types';

const Listings: React.FC<{ purpose?: ListingPurpose }> = ({ purpose = 'buy' }) => {
  const market = listingMarkets[purpose];
  const inventory = useMemo(() => listingsFor(purpose), [purpose]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Filter states
  const [locationFilter, setLocationFilter] = useState(searchParams.get('location') || '');
  const [typeFilter, setTypeFilter] = useState(searchParams.get('type') || 'all');
  const [minBedrooms, setMinBedrooms] = useState<number>(parseInt(searchParams.get('bedrooms') || '0'));
  const [priceRange, setPriceRange] = useState<[number, number]>([
    parseInt(searchParams.get('minPrice') || String(market.min)),
    parseInt(searchParams.get('maxPrice') || String(market.max)),
  ]);
  const [sortOption, setSortOption] = useState<SortOption>('newest');

  // Update filters from URL params on change
  useEffect(() => {
    const loc = searchParams.get('location') || '';
    const type = searchParams.get('type') || 'all';
    const minP = parseInt(searchParams.get('minPrice') || String(market.min));
    const maxP = parseInt(searchParams.get('maxPrice') || String(market.max));
    const beds = parseInt(searchParams.get('bedrooms') || '0');

    setLocationFilter(loc);
    setTypeFilter(type);
    setPriceRange([minP, maxP]);
    setMinBedrooms(beds);
  }, [searchParams, market]);

  // Filter and sort properties
  const filteredProperties = useMemo(() => {
    let result = [...inventory];

    // Filter by location
    if (locationFilter) {
      const q = locationFilter.toLowerCase();
      result = result.filter((p) =>
        p.location.toLowerCase().includes(q) || p.title.toLowerCase().includes(q)
      );
    }

    // Filter by type
    if (typeFilter && typeFilter !== 'all') {
      result = result.filter((p) => p.type === typeFilter);
    }

    // Filter by price
    result = result.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    // Filter by bedrooms
    if (minBedrooms > 0) {
      result = result.filter((p) => p.bedrooms >= minBedrooms);
    }

    // Sort
    switch (sortOption) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'area-desc':
        result.sort((a, b) => b.area - a.area);
        break;
      case 'bedrooms-desc':
        result.sort((a, b) => b.bedrooms - a.bedrooms);
        break;
      case 'newest':
      default:
        result.sort((a, b) => b.id - a.id);
    }

    return result;
  }, [inventory, locationFilter, typeFilter, priceRange, minBedrooms, sortOption]);

  const clearFilters = () => {
    setLocationFilter('');
    setTypeFilter('all');
    setMinBedrooms(0);
    setPriceRange([market.min, market.max]);
    setSearchParams({});
  };

  const applyFilters = () => {
    const params = new URLSearchParams();
    if (locationFilter) params.append('location', locationFilter);
    if (typeFilter !== 'all') params.append('type', typeFilter);
    if (priceRange[0] > market.min) params.append('minPrice', priceRange[0].toString());
    if (priceRange[1] < market.max) params.append('maxPrice', priceRange[1].toString());
    if (minBedrooms > 0) params.append('bedrooms', minBedrooms.toString());
    setSearchParams(params);
    setIsFilterOpen(false);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price);
  };

  // Shared Filter Controls Component
  const renderFilterControls = () => (
    <div className="space-y-6">
      {/* Location Filter */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-[#126553] dark:text-[#a7e5d2] mb-2">
          Location
        </label>
        <Input
          type="text"
          list="filter-locations"
          placeholder="Filter by city (e.g. New York, Tokyo)"
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
          className="bg-[#f7f9f7] dark:bg-[#1b2925] border-[#dde4df] dark:border-[#30413b] rounded-xl text-sm"
        />
        <datalist id="filter-locations">
          {allLocations.map((loc) => (
            <option key={loc} value={loc} />
          ))}
        </datalist>
      </div>

      {/* Property Type Filter */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-[#126553] dark:text-[#a7e5d2] mb-2">
          Property Type
        </label>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="bg-[#f7f9f7] dark:bg-[#1b2925] border-[#dde4df] dark:border-[#30413b] rounded-xl text-sm">
            <SelectValue placeholder="All Types" />
          </SelectTrigger>
          <SelectContent className="bg-white dark:bg-[#1b2925] border-[#dde4df] dark:border-[#30413b]">
            <SelectItem value="all">All Types ({inventory.length})</SelectItem>
            {allPropertyTypes.map((type) => (
              <SelectItem key={type} value={type}>
                {type} ({inventory.filter((p) => p.type === type).length})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Bedrooms Filter */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-[#126553] dark:text-[#a7e5d2] mb-2">
          Minimum Bedrooms
        </label>
        <div className="grid grid-cols-5 gap-1.5">
          {[0, 1, 2, 3, 4].map((num) => (
            <button
              key={num}
              type="button"
              onClick={() => setMinBedrooms(num)}
              className={`py-2 text-xs font-bold rounded-lg border transition-all ${
                minBedrooms === num
                  ? 'bg-[#126553] text-white border-[#126553] dark:bg-[#a7e5d2] dark:text-[#126553]'
                  : 'bg-[#f7f9f7] dark:bg-[#1b2925] text-[#30413b] dark:text-[#dde4df] border-[#dde4df] dark:border-[#30413b] hover:border-[#126553]'
              }`}
            >
              {num === 0 ? 'Any' : `${num}+`}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range Filter */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-bold uppercase tracking-wider text-[#126553] dark:text-[#a7e5d2]">
            Price Range
          </label>
          <span className="text-xs font-medium text-[#6B7280] dark:text-[#9CA3AF]">
            {formatPrice(priceRange[0])} – {formatPrice(priceRange[1])}
          </span>
        </div>
        <Slider
          value={priceRange}
          onValueChange={(val) => setPriceRange(val as [number, number])}
          min={market.min}
          max={market.max}
          step={market.step}
          className="my-4"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2.5 pt-2">
        <Button
          onClick={applyFilters}
          className="flex-1 bg-[#126553] text-white hover:bg-[#0b5141] dark:bg-[#a7e5d2] dark:text-[#126553] font-semibold"
        >
          Apply Filters
        </Button>
        <Button
          variant="outline"
          onClick={clearFilters}
          className="border-[#dde4df] dark:border-[#30413b] text-[#30413b] dark:text-[#dde4df]"
        >
          Reset
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f7f8f5] dark:bg-[#101a18] pt-2 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header Breadcrumb & Title */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs text-[#4c625b] dark:text-[#a7e5d2] mb-2 font-medium">
            <Link to="/" className="hover:underline">Home</Link>
            <span>/</span>
            <span className="text-[#126553] dark:text-white font-semibold">Properties</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-extrabold text-[#182c28] dark:text-white tracking-tight">
                {market.title}
              </h1>
              <p className="text-sm text-[#6B7280] dark:text-[#9CA3AF] mt-1">
                Showing {filteredProperties.length} of {inventory.length} listings
              </p>
            </div>

            {/* Sort & View Mode Controls */}
            <div className="flex items-center gap-3">
              {/* Sort Dropdown */}
              <Select value={sortOption} onValueChange={(val) => setSortOption(val as SortOption)}>
                <SelectTrigger className="w-[155px] sm:w-[190px] h-10 bg-white dark:bg-[#1b2925] border-[#dde4df] dark:border-[#30413b] text-xs font-semibold text-[#126553] dark:text-[#dde4df] rounded-xl">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-[#1b2925] border-[#dde4df] dark:border-[#30413b] text-xs">
                  <SelectItem value="newest">Featured / Newest</SelectItem>
                  <SelectItem value="price-asc">Price: Low to High</SelectItem>
                  <SelectItem value="price-desc">Price: High to Low</SelectItem>
                  <SelectItem value="area-desc">Area: Largest First</SelectItem>
                  <SelectItem value="bedrooms-desc">Bedrooms: Most First</SelectItem>
                </SelectContent>
              </Select>

              {/* View Toggle */}
              <div className="hidden sm:flex items-center bg-white dark:bg-[#1b2925] p-1 rounded-xl border border-[#dde4df] dark:border-[#30413b]">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-lg transition-colors ${
                    viewMode === 'grid'
                      ? 'bg-[#126553] text-white dark:bg-[#a7e5d2] dark:text-[#126553]'
                      : 'text-[#6B7280] hover:text-[#126553]'
                  }`}
                  aria-label="Grid view"
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded-lg transition-colors ${
                    viewMode === 'list'
                      ? 'bg-[#126553] text-white dark:bg-[#a7e5d2] dark:text-[#126553]'
                      : 'text-[#6B7280] hover:text-[#126553]'
                  }`}
                  aria-label="List view"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>

              {/* Mobile Filter Trigger */}
              <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="lg:hidden border-[#dde4df] dark:border-[#30413b] text-[#126553] dark:text-[#a7e5d2] rounded-xl"
                  >
                    <SlidersHorizontal className="w-4 h-4 mr-2" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" aria-describedby={undefined} className="w-[310px] bg-white dark:bg-[#15211e] border-r border-[#dde4df] dark:border-[#30413b] overflow-y-auto">
                  <SheetHeader className="mb-6">
                    <SheetTitle className="text-lg font-bold text-[#126553] dark:text-white">
                      Filter Listings
                    </SheetTitle>
                  </SheetHeader>
                  {renderFilterControls()}
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>

        {/* Main Grid Layout: Sidebar + Listings */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Desktop Filter Sidebar */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="bg-white dark:bg-[#1b2925] p-6 rounded-2xl border border-[#dde4df] dark:border-[#30413b]/70 shadow-sm sticky top-28">
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-[#dde4df] dark:border-[#30413b]">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-[#126553] dark:text-[#a7e5d2]" />
                  <h3 className="font-bold text-sm text-[#126553] dark:text-white">
                    Refine Results
                  </h3>
                </div>
                {(locationFilter || typeFilter !== 'all' || minBedrooms > 0) && (
                  <button
                    onClick={clearFilters}
                    className="text-xs text-[#4c625b] hover:text-[#126553] dark:text-[#a7e5d2] underline"
                  >
                    Clear All
                  </button>
                )}
              </div>
              {renderFilterControls()}
            </div>
          </div>

          {/* Listings Content */}
          <div className="lg:col-span-3">
            {filteredProperties.length === 0 ? (
              <div className="bg-white dark:bg-[#1b2925] rounded-2xl p-6 sm:p-12 text-center border border-[#dde4df] dark:border-[#30413b]">
                <div className="w-16 h-16 rounded-full bg-[#dde4df] dark:bg-[#126553]/40 flex items-center justify-center mx-auto mb-4 text-[#126553] dark:text-[#a7e5d2]">
                  <X className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-[#126553] dark:text-white mb-2">
                  No Properties Match Your Search
                </h3>
                <p className="text-sm text-[#6B7280] dark:text-[#9CA3AF] max-w-md mx-auto mb-6">
                  Try widening your budget, resetting filters, or selecting "All Types" to view available properties.
                </p>
                <Button onClick={clearFilters} className="bg-[#126553] text-white hover:bg-[#0b5141]">
                  Reset All Filters
                </Button>
              </div>
            ) : viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProperties.map((property) => (
                  <PropertyCard key={property.id} property={property} featured={property.featured} />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredProperties.map((property) => (
                  <div
                    key={property.id}
                    className="bg-white dark:bg-[#1b2925] rounded-2xl border border-[#dde4df] dark:border-[#30413b] p-4 flex flex-col sm:flex-row gap-5 hover:shadow-lg transition-all"
                  >
                    <div className="sm:w-64 h-48 sm:h-auto rounded-xl overflow-hidden bg-[#dde4df] flex-shrink-0 relative">
                      <img
                        src={property.image}
                        alt={property.title}
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded text-xs font-bold bg-[#126553] text-white">
                        {property.demo ? 'Sample listing' : property.type}
                      </span>
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <h3 className="text-lg font-bold text-[#126553] dark:text-white">
                            {property.title}
                          </h3>
                          <span className="text-xl font-extrabold text-[#126553] dark:text-[#a7e5d2]">
                            {formatPrice(property.price)}{purpose === 'rent' && '/mo'}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-[#6B7280] dark:text-[#9CA3AF] mb-3">
                          <MapPin className="w-3.5 h-3.5 text-[#126553] dark:text-[#a7e5d2]" />
                          <span>{property.location}</span>
                        </div>
                        <p className="text-xs text-[#30413b] dark:text-[#dde4df] line-clamp-2 mb-4 leading-relaxed">
                          {property.description}
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-[#dde4df] dark:border-[#30413b]/50">
                        <div className="flex items-center gap-4 text-xs font-semibold text-[#126553] dark:text-[#a7e5d2]">
                          <span className="flex items-center gap-1"><Bed className="w-3.5 h-3.5" /> {property.bedrooms} Beds</span>
                          <span className="flex items-center gap-1"><Bath className="w-3.5 h-3.5" /> {property.bathrooms} Baths</span>
                          <span className="flex items-center gap-1"><Square className="w-3.5 h-3.5" /> {property.area} sqft</span>
                        </div>
                        <Link to={`/property/${property.id}`}>
                          <Button size="sm" className="bg-[#126553] text-white hover:bg-[#0b5141]">
                            Details <ArrowRight className="w-3.5 h-3.5 ml-1" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Listings;
