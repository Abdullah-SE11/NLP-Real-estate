import { Link } from 'react-router-dom';
import { ArrowUp, Bookmark, Building2, Calculator, Facebook, HousePlus, Instagram, Linkedin, Mail, MapPin, MessageSquare, Twitter } from 'lucide-react';
import logoLight from '../assets/images/logo-light.png';

const companyLinks = [
  { label: 'Home', to: '/' },
  { label: 'Properties for sale', to: '/listings' },
  { label: 'Properties for rent', to: '/rent' },
  { label: 'New projects', to: '/projects' },
];

const connectLinks = [
  { label: 'Real estate agents', to: '/agents' },
  { label: 'Property tools', to: '/tools' },
  { label: 'Saved properties', to: '/saved' },
  { label: 'Add property', to: '/add-property' },
];

const shortcuts = [
  { label: 'Browse projects', to: '/projects', icon: Building2 },
  { label: 'Open property tools', to: '/tools', icon: Calculator },
  { label: 'Open saved properties', to: '/saved', icon: Bookmark },
];

function TikTokIcon({ size = 18 }: { size?: number }) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24">
      <path fill="#25f4ee" transform="translate(-0.7 0.6)" d="M14 2h3a5 5 0 0 0 5 5v3a8 8 0 0 1-5-1.8V16a6 6 0 1 1-6-6h1v3h-1a3 3 0 1 0 3 3z" />
      <path fill="#fe2c55" transform="translate(0.7 0.6)" d="M14 2h3a5 5 0 0 0 5 5v3a8 8 0 0 1-5-1.8V16a6 6 0 1 1-6-6h1v3h-1a3 3 0 1 0 3 3z" />
      <path fill="currentColor" d="M14 2h3a5 5 0 0 0 5 5v3a8 8 0 0 1-5-1.8V16a6 6 0 1 1-6-6h1v3h-1a3 3 0 1 0 3 3z" />
    </svg>
  );
}

const socialLinks = [
  { label: 'Facebook', icon: Facebook, href: 'https://www.facebook.com/sharer/sharer.php?u=', color: 'bg-[#1877f2]', share: true },
  { label: 'Instagram', icon: Instagram, href: 'https://www.instagram.com/', color: 'bg-gradient-to-tr from-[#feda75] via-[#d62976] to-[#7135ca]', share: false },
  { label: 'TikTok', icon: TikTokIcon, href: 'https://www.tiktok.com/', color: 'bg-[#090909]', share: false },
  { label: 'X (Twitter)', icon: Twitter, href: 'https://twitter.com/intent/tweet?url=', color: 'bg-[#007eac]', share: true },
  { label: 'LinkedIn', icon: Linkedin, href: 'https://www.linkedin.com/sharing/share-offsite/?url=', color: 'bg-[#0a66c2]', share: true },
];

const heading = 'mb-4 text-lg font-extrabold tracking-tight text-white sm:mb-5';
const link = 'rounded-sm text-sm text-[#c9d2ce] underline-offset-4 hover:text-white hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8dd8c0]';

export default function Footer() {
  const homeUrl = encodeURIComponent(new URL('/', window.location.origin).href);

  return (
    <footer className="bg-[#1c2522] text-[#c9d2ce]">
      <div className="mx-auto max-w-[90rem] px-4 pt-10 sm:px-8 sm:pt-14">
        <div className="grid gap-x-8 gap-y-9 sm:grid-cols-2 lg:grid-cols-[0.85fr_0.9fr_1.15fr_1fr]">
          <nav aria-labelledby="footer-company">
            <h2 id="footer-company" className={heading}>Company</h2>
            <ul className="space-y-3">
              {companyLinks.map(({ label, to }) => <li key={to}><Link className={link} to={to}>{label}</Link></li>)}
            </ul>
          </nav>

          <nav aria-labelledby="footer-connect">
            <h2 id="footer-connect" className={heading}>Connect</h2>
            <ul className="space-y-3">
              {connectLinks.map(({ label, to }) => <li key={to}><Link className={link} to={to}>{label}</Link></li>)}
            </ul>
          </nav>

          <section aria-labelledby="footer-office">
            <h2 id="footer-office" className={heading}>Head office</h2>
            <ul className="space-y-3.5 text-sm">
              <li className="flex items-start gap-3 leading-relaxed">
                <MapPin size={17} className="mt-0.5 shrink-0 text-[#8dd8c0]" aria-hidden="true" />
                <span>Madison Avenue &amp; 57th St<br />New York, NY 10022</span>
              </li>
              <li className="flex items-center gap-3">
                <MessageSquare size={17} className="shrink-0 text-[#8dd8c0]" aria-hidden="true" />
                <Link to="/contact" className={link}>Contact the team</Link>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={17} className="shrink-0 text-[#8dd8c0]" aria-hidden="true" />
                <a href="mailto:advisory@nlp-real-estate.com" className={link}>Email us</a>
              </li>
            </ul>
          </section>

          <section aria-labelledby="footer-homeverse">
            <h2 id="footer-homeverse" className={heading}>Explore Homeverse</h2>
            <Link to="/" aria-label="Homeverse home" className="inline-block rounded-sm">
              <img src={logoLight} alt="" width={230} height={34} className="h-auto w-40 max-w-full" />
            </Link>
            <div className="mt-4 flex flex-wrap gap-2.5">
              {shortcuts.map(({ label, to, icon: Icon }) => (
                <Link key={to} to={to} aria-label={label} title={label}
                  className="grid size-10 place-items-center rounded-full bg-[#33423c] text-[#a7e5d2] transition-colors hover:bg-[#126553] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8dd8c0]">
                  <Icon size={17} aria-hidden="true" />
                </Link>
              ))}
            </div>
            <ul aria-label="Social media" className="mt-4 flex flex-wrap gap-2.5">
              {socialLinks.map(({ label, icon: Icon, href, color, share }) => (
                <li key={label}>
                  <a href={share ? href + homeUrl : href} target="_blank" rel="noopener noreferrer"
                    aria-label={share ? `Share Homeverse on ${label}` : `Visit ${label}`}
                    className={`grid size-10 place-items-center rounded-full text-white ring-1 ring-inset ring-white/15 hover:brightness-125 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8dd8c0] ${color}`}>
                    <Icon size={18} aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
            <Link to="/add-property" className="mt-5 inline-flex items-center gap-2 rounded-lg border border-[#72bca6] px-3.5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#33423c]">
              <HousePlus size={17} aria-hidden="true" /> Add a property
            </Link>
          </section>
        </div>

        <div className="mt-9 flex flex-wrap items-center justify-between gap-4 border-t border-white/15 py-5 sm:mt-11">
          <p className="text-xs text-[#aab8b1]">© {new Date().getFullYear()} Homeverse. All rights reserved.</p>
          <button type="button" className={link + ' inline-flex items-center gap-1.5'} onClick={() => window.scrollTo(0, 0)}>
            <ArrowUp size={15} aria-hidden="true" /> Back to top
          </button>
        </div>
      </div>
    </footer>
  );
}
