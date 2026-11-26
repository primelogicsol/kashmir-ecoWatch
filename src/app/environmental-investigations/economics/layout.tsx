import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Environmental Economics, Public Finance & Natural Capital Accounting | KEW-EIAI',
  description:
    'Shared scientific and fiscal evidence architecture examining Jammu & Kashmir public expenditure (FY 2000–2027), 23-agency performance, UN SEEA natural capital depreciation, damage valuation, and restoration benefit-cost ratios.',
};

export default function EnvironmentalEconomicsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
