
import { BrandConfig, AgentInfo } from './types';

export const LOGO_URL = 'https://media-production.lp-cdn.com/cdn-cgi/image/format=auto,quality=85/https://media-production.lp-cdn.com/media/f92cc6c4-e44d-472a-902e-4dc62c1d0bd0';

export const SERHANT_BRAND: BrandConfig = {
  logoName: 'SERHANT.title',
  primaryColor: '#000000',
  accentColor: '#2F6BFF',
  lightBlue: '#F0F4FF',
  grayBlue: '#A0AEC0',
  headerFont: 'Nunito Sans',
  bodyFont: 'Nunito Sans',
  contactEmail: 'cv@serhant.com',
  legalName: 'SERHANT.title, LLC'
};

export const MOCK_AGENT: AgentInfo = {
  name: 'Candace and Veronica',
  brokerage: 'SERHANT. Florida',
  phone: '(561) 371-7277 | (561) 685-7368',
  email: 'cv@serhant.com',
  image: 'https://media-production.lp-cdn.com/cdn-cgi/image/format=auto,quality=85/https://media-production.lp-cdn.com/media/vca1uy4irlvlyz22nizj' 
};

export const REAL_PROPERTY_MOCK = {
  address: "1200 BRICKELL BAY DRIVE",
  cityStateZip: "MIAMI, FL 33131",
  parcelId: "FL-MIA-BRICK-099",
  salePrice: 2450000,
  loanAmount: 1800000,
  interestRate: 6.125,
  buyerName: "ALEXANDER & SOFIA VANCE",
  sellerName: "RESERVE HOLDINGS, LLC",
  lender: "LOWER, LLC",
  closingDate: "12/20/2025"
};

export const PREFERRED_LENDERS = [
  {
    name: 'SERHANT VENTURES',
    tagline: 'Private Wealth Lending',
    description: 'Bespoke financing solutions for luxury acquisitions. Integrated with SERHANT.title.',
    logo: 'S'
  },
  {
    name: 'CHASE PRIVATE CLIENT',
    tagline: 'Institutional Excellence',
    description: 'Preferred jumbo rates and dedicated underwriting for SERHANT clients.',
    logo: 'C'
  },
  {
    name: 'LOWER LUXURY',
    tagline: 'High-Velocity Funding',
    description: 'Digital-first jumbo loans designed for rapid Miami market execution.',
    logo: 'L'
  }
];
