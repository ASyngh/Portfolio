# Portfolio Website with Contact Form

## Overview

This is a modern portfolio website built with React and Express.js featuring a sleek dark theme and interactive contact form. The application showcases projects through a carousel interface and includes sections for skills, experience, and contact information. The contact form integrates with a backend API to store submissions in a database.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript for type safety and modern development practices
- **Styling**: Tailwind CSS with shadcn/ui component library for consistent, accessible UI components
- **Router**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management and API caching
- **Build Tool**: Vite for fast development and optimized production builds
- **UI Components**: Comprehensive set of Radix UI primitives wrapped in custom components for accessibility

### Backend Architecture
- **Framework**: Express.js with TypeScript for API development
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Storage Layer**: Abstracted storage interface with in-memory implementation for development and PostgreSQL for production
- **API Design**: RESTful API endpoints for contact form submissions with proper error handling and validation
- **Development**: Hot module replacement and development middleware integration

### Data Storage
- **ORM**: Drizzle ORM with PostgreSQL dialect for database schema management
- **Schema**: Defined in shared TypeScript modules for type consistency across frontend and backend
- **Migrations**: Automated database migrations through Drizzle Kit
- **Validation**: Zod schemas for runtime type validation and form validation

### Authentication and Authorization
- **Current State**: No authentication system implemented
- **Session Management**: Express session configuration present but not actively used
- **Security**: Basic input validation and sanitization through Zod schemas

## External Dependencies

### Database
- **Neon Database**: Serverless PostgreSQL database for production data storage
- **Connection**: Uses @neondatabase/serverless driver for optimal serverless performance

### UI and Styling
- **Tailwind CSS**: Utility-first CSS framework for responsive design
- **Radix UI**: Headless component library for accessible UI primitives
- **Lucide React**: Icon library for consistent iconography
- **Embla Carousel**: Carousel component for project showcase

### Development Tools
- **TypeScript**: Static type checking across the entire application
- **ESBuild**: Fast JavaScript bundler for production builds
- **PostCSS**: CSS processing with Tailwind CSS integration
- **Replit Integration**: Development environment plugins for Replit platform

### Form Management
- **React Hook Form**: Form state management and validation
- **Hookform Resolvers**: Zod integration for form validation
- **TanStack Query**: Server state management for form submissions

### Utilities
- **clsx**: Conditional className utility
- **date-fns**: Date manipulation and formatting
- **class-variance-authority**: Component variant management
- **nanoid**: Unique ID generation for development