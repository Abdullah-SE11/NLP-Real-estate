import { Link, useLocation } from 'react-router-dom';
import { Bookmark, ChevronDown, HousePlus, Menu, Moon, Sun } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import logo from '../assets/images/logo.png';
import logoLight from '../assets/images/logo-light.png';

const navigation = [
  {
    label: 'Buy',
    links: [
      { label: 'All properties for sale', to: '/listings' },
      { label: 'Houses for sale', to: '/listings?type=House' },
      { label: 'Apartments for sale', to: '/listings?type=Apartment' },
      { label: 'Villas for sale', to: '/listings?type=Villa' },
    ],
  },
  {
    label: 'Rent',
    links: [
      { label: 'All rentals', to: '/rent' },
      { label: 'Apartments for rent', to: '/rent?type=Apartment' },
    ],
  },
  {
    label: 'New Projects',
    links: [
      { label: 'Browse projects', to: '/projects' },
      { label: 'Projects in Dubai', to: '/projects?location=Dubai' },
    ],
  },
  {
    label: 'Agencies',
    links: [
      { label: 'Agent directory', to: '/agents' },
      { label: 'Contact the team', to: '/contact' },
    ],
  },
  {
    label: 'Tools',
    links: [
      { label: 'Mortgage calculator', to: '/tools#mortgage' },
      { label: 'Area converter', to: '/tools#area' },
    ],
  },
];

const menuLink = 'rounded-md px-3 py-2.5 text-sm font-semibold focus:bg-[#e7f2ed] focus:text-[#126553] dark:focus:bg-[#263e35] dark:focus:text-[#8dd8c0]';
const utilityButton = 'h-10 rounded-lg border-[#dbe4de] dark:border-[#405650]';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { pathname } = useLocation();

  return (
    <header className="sticky top-0 z-40 border-b border-[#dbe4de] bg-white text-[#182c28] dark:border-[#30413b] dark:bg-[#15211e] dark:text-white">
      <div className="mx-auto flex min-h-[4.75rem] max-w-[90rem] items-center justify-between gap-3 px-4 sm:px-8 lg:gap-6">
        <Link to="/" aria-label="Homeverse home" className="inline-flex min-w-0 items-center rounded-md">
          <img src={logo} alt="" className="h-auto w-32 max-w-full sm:w-44 dark:hidden" />
          <img src={logoLight} alt="" className="hidden h-auto w-32 max-w-full sm:w-44 dark:block" />
        </Link>

        <nav aria-label="Main navigation" className="hidden items-center gap-0.5 lg:flex xl:gap-2">
          {navigation.map(({ label, links }) => (
            <DropdownMenu key={label} modal={false}>
              <DropdownMenuTrigger
                data-current={links.some(({ to }) => to.split(/[?#]/)[0] === pathname)}
                className="group inline-flex h-10 items-center gap-1.5 whitespace-nowrap rounded-lg px-2.5 text-sm font-bold transition-colors hover:bg-[#edf5f0] data-[current=true]:text-[#126553] data-[state=open]:bg-[#e7f2ed] dark:hover:bg-[#263e35] dark:data-[current=true]:text-[#8dd8c0] dark:data-[state=open]:bg-[#263e35]"
              >
                {label}
                <ChevronDown size={14} aria-hidden="true" className="opacity-65 transition-transform group-data-[state=open]:rotate-180" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" sideOffset={10}
                className="min-w-52 rounded-xl border-[#dbe4de] bg-white p-1.5 text-[#182c28] shadow-lg dark:border-[#405650] dark:bg-[#1b2925] dark:text-white">
                {links.map(({ to, label: item }) => (
                  <DropdownMenuItem key={to} asChild className={menuLink}><Link to={to}>{item}</Link></DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <Button asChild variant="outline" className={utilityButton + ' hidden lg:inline-flex'}>
            <Link to="/saved"><Bookmark aria-hidden="true" /> Saved</Link>
          </Button>
          <Button variant="outline" size="icon" className={utilityButton + ' w-10'} onClick={toggleTheme} aria-label="Toggle theme">
            {theme === 'dark' ? <Sun aria-hidden="true" /> : <Moon aria-hidden="true" />}
          </Button>
          <Button asChild className="hidden h-10 rounded-lg bg-[#126553] px-3 font-bold text-white hover:bg-[#0b5141] lg:inline-flex">
            <Link to="/add-property"><HousePlus aria-hidden="true" /> Add Property</Link>
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className={utilityButton + ' w-10 lg:hidden'} aria-label="Open menu">
                <Menu aria-hidden="true" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" aria-describedby={undefined} className="w-[min(22rem,90vw)] overflow-y-auto bg-white dark:bg-[#15211e]">
              <SheetTitle className="pr-8">Navigation</SheetTitle>
              <nav aria-label="Mobile navigation" className="grid gap-1">
                {navigation.map(({ label, links }) => (
                  <details key={label} className="group border-b border-[#dbe4de] dark:border-[#405650]">
                    <summary className="flex cursor-pointer list-none items-center justify-between rounded-md px-2 py-3 text-sm font-bold [&::-webkit-details-marker]:hidden">
                      {label}<ChevronDown size={16} aria-hidden="true" className="group-open:rotate-180" />
                    </summary>
                    <div className="grid gap-0.5 pb-2 pl-2">
                      {links.map(({ to, label: item }) => (
                        <SheetClose key={to} asChild><Link to={to} className={menuLink}>{item}</Link></SheetClose>
                      ))}
                    </div>
                  </details>
                ))}
                <SheetClose asChild><Link to="/saved" className={menuLink}>Saved properties</Link></SheetClose>
                <SheetClose asChild>
                  <Link to="/add-property" className="mt-2 flex items-center gap-2 rounded-lg bg-[#126553] px-3 py-2.5 text-sm font-bold text-white">
                    <HousePlus size={17} aria-hidden="true" /> Add Property
                  </Link>
                </SheetClose>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
