import { useEffect, useState } from 'react';
import { ArrowRight, Calculator, Ruler } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const units = [
  { label: 'Square feet', factor: 1 },
  { label: 'Square metres', factor: 10.7639104167 },
  { label: 'Square yards', factor: 9 },
  { label: 'Marla (272.25 sq ft)', factor: 272.25 },
  { label: 'Kanal (20 marla)', factor: 5445 },
];
const field = 'mt-2 block w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm';
const number = new Intl.NumberFormat('en-US', { maximumFractionDigits: 3 });
const money = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

export default function PropertyTools() {
  const { hash } = useLocation();
  const [amount, setAmount] = useState('1000');
  const [from, setFrom] = useState(0);
  const [to, setTo] = useState(1);
  const [principal, setPrincipal] = useState('300000');
  const [rate, setRate] = useState('5');
  const [years, setYears] = useState('30');

  useEffect(() => {
    if (hash === '#mortgage' || hash === '#area') {
      document.getElementById(hash.slice(1))?.scrollIntoView();
    }
  }, [hash]);

  const months = Number(years) * 12;
  const monthlyRate = Number(rate) / 1200;
  const payment = monthlyRate === 0
    ? Number(principal) / months
    : Number(principal) * monthlyRate / (1 - (1 + monthlyRate) ** -months);
  const validPayment = principal !== '' && rate !== '' && Number(principal) > 0 &&
    Number(rate) >= 0 && months > 0 && Number.isFinite(payment);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-8">
      <h1 className="text-4xl font-extrabold tracking-tight">Property tools</h1>
      <div className="mt-7 grid gap-5 lg:grid-cols-2">
        <section id="mortgage" className="scroll-mt-24 rounded-xl border bg-card p-5 sm:p-7">
          <h2 className="flex items-center gap-3 text-xl font-extrabold"><Calculator size={21} /> Mortgage calculator</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <label className="text-sm font-semibold sm:col-span-2">Loan amount (USD)
              <input className={field} type="number" min="1" value={principal} onChange={(e) => setPrincipal(e.target.value)} />
            </label>
            <label className="text-sm font-semibold">Annual interest (%)
              <input className={field} type="number" min="0" step="0.01" value={rate} onChange={(e) => setRate(e.target.value)} />
            </label>
            <label className="text-sm font-semibold">Loan term (years)
              <input className={field} type="number" min="1" value={years} onChange={(e) => setYears(e.target.value)} />
            </label>
          </div>
          <output className="mt-5 block rounded-lg bg-muted p-4 text-lg font-extrabold">
            {validPayment ? money.format(payment) + ' per month' : 'Enter a valid loan amount, rate and term.'}
          </output>
          <p className="mt-2 text-sm text-muted-foreground">Estimated principal and interest for a fixed-rate loan.</p>
        </section>

        <section id="area" className="scroll-mt-24 rounded-xl border bg-card p-5 sm:p-7">
          <h2 className="flex items-center gap-3 text-xl font-extrabold"><Ruler size={21} /> Area converter</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <label className="text-sm font-semibold sm:col-span-2">Area
              <input className={field} type="number" min="0" step="any" value={amount} onChange={(e) => setAmount(e.target.value)} />
            </label>
            <label className="text-sm font-semibold">From
              <select className={field} value={from} onChange={(e) => setFrom(Number(e.target.value))}>
                {units.map(({ label }, index) => <option key={label} value={index}>{label}</option>)}
              </select>
            </label>
            <label className="text-sm font-semibold">To
              <select className={field} value={to} onChange={(e) => setTo(Number(e.target.value))}>
                {units.map(({ label }, index) => <option key={label} value={index}>{label}</option>)}
              </select>
            </label>
          </div>
          <output className="mt-5 block rounded-lg bg-muted p-4 text-lg font-extrabold">
            {amount !== '' && Number(amount) >= 0
              ? number.format(Number(amount) * units[from].factor / units[to].factor) + ' ' + units[to].label
              : 'Enter an area of zero or more.'}
          </output>
        </section>
      </div>
      <Link to="/listings" className="mt-7 inline-flex items-center gap-2 font-bold text-primary hover:underline">
        Browse properties <ArrowRight size={17} aria-hidden="true" />
      </Link>
    </div>
  );
}
