import { ArrowUpRight, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { allAgents } from '@/data/properties';

export default function Agents() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-8">
      <h1 className="text-4xl font-extrabold tracking-tight">Property agents</h1>
      <p className="mt-2 text-muted-foreground">Browse agents by the properties they represent.</p>
      <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {allAgents.map((agent) => (
          <article key={agent.propertyId} className="rounded-xl border bg-card p-5">
            <div className="flex items-center gap-3">
              <img src={agent.image} alt="" width={48} height={48} className="size-12 rounded-full object-cover" loading="lazy" />
              <div>
                <h2 className="font-extrabold">{agent.name}</h2>
                <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin size={14} className="shrink-0" aria-hidden="true" /> {agent.propertyLocation}
                </p>
              </div>
            </div>
            <Link to={`/property/${agent.propertyId}`} className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:underline">
              {agent.propertyTitle} <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
