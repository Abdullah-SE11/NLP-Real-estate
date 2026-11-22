import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { toast } from 'sonner';
import {
  Bed, Bath, Square, MapPin, Heart, Share2, Phone, Mail,
  ChevronLeft, ChevronRight, Check, Home, Car, Wind, Waves,
  Dumbbell, Shield, UtensilsCrossed, TreePine, Wine, Film, ArrowLeft
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { listingMarkets, propertiesData } from '@/data/properties';
import ContactAgentForm from '@/components/ContactAgentForm';
import { readSavedListings, writeSavedListings } from '@/lib/saved-listings';

const PropertyDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [savedIds, setSavedIds] = useState(readSavedListings);

  const property = propertiesData.properties.find((p) => p.id === parseInt(id || '0'));

  if (!property) {
    return (
      <div className="min-h-screen bg-[#F9FAFB] dark:bg-[#0E1A2C] flex items-center justify-center">
        <div className="text-center p-8 bg-white dark:bg-[#162436] rounded-2xl border border-[#E5E7EB] dark:border-[#374151] max-w-md mx-4">
          <h1 className="text-2xl font-bold text-[#1E3A5F] dark:text-white mb-2">
            Property Not Found
          </h1>
          <p className="text-sm text-[#6B7280] dark:text-[#9CA3AF] mb-6">
            The property listing you requested could not be located in our current portfolio.
          </p>
          <Button onClick={() => navigate('/listings')} className="bg-[#1E3A5F] text-white hover:bg-[#162C49]">
            Browse All Properties
          </Button>
        </div>
      </div>
    );
  }

  const market = listingMarkets[property.purpose ?? 'buy'];
  const isSaved = savedIds.includes(property.id);

  function toggleSaved(propertyId: number) {
    const ids = readSavedListings();
    const next = ids.includes(propertyId) ? ids.filter((id) => id !== propertyId) : [...ids, propertyId];
    try {
      writeSavedListings(next);
      setSavedIds(next);
    } catch {
      toast.error('Could not update saved listings on this device.');
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % property.gallery.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + property.gallery.length) % property.gallery.length);
  };

  const amenityIcons: Record<string, React.ElementType> = {
    'Swimming Pool': Waves,
    'Fitness Center': Dumbbell,
    '24/7 Security': Shield,
    'Parking': Car,
    'Elevator': ChevronLeft,
    'Air Conditioning': Wind,
    'Balcony': Home,
    'Pet Friendly': Heart,
    'Garden': TreePine,
    'Garage': Car,
    'Fireplace': Home,
    'Home Office': Home,
    'Wine Cellar': Wine,
    'Smart Home System': Home,
    'Gated Entry': Shield,
    'Private Beach': Waves,
    'Infinity Pool': Waves,
    'Outdoor Kitchen': UtensilsCrossed,
    'Home Theater': Film,
    'Spa': Heart,
    'Boat Dock': Waves,
    'Panoramic Views': Home,
    'Climate Control': Wind,
    'Private Pool': Waves,
    'Concierge': Heart,
    'Spa Access': Heart,
    'Private Cinema': Film,
    'Helipad': Home,
    'Valet Parking': Car,
    'Ski Access': TreePine,
    'Hot Tub': Waves,
    'Fire Pit': Home,
    'Mountain Views': Home,
    'Game Room': Home,
    'Heated Floors': Wind,
    'Snow Melt Driveway': Wind,
    'Exposed Brick': Home,
    'High Ceilings': Home,
    'Original Hardwood': Home,
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] dark:bg-[#0E1A2C] pt-2">
      {/* Top Breadcrumb Nav */}
      <div className="bg-white dark:bg-[#111827] border-b border-[#E5E7EB] dark:border-[#374151]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-[#837868] dark:text-[#CFC8BE]">
            <Link to="/" className="hover:underline">Home</Link>
            <span>/</span>
            <Link to={market.path} className="hover:underline">{market.label}</Link>
            <span>/</span>
            <span className="text-[#1E3A5F] dark:text-white font-semibold truncate max-w-[200px] sm:max-w-md">
              {property.title}
            </span>
          </div>
          <button
            onClick={() => navigate(market.path)}
            className="flex items-center gap-1 text-xs font-semibold text-[#1E3A5F] dark:text-[#CFC8BE] hover:underline"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Listings
          </button>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="relative h-[48vh] lg:h-[58vh] bg-[#162C49]">
        <img
          src={property.gallery[currentImageIndex]}
          alt={property.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#162C49]/60 via-transparent to-black/30 pointer-events-none" />

        {/* Navigation Arrows */}
        <button
          onClick={prevImage}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-[#1E3A5F]/80 hover:bg-[#1E3A5F] flex items-center justify-center text-white transition-colors border border-white/20"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextImage}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-[#1E3A5F]/80 hover:bg-[#1E3A5F] flex items-center justify-center text-white transition-colors border border-white/20"
          aria-label="Next image"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Image Counter Badge */}
        <div className="absolute bottom-4 right-4 bg-[#1E3A5F]/90 text-[#CFC8BE] px-3.5 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md border border-[#CFC8BE]/30">
          {currentImageIndex + 1} of {property.gallery.length} Photos
        </div>

        {/* Thumbnail Selector */}
        <div className="absolute bottom-4 left-4 flex gap-2">
          {property.gallery.map((img, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-14 h-10 rounded-lg overflow-hidden border-2 transition-all ${
                index === currentImageIndex
                  ? 'border-[#CFC8BE] scale-105'
                  : 'border-transparent opacity-60 hover:opacity-100'
              }`}
            >
              <img src={img} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header info */}
            <div>
              <div className="flex flex-wrap items-center gap-2.5 mb-3">
                <Badge className="bg-[#1E3A5F] text-white font-semibold">
                  {property.type}
                </Badge>
                {property.featured && (
                  <Badge className="bg-[#CFC8BE] text-[#1E3A5F] font-semibold">
                    Featured
                  </Badge>
                )}
                <span className="text-xs text-[#837868] dark:text-[#CFC8BE] ml-2 font-medium">
                  Listing Ref: #{property.id.toString().padStart(5, '0')}
                </span>
                <Button type="button" variant="outline" aria-label="Save property" aria-pressed={isSaved} onClick={() => toggleSaved(property.id)}>
                  <Heart aria-hidden="true" fill={isSaved ? 'currentColor' : 'none'} /> {isSaved ? 'Saved' : 'Save property'}
                </Button>
              </div>
              <h1 className="text-3xl lg:text-4xl font-extrabold text-[#1E3A5F] dark:text-white mb-2 tracking-tight">
                {property.title}
              </h1>
              <div className="flex items-center gap-2 text-sm text-[#374151] dark:text-[#CFC8BE]">
                <MapPin className="w-4 h-4 text-[#1E3A5F] dark:text-[#CFC8BE]" />
                <span className="font-medium">{property.location}</span>
              </div>
            </div>

            {/* Key Spec Cards */}
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-white dark:bg-[#162436] border border-[#E5E7EB] dark:border-[#374151] flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#F0F4F8] dark:bg-[#1E3A5F]/40 flex items-center justify-center text-[#1E3A5F] dark:text-[#CFC8BE]">
                  <Bed className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xl font-bold text-[#1E3A5F] dark:text-white leading-none">
                    {property.bedrooms}
                  </p>
                  <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF] mt-1">Bedrooms</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white dark:bg-[#162436] border border-[#E5E7EB] dark:border-[#374151] flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#FAF9F8] dark:bg-[#CFC8BE]/20 flex items-center justify-center text-[#1E3A5F] dark:text-[#CFC8BE]">
                  <Bath className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xl font-bold text-[#1E3A5F] dark:text-white leading-none">
                    {property.bathrooms}
                  </p>
                  <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF] mt-1">Bathrooms</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white dark:bg-[#162436] border border-[#E5E7EB] dark:border-[#374151] flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#F3F4F6] dark:bg-[#374151]/40 flex items-center justify-center text-[#1E3A5F] dark:text-[#CFC8BE]">
                  <Square className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xl font-bold text-[#1E3A5F] dark:text-white leading-none">
                    {property.area.toLocaleString()}
                  </p>
                  <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF] mt-1">Square Feet</p>
                </div>
              </div>
            </div>

            <Separator className="bg-[#E5E7EB] dark:bg-[#374151]" />

            {/* Description */}
            <div>
              <h2 className="text-xl font-bold text-[#1E3A5F] dark:text-white mb-3">
                Property Overview
              </h2>
              <p className="text-sm text-[#374151] dark:text-[#E5E7EB] leading-relaxed">
                {property.description}
              </p>
            </div>

            <Separator className="bg-[#E5E7EB] dark:bg-[#374151]" />

            {/* Amenities Grid */}
            <div>
              <h2 className="text-xl font-bold text-[#1E3A5F] dark:text-white mb-4">
                Exclusive Amenities & Features
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {property.amenities.map((amenity) => {
                  const Icon = amenityIcons[amenity] || Check;
                  return (
                    <div
                      key={amenity}
                      className="flex items-center gap-2.5 p-3 rounded-xl bg-white dark:bg-[#162436] border border-[#E5E7EB] dark:border-[#374151]"
                    >
                      <div className="w-7 h-7 rounded-lg bg-[#F0F4F8] dark:bg-[#1E3A5F]/30 flex items-center justify-center text-[#1E3A5F] dark:text-[#CFC8BE] flex-shrink-0">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-semibold text-[#374151] dark:text-[#E5E7EB]">
                        {amenity}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <Separator className="bg-[#E5E7EB] dark:bg-[#374151]" />

            {/* Location Map */}
            <div>
              <h2 className="text-xl font-bold text-[#1E3A5F] dark:text-white mb-3">
                Neighborhood & Surroundings
              </h2>
              <div className="aspect-video rounded-2xl overflow-hidden bg-[#E5E7EB] dark:bg-[#162436] border border-[#E5E7EB] dark:border-[#374151]">
                <iframe
                  title="Property Location"
                  src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387193.30591910525!2d-74.25986652089301!3d40.69714941680757!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2s${encodeURIComponent(property.location)}!5e0!3m2!1sen!2sus!4v1704067200000!5m2!1sen!2sus`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 space-y-6">
              {/* Pricing & Inquiry Card */}
              <Card className="border border-[#E5E7EB] dark:border-[#374151] shadow-md bg-white dark:bg-[#162436] rounded-2xl overflow-hidden">
                <div className="bg-[#1E3A5F] p-6 text-white text-center">
                  <p className="text-xs uppercase tracking-wider text-[#CFC8BE] font-semibold mb-1">
                    {property.purpose === 'rent' ? 'Monthly rent' : 'Offered price'}
                  </p>
                  <p className="text-3xl font-extrabold tracking-tight">
                    {formatPrice(property.price)}
                  </p>
                  <p className="text-xs text-[#CFC8BE] mt-1">
                    {property.demo ? 'Sample listing' : property.type}
                  </p>
                </div>

                {property.demo ? (
                  <CardContent className="p-6 text-sm">Price and availability are illustrative.</CardContent>
                ) : <CardContent className="p-6">
                  {/* Agent Info */}
                  <div className="flex items-center gap-3.5 mb-6 p-3.5 rounded-xl bg-[#F9FAFB] dark:bg-[#1E3A5F]/20 border border-[#E5E7EB] dark:border-[#374151]">
                    <img
                      src={property.agent.image}
                      alt={property.agent.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-[#CFC8BE]"
                    />
                    <div className="min-w-0">
                      <p className="font-bold text-sm text-[#1E3A5F] dark:text-white truncate">
                        {property.agent.name}
                      </p>
                      <p className="text-xs text-[#837868] dark:text-[#CFC8BE] font-medium truncate">
                        Certified Estate Advisor
                      </p>
                      <p className="text-[11px] text-[#6B7280] dark:text-[#9CA3AF] truncate">
                        {property.agent.email}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="space-y-3">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="w-full bg-[#1E3A5F] hover:bg-[#162C49] text-white font-semibold">
                          <Mail className="w-4 h-4 mr-2" />
                          Send Inquiry to {property.agent.name}
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-md bg-white dark:bg-[#111827]">
                        <DialogHeader>
                          <DialogTitle className="text-[#1E3A5F] dark:text-white">
                            Contact {property.agent.name}
                          </DialogTitle>
                        </DialogHeader>
                        <ContactAgentForm agent={property.agent} propertyTitle={property.title} />
                      </DialogContent>
                    </Dialog>

                    <a href={`tel:${property.agent.phone}`} className="block w-full">
                      <Button variant="outline" className="w-full border-[#E5E7EB] dark:border-[#374151] text-[#1E3A5F] dark:text-[#CFC8BE]">
                        <Phone className="w-4 h-4 mr-2" />
                        {property.agent.phone}
                      </Button>
                    </a>
                  </div>
                </CardContent>}
              </Card>

              {/* Quick Summary Card */}
              <Card className="border border-[#E5E7EB] dark:border-[#374151] shadow-sm bg-white dark:bg-[#162436] rounded-2xl">
                <CardContent className="p-5">
                  <h3 className="font-bold text-xs uppercase tracking-wider text-[#1E3A5F] dark:text-[#CFC8BE] mb-4">
                    Listing Summary
                  </h3>
                  <div className="space-y-2.5 text-xs">
                    <div className="flex justify-between py-1 border-b border-[#E5E7EB] dark:border-[#374151]/50">
                      <span className="text-[#6B7280] dark:text-[#9CA3AF]">Identifier</span>
                      <span className="font-semibold text-[#1E3A5F] dark:text-white">#{property.id.toString().padStart(5, '0')}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-[#E5E7EB] dark:border-[#374151]/50">
                      <span className="text-[#6B7280] dark:text-[#9CA3AF]">Category</span>
                      <span className="font-semibold text-[#1E3A5F] dark:text-white">{property.type}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-[#E5E7EB] dark:border-[#374151]/50">
                      <span className="text-[#6B7280] dark:text-[#9CA3AF]">Bedrooms</span>
                      <span className="font-semibold text-[#1E3A5F] dark:text-white">{property.bedrooms}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-[#E5E7EB] dark:border-[#374151]/50">
                      <span className="text-[#6B7280] dark:text-[#9CA3AF]">Bathrooms</span>
                      <span className="font-semibold text-[#1E3A5F] dark:text-white">{property.bathrooms}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-[#E5E7EB] dark:border-[#374151]/50">
                      <span className="text-[#6B7280] dark:text-[#9CA3AF]">Interior Area</span>
                      <span className="font-semibold text-[#1E3A5F] dark:text-white">{property.area} sq ft</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-[#6B7280] dark:text-[#9CA3AF]">Location</span>
                      <span className="font-semibold text-[#1E3A5F] dark:text-white text-right">{property.location}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
