# Alma Lead Management System

A modern web application for collecting and managing potential client leads for immigration law services. Built with Next.js, this system provides a streamlined interface for lead submission and an admin dashboard for lead management.

## 🚀 Running the Application Locally

### Prerequisites

Before running the application, ensure you have the following installed:

- **Node.js** (version 18 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn** package manager

### Installation & Setup

1. **Clone the repository** (if you haven't already):
   ```bash
   git clone <repository-url>
   cd alma-interview
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

   The application will start with Turbopack for faster builds and hot reloading.

4. **Open your browser** and navigate to:
   ```
   http://localhost:3000
   ```

### Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint for code quality checks

### Application Structure

Once running, you can access:

- **Homepage** (`/`) - Main landing page with navigation options
- **Submit Lead** (`/submit-lead`) - Dynamic form for potential clients to submit their information
- **Admin Login** (`/leads/login`) - Admin authentication page
  - Demo credentials: `admin@tryalma.ai` / `correctpassword`
- **Leads Dashboard** (`/leads`) - Admin interface to view and manage submitted leads

## 🏗️ Design Choices & Architecture

### Technology Stack

**Frontend Framework: Next.js 15 (App Router)**
- **Why**: Modern React framework with built-in SSR, excellent TypeScript support, and optimized performance
- **App Router**: Leverages the new App Router for better file-based routing and layouts
- **Benefits**: Server-side rendering, automatic code splitting, and excellent developer experience

**State Management: Jotai**
- **Why**: Lightweight atomic state management library
- **Benefits**: Simple API, excellent TypeScript support, and avoids prop drilling
- **Usage**: Currently manages form data state across components

**Styling: Styled Components**
- **Why**: CSS-in-JS solution that provides component-scoped styling
- **Benefits**: Dynamic styling based on props, TypeScript support, and SSR compatibility
- **Implementation**: Custom registry for SSR support to prevent hydration mismatches

**Form Management: JSON Forms**
- **Why**: Schema-driven form generation for complex, dynamic forms
- **Benefits**: 
  - Separation of data structure (JSON Schema) from presentation (UI Schema)
  - Custom renderers for specialized components
  - Built-in validation and error handling
  - Maintainable and scalable form logic

### Key Design Decisions

#### 1. Schema-Driven Form Architecture

**Decision**: Use JSON Schema and UI Schema for form definition
```json
// Data structure defined in schema.json
// UI layout and components defined in uischema.json
```

**Rationale**:
- **Maintainability**: Form structure can be modified without code changes
- **Validation**: Built-in JSON Schema validation
- **Flexibility**: Easy to add/remove fields or change layouts
- **Consistency**: Ensures uniform data structure across the application

#### 2. Custom Renderer System

**Decision**: Implement custom renderers for specialized form components

**Components**:
- `CustomInputRenderer` - Styled text inputs with error states
- `CustomTextareaRenderer` - Multi-line text areas
- `CustomFileUploadRenderer` - File upload with validation
- `CustomCheckboxArrayRenderer` - Multi-select checkboxes
- `CustomInstructionRenderer` - Informational sections with icons
- `CustomVerticalLayoutRenderer` - Layout container

**Rationale**:
- **Brand Consistency**: Custom styling that matches Alma's design system
- **Enhanced UX**: Specialized components for better user experience
- **Flexibility**: Easy to modify individual component behavior
- **Reusability**: Components can be reused across different forms

#### 3. Mock Authentication System

**Decision**: Simple localStorage-based authentication for demo purposes

**Implementation**:
```typescript
// Demo credentials hardcoded for simplicity
const ADMIN_CREDENTIALS = {
  email: "admin@tryalma.ai",
  password: "correctpassword"
};
```

**Rationale**:
- **Demo-Ready**: Immediate functionality without backend setup
- **Simplicity**: Easy to understand and test
- **Placeholder**: Clear indication this would be replaced with real auth in production

#### 4. Component Architecture

**Decision**: Atomic design principles with shared styled components

**Structure**:
- `shared.tsx` - Reusable UI primitives (Button, FlexContainer, Text)
- Feature-specific components in dedicated directories
- Custom renderers as composable units

**Rationale**:
- **Consistency**: Shared components ensure uniform styling
- **Maintainability**: Changes to base components propagate throughout the app
- **Developer Experience**: Easy to build new features with existing primitives

#### 5. Data Layer

**Decision**: Mock data with TypeScript interfaces

**Implementation**:
- `mockLeads.ts` - Sample data for development and demo
- Strong TypeScript interfaces for type safety
- TanStack React Table for efficient data display

**Rationale**:
- **Type Safety**: Prevents runtime errors and improves developer experience
- **Demo-Ready**: Immediate data visualization without backend
- **Performance**: React Table provides efficient rendering for large datasets

### Folder Structure Rationale

```
app/
├── _components/     # Shared, reusable components
├── _data/          # Schemas and mock data
├── _lib/           # Utility functions and setup
├── _store/         # State management
├── leads/          # Lead management feature
└── submit-lead/    # Lead submission feature
```

**Why this structure**:
- **Feature-based**: Related functionality grouped together
- **Underscore prefix**: Indicates shared/utility directories
- **Scalability**: Easy to add new features without restructuring
- **Next.js App Router**: Leverages file-based routing conventions

### Performance Considerations

1. **Turbopack**: Fast development builds and hot reloading
2. **Component Lazy Loading**: Form components only render when needed
3. **Styled Components SSR**: Proper server-side rendering setup
4. **Type Safety**: Compile-time error checking reduces runtime issues

### Future Considerations

This architecture was designed with extensibility in mind:

- **Backend Integration**: Easy to replace mock data with API calls
- **Authentication**: Auth system can be swapped for production solution
- **Form Expansion**: New forms can be added by creating new schemas
- **Deployment**: Ready for Vercel deployment with minimal configuration

### Trade-offs Made

1. **Mock vs Real Data**: Chose mock data for demo simplicity over backend complexity
2. **Client-side Auth**: Simple localStorage over secure server-side sessions
3. **Styled Components**: CSS-in-JS over CSS modules for dynamic styling capabilities
4. **JSON Forms**: Schema-driven over hand-coded forms for maintainability

This architecture balances development speed, maintainability, and user experience while providing a solid foundation for future enhancements.
