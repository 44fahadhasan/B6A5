# Ummah Care Frontend

[![Next.js](https://img.shields.io/badge/Next.js-16.2.1-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.4-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.0-38B2AC)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-5.0-2D3748)](https://prisma.io/)

A modern, full-stack humanitarian platform connecting Muslim communities worldwide. Built with Next.js 16, React 19, and TypeScript for optimal performance and developer experience.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Architecture](#architecture)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [How It Works](#how-it-works)
- [Development](#development)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Overview

**Ummah Care** is a comprehensive humanitarian platform designed to strengthen Muslim communities through technology. The platform enables seamless coordination between individuals in need, donors, volunteers, and organizations, creating a trusted network for humanitarian assistance.

### Core Mission

To empower the Ummah by providing a transparent, secure, and efficient platform where help requests are fulfilled through community-driven collaboration.

## ✨ Features

### 🔐 Multi-Role Authentication System

- **User**: Request help and connect with supporters
- **Donor**: Provide financial aid with transparent tracking
- **Volunteer**: Offer skills and time for direct impact
- **Organization**: Manage campaigns and coordinate large-scale efforts

### 📋 Smart Help Request System

- Location-based filtering and urgency prioritization
- Category-based organization (Medical, Financial, Education, etc.)
- Real-time status tracking and updates

### 🤝 Structured Response Management

- Multi-type responses (Donations, Volunteering, Organization Support)
- Secure messaging and coordination tools
- Progress tracking and completion verification

### 🛡️ Trust & Verification

- User verification system with ratings and reviews
- Transparent impact tracking and reporting
- Secure payment processing and donation management

### 📊 Analytics & Reporting

- Real-time dashboard for all user roles
- Impact metrics and community statistics
- Comprehensive reporting tools

## 🏗️ Architecture

### Frontend Architecture (This Repository)

```
Next.js 16 App Router
├── Public Routes (Authentication, Landing, About)
├── Protected Routes (Role-based Dashboards)
├── Component Library (shadcn/ui + Custom Components)
├── State Management (TanStack Query + React Context)
└── API Integration (RESTful + Real-time Updates)
```

### Backend Architecture (Separate Repository)

```
Node.js + Express
├── RESTful API Endpoints
├── Prisma ORM with PostgreSQL
├── JWT Authentication
├── Real-time WebSocket Support
└── File Upload & Processing
```

## 🛠️ Technology Stack

### Frontend

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **State Management**: TanStack Query + React Context
- **Forms**: TanStack React Form + Zod Validation
- **UI Components**: Radix UI + Lucide Icons
- **Charts**: Recharts
- **Date Handling**: date-fns

### Development Tools

- **Package Manager**: pnpm
- **Linting**: ESLint
- **Code Formatting**: Prettier
- **Type Checking**: TypeScript
- **Testing**: Jest + React Testing Library

## 📁 Project Structure

```
ummah-care-frontend/
├── public/                          # Static assets
│   ├── favicon.ico
│   └── images/
├── src/
│   ├── actions/                     # Server actions (Next.js)
│   │   ├── auth-actions.ts         # Authentication actions
│   │   ├── donate.action.ts        # Donation handling
│   │   ├── message.action.ts       # Messaging system
│   │   ├── request.action.ts       # Help request management
│   │   └── stats.action.ts         # Analytics and statistics
│   ├── app/                        # Next.js App Router
│   │   ├── (public-layout)/        # Public pages
│   │   │   ├── about/              # About page
│   │   │   ├── contact/            # Contact page
│   │   │   ├── page.tsx            # Landing page
│   │   │   └── requests/           # Public request viewing
│   │   ├── (protected-layout)/     # Protected pages (role-based)
│   │   │   ├── (admin)/            # Admin dashboard
│   │   │   ├── (donor)/            # Donor dashboard
│   │   │   ├── (organization)/     # Organization dashboard
│   │   │   ├── (user)/             # User dashboard
│   │   │   └── (volunteer)/        # Volunteer dashboard
│   │   ├── globals.css             # Global styles
│   │   ├── layout.tsx              # Root layout
│   │   ├── error.tsx               # Error boundary
│   │   └── not-found.tsx           # 404 page
│   ├── components/                 # Reusable components
│   │   ├── layout/                 # Layout components
│   │   ├── modules/                # Page-specific modules
│   │   │   ├── home/               # Home page components
│   │   │   ├── about/              # About page components
│   │   │   └── auth/               # Authentication components
│   │   ├── shared/                 # Shared components
│   │   │   ├── typography/         # Typography components
│   │   │   └── ui/                 # UI primitives
│   │   └── ui/                     # shadcn/ui components
│   ├── constants/                  # Application constants
│   │   ├── donate.const.ts         # Donation constants
│   │   ├── pagination-option.const.ts
│   │   ├── payment.const.ts        # Payment configurations
│   │   └── user.const.ts           # User-related constants
│   ├── hooks/                      # Custom React hooks
│   │   ├── use-async-form-submit.tsx
│   │   ├── use-data-table.tsx      # Table management
│   │   ├── use-debounce.ts         # Debounce utility
│   │   ├── use-fetch.ts            # Data fetching
│   │   └── use-session.ts          # Session management
│   ├── lib/                        # Utility libraries
│   │   ├── http-client.ts          # API client
│   │   └── utils.ts                # General utilities
│   ├── providers/                  # React context providers
│   │   ├── providers.tsx           # Main provider
│   │   ├── react-query-provider.tsx
│   │   └── theme-provider.tsx      # Theme management
│   ├── routes/                     # Route definitions
│   │   ├── admin.route.ts          # Admin routes
│   │   ├── common.route.ts         # Shared routes
│   │   ├── donor.route.ts          # Donor routes
│   │   └── volunteer.route.ts      # Volunteer routes
│   ├── services/                   # External service integrations
│   │   └── auth-service.ts         # Authentication service
│   ├── types/                      # TypeScript type definitions
│   │   ├── api-type.ts             # API response types
│   │   ├── auth-type.ts            # Authentication types
│   │   └── index.ts                # Main type exports
│   └── utils/                      # Utility functions
├── .env.example                    # Environment variables template
├── components.json                 # shadcn/ui configuration
├── eslint.config.mjs               # ESLint configuration
├── next.config.ts                  # Next.js configuration
├── package.json                    # Dependencies and scripts
├── postcss.config.mjs              # PostCSS configuration
├── tailwind.config.ts              # Tailwind CSS configuration
└── tsconfig.json                   # TypeScript configuration
```

## 🚀 Getting Started

### Prerequisites

- **Node.js**: Version 18.17 or higher
- **pnpm**: Version 8.0 or higher (recommended)
- **Git**: Version control system

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/ummah-care-frontend.git
   cd ummah-care-frontend
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Environment Setup**

   ```bash
   cp .env.example .env.local
   ```

   Configure the following environment variables:

   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3001/api
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-secret-key
   NEXTAUTH_URL=http://localhost:3000
   ```

4. **Start Development Server**

   ```bash
   pnpm dev
   ```

5. **Open Browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Backend Setup

The frontend requires a running backend instance. Refer to the [backend repository](https://github.com/your-username/ummah-care-backend) for setup instructions.

## 🔄 How It Works

### Step-by-Step User Journey

1. **Registration & Onboarding**
   - New users register as "User" role
   - Complete profile verification
   - Choose additional roles (Donor, Volunteer, Organization)

2. **Help Request Creation**
   - Users create detailed help requests
   - Specify category, urgency, and location
   - Add supporting documentation

3. **Response & Coordination**
   - Donors, volunteers, and organizations browse requests
   - Submit structured responses with commitments
   - Secure messaging enables coordination

4. **Execution & Tracking**
   - Real-time progress updates
   - Transparent communication channels
   - Completion verification and feedback

5. **Impact Measurement**
   - Automated impact tracking
   - Community statistics and reporting
   - Trust score updates based on performance

### Role-Based Workflows

#### For Users (Help Seekers)

1. Create account and verify profile
2. Post help requests with detailed information
3. Review and accept responses from supporters
4. Coordinate help delivery through messaging
5. Rate and review completed assistance

#### For Donors

1. Browse verified help requests
2. Make secure donations with tracking
3. Monitor donation impact and progress
4. Receive tax receipts and impact reports

#### For Volunteers

1. Find opportunities matching skills and location
2. Apply for volunteer assignments
3. Coordinate with organizations and users
4. Track volunteer hours and impact

#### For Organizations

1. Manage large-scale campaigns and initiatives
2. Assign volunteers to specific tasks
3. Coordinate multiple donors and volunteers
4. Generate comprehensive impact reports

## 💻 Development

### Available Scripts

```bash
# Development
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint
pnpm clean        # Clean build artifacts

# Code Quality
pnpm lint:fix     # Auto-fix linting issues
pnpm type-check   # Run TypeScript type checking
```

### Development Workflow

1. **Feature Development**
   - Create feature branch from `main`
   - Implement changes with proper TypeScript types
   - Add/update tests if applicable
   - Ensure code passes linting and type checking

2. **Component Development**
   - Use shadcn/ui components for consistency
   - Follow established naming conventions
   - Implement responsive design patterns
   - Add proper TypeScript interfaces

3. **API Integration**
   - Use TanStack Query for server state management
   - Implement proper error handling
   - Add loading states and optimistic updates

### Code Quality Standards

- **TypeScript**: Strict type checking enabled
- **ESLint**: Airbnb configuration with React rules
- **Prettier**: Consistent code formatting
- **Commit Messages**: Conventional commits format

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect Repository**

   ```bash
   # Install Vercel CLI
   npm i -g vercel

   # Deploy
   vercel
   ```

2. **Environment Variables**
   Configure production environment variables in Vercel dashboard.

3. **Build Settings**
   - Build Command: `pnpm build`
   - Output Directory: `.next`
   - Node Version: 18.x

### Manual Deployment

```bash
# Build for production
pnpm build

# Start production server
pnpm start
```

## 🤝 Contributing

We welcome contributions from the community! Please follow these guidelines:

### Development Process

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Contribution Guidelines

- Follow the existing code style and conventions
- Add TypeScript types for new features
- Update documentation for API changes
- Ensure all tests pass before submitting
- Add appropriate error handling and loading states

### Code of Conduct

- Be respectful and inclusive
- Focus on constructive feedback
- Help newcomers learn and contribute
- Maintain professional communication

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Community**: Thanks to all contributors and supporters
- **Open Source**: Built on amazing open-source technologies
- **Ummah**: Dedicated to serving and strengthening our community

## 📞 Support

For support, questions, or collaboration opportunities:

- **Email**: support@ummahcare.com
- **Issues**: [GitHub Issues](https://github.com/your-username/ummah-care-frontend/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-username/ummah-care-frontend/discussions)

---

**Built with ❤️ for the Ummah**
