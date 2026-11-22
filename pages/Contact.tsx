import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import ContactAgentForm from '@/components/ContactAgentForm';
import { allAgents, portfolioStats } from '@/data/properties';

const Contact: React.FC = () => {
  const [selectedAgentIndex, setSelectedAgentIndex] = useState<number>(0);
  const activeAgent = allAgents[selectedAgentIndex] || allAgents[0];

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Global Headquarters',
      details: ['Madison Avenue & 57th St', 'New York, NY 10022'],
    },
    {
      icon: Phone,
      title: 'Direct Advisory Line',
      details: ['+1 (555) 123-4567', 'Toll Free: 1-800-NLP-REAL'],
    },
    {
      icon: Mail,
      title: 'Official Inquiries',
      details: ['advisory@nlp-real-estate.com', 'concierge@nlp-real-estate.com'],
    },
    {
      icon: Clock,
      title: 'Advisory Hours',
      details: ['Mon – Fri: 8:00 AM – 8:00 PM EST', 'Sat – Sun: 10:00 AM – 5:00 PM EST'],
    },
  ];

  return (
    <div className="min-h-screen bg-[#F9FAFB] dark:bg-[#0E1A2C] pt-6 pb-16">
      {/* Hero Header */}
      <section className="bg-[#1E3A5F] py-14 lg:py-18 text-white border-b border-[#CFC8BE]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs uppercase font-bold tracking-widest text-[#CFC8BE] block mb-2">
            Personal Concierge & Advisors
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4">
            Connect With Our Real Estate Specialists
          </h1>
          <p className="text-sm sm:text-base text-[#E5E7EB]/90 max-w-2xl mx-auto leading-relaxed">
            Direct access to {portfolioStats.agentsCount} certified advisors representing exclusive residential properties across 4 continents.
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
            {contactInfo.map((item, index) => (
              <Card key={index} className="border border-[#E5E7EB] dark:border-[#374151] bg-white dark:bg-[#162436] shadow-sm rounded-2xl">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 rounded-xl bg-[#F0F4F8] dark:bg-[#1E3A5F]/40 flex items-center justify-center mx-auto mb-3.5 text-[#1E3A5F] dark:text-[#CFC8BE]">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold text-[#1E3A5F] dark:text-white mb-1.5">
                    {item.title}
                  </h3>
                  {item.details.map((detail, i) => (
                    <p key={i} className="text-xs text-[#6B7280] dark:text-[#9CA3AF]">
                      {detail}
                    </p>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Interactive Advisor Selector & Form */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Advisor Selector Column */}
            <div className="lg:col-span-5 space-y-4">
              <div>
                <h2 className="text-xl font-bold text-[#1E3A5F] dark:text-white mb-1">
                  Select Your Specialist ({allAgents.length})
                </h2>
                <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF]">
                  Choose an advisor below to dispatch an inquiry directly to their desk.
                </p>
              </div>

              <div className="space-y-2.5 max-h-[640px] overflow-y-auto pr-1">
                {allAgents.map((agent, index) => {
                  const isSelected = selectedAgentIndex === index;
                  return (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setSelectedAgentIndex(index)}
                      className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center gap-3.5 ${
                        isSelected
                          ? 'bg-[#1E3A5F] text-white border-[#1E3A5F] shadow-md dark:bg-[#CFC8BE] dark:text-[#1E3A5F]'
                          : 'bg-white dark:bg-[#162436] text-[#374151] dark:text-[#E5E7EB] border-[#E5E7EB] dark:border-[#374151] hover:border-[#1E3A5F]/40'
                      }`}
                    >
                      <img
                        src={agent.image}
                        alt={agent.name}
                        className={`w-11 h-11 rounded-full object-cover border-2 flex-shrink-0 ${
                          isSelected ? 'border-[#CFC8BE] dark:border-[#1E3A5F]' : 'border-[#E5E7EB]'
                        }`}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="font-bold text-xs sm:text-sm truncate">
                            {agent.name}
                          </p>
                          {isSelected && <CheckCircle2 className="w-4 h-4 text-[#CFC8BE] dark:text-[#1E3A5F] flex-shrink-0" />}
                        </div>
                        <p className={`text-[11px] truncate ${isSelected ? 'text-[#CFC8BE] dark:text-[#1E3A5F]/80 font-medium' : 'text-[#837868] dark:text-[#CFC8BE]'}`}>
                          {agent.propertyLocation}
                        </p>
                        <p className={`text-[10px] truncate ${isSelected ? 'text-white/80 dark:text-[#1E3A5F]/70' : 'text-[#9CA3AF]'}`}>
                          Listing: {agent.propertyTitle}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Direct Inquiry Form Column */}
            <div className="lg:col-span-7">
              <Card className="border border-[#E5E7EB] dark:border-[#374151] shadow-lg bg-white dark:bg-[#162436] rounded-2xl overflow-hidden">
                {/* Active Agent Banner */}
                <div className="bg-[#F0F4F8] dark:bg-[#1E3A5F]/30 p-5 border-b border-[#E5E7EB] dark:border-[#374151] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={activeAgent.image}
                      alt={activeAgent.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-[#CFC8BE]"
                    />
                    <div>
                      <p className="text-xs uppercase font-bold tracking-wider text-[#837868] dark:text-[#CFC8BE]">
                        Recipient Advisor
                      </p>
                      <p className="font-bold text-sm text-[#1E3A5F] dark:text-white">
                        {activeAgent.name}
                      </p>
                      <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF]">
                        {activeAgent.email} • {activeAgent.phone}
                      </p>
                    </div>
                  </div>
                  <div className="hidden sm:flex items-center gap-1.5 text-xs text-[#1E3A5F] dark:text-[#CFC8BE] font-semibold bg-white dark:bg-[#111827] px-3 py-1.5 rounded-lg border border-[#E5E7EB] dark:border-[#374151]">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Verified Mandate</span>
                  </div>
                </div>

                <CardContent className="p-6 sm:p-8">
                  <h3 className="text-lg font-bold text-[#1E3A5F] dark:text-white mb-1">
                    Send Direct Message
                  </h3>
                  <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF] mb-6">
                    Inquire regarding {activeAgent.propertyTitle} ({activeAgent.propertyLocation}) or general property acquisition.
                  </p>
                  <ContactAgentForm agent={activeAgent} propertyTitle={activeAgent.propertyTitle} />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
