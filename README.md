# NovaCrust Frontend Assessment

A modern, responsive crypto checkout experience built with Next.js 15, React 19, and TypeScript. This project implements 2 screens from the provided Figma design.

## Live Demo

**Vercel:** [https://dami-novacrust-assessment.vercel.app](https://dami-novacrust-assessment.vercel.app)

## Assessment Requirements

### Task
> Select any 2 pages/screens from the Figma design and convert them into code.

### Requirements Met
- Responsive design (desktop + mobile)
- Clean component structure
- Basic form state handling

## Screens Implemented

### 1. Crypto Converter Screen (Main Page)
The main converter interface where users can:
- Switch between conversion modes via pill-style tabs:
  - Crypto to cash
  - Cash to crypto  
  - Crypto to fiat loan
- Enter amounts to pay/receive with searchable token selectors
- Select cryptocurrency (ETH, USDT-CELO, USDT-TON, USDT-BNB, BTC, USDC)
- Select fiat currency (NGN, USD, GBP, EUR)
- Choose wallet connection (Metamask, Rainbow, WalletConnect, Other)
- Select payment destination (bank accounts)

### 2. Recipient Details Screen (Two-Step Form)
A multi-step form for entering recipient information:
- **Step 1: Bank Details**
  - Country selection dropdown
  - Bank selection dropdown
  - Account number input with verification
- **Step 2: Contact Details**
  - Full name input
  - Phone number with country code selector
  - Email address input

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Font**: Inter (Google Fonts)

## Project Structure

```
frontend/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout with metadata
│   │   ├── page.tsx            # Main page
│   │   └── globals.css         # Global styles
│   ├── components/
│   │   ├── ui/                 # Reusable UI components
│   │   │   ├── Button.tsx      # Button with variants & loading
│   │   │   ├── Input.tsx       # Form input with validation
│   │   │   ├── Card.tsx        # Card container
│   │   │   ├── Dropdown.tsx    # Searchable dropdown with icons
│   │   │   ├── TabNav.tsx      # Pill-style tab navigation
│   │   │   ├── AmountInput.tsx # Amount input with token selector
│   │   │   └── PhoneInput.tsx  # Phone input with country code
│   │   ├── converter/          # Converter screen
│   │   │   └── CryptoConverter.tsx
│   │   └── recipient/          # Recipient details screen
│   │       └── RecipientDetails.tsx
│   ├── lib/
│   │   └── mockData.ts         # Mock data (tokens, currencies, wallets)
│   └── types/
│       └── index.ts            # TypeScript type definitions
├── public/                     # Static assets (crypto/wallet icons)
└── package.json
```

## Setup Instructions

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Damilola-codes/novacrust-assessment.git
cd novacrust-assessment/frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Assumptions & Trade-offs

### Assumptions Made

1. **No Backend Integration** - Used mock data as this is a frontend-only assessment. In production, this would integrate with actual conversion APIs and wallet connections.

2. **Cryptocurrency Rates** - Static exchange data used. A real application would fetch live rates from an API.

3. **Wallet Connection** - UI implementation only. Production would use Web3 libraries (WalletConnect, MetaMask SDK, Rainbow Kit).

4. **Tab Content** - All tabs share the same form structure. Different conversion flows might have unique requirements in a full implementation.

5. **Form Validation** - Basic client-side validation implemented. Production would include more robust validation and server-side verification.

6. **Account Verification** - Mock "verified" state shown. Real implementation would call a bank verification API.

### Trade-offs

| Decision | Why |
|----------|-----|
| **Tailwind CSS** | Rapid development, consistent styling, easy responsiveness over custom CSS |
| **Image icons from /public** | Used provided assets; production might use SVG sprite or icon library |
| **Component-based architecture** | Reusable UI components for maintainability over single-file approach |
| **TypeScript strict mode** | Type safety and better DX over plain JavaScript |
| **Mobile-first responsive** | Designed for mobile, scales up to desktop |
| **Mock data in separate file** | Easy to swap with API calls later |

### What I Would Add With More Time

- Unit tests with Jest/React Testing Library
- E2E tests with Playwright or Cypress
- Actual wallet connection integration
- Real-time exchange rate fetching
- Form validation library (React Hook Form + Zod)
- Loading skeletons for better UX
- Error boundaries and error handling
- Dark mode support
- Internationalization (i18n)
- Accessibility audit and improvements

## ✨ Component Features

| Component | Features |
|-----------|----------|
| `TabNav` | Pill-style tabs, responsive text sizing, smooth transitions |
| `AmountInput` | Searchable token dropdown, image icons, currency display |
| `Dropdown` | Searchable, supports icons/sublabels, click-outside close |
| `Button` | Loading state, variants (primary/outline), disabled state |
| `PhoneInput` | Country code selector, formatted input |
| `RecipientDetails` | Multi-step form, back navigation, step indicators |

## License

This project was created as part of a technical assessment for NovaCrust.

---

Built with ❤️ using Next.js and TypeScript