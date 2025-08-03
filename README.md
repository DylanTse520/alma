# Alma Lead Management System

A modern web application for collecting and managing potential client leads for immigration law services. Built with Next.js 15, this system provides a streamlined interface for lead submission and an admin dashboard for lead management.

## 🚀 Running the Application Locally

### Prerequisites

Before running the application, ensure you have the following installed:

- **Node.js** (version 18 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn** package manager

### Installation & Setup

1. **Clone the repository** (if you haven't already):

   ```bash
   git clone <repository-url>
   cd alma
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

**Frontend Framework: Next.js 15.4.5 (App Router)**

- **Why**: Latest React framework with built-in SSR, excellent TypeScript support, and optimized performance
- **App Router**: Leverages the new App Router for better file-based routing and layouts
- **React 19.1.0**: Latest React version for improved performance and developer experience
- **Benefits**: Server-side rendering, automatic code splitting, and excellent developer experience

**State Management: Jotai 2.12.5**

- **Why**: Lightweight atomic state management library
- **Benefits**: Simple API, excellent TypeScript support, and avoids prop drilling
- **Usage**: Currently manages leads data state across components

**Styling: Styled Components 6.1.19**

- **Why**: CSS-in-JS solution that provides component-scoped styling
- **Benefits**: Dynamic styling based on props, TypeScript support, and SSR compatibility
- **Implementation**: Custom registry for SSR support to prevent hydration mismatches

**Form Management: JSON Forms 3.6.0**

- **Why**: Schema-driven form generation for complex, dynamic forms
- **Benefits**:
  - Separation of data structure (JSON Schema) from presentation (UI Schema)
  - Custom renderers for specialized components
  - Built-in validation and error handling
  - Maintainable and scalable form logic

**Data Management: TanStack React Table 8.21.3**

- **Why**: Powerful table library for data display and manipulation
- **Benefits**: Efficient rendering, sorting, pagination, and filtering capabilities

**Icons: Lucide React 0.536.0**

- **Why**: Beautiful, customizable SVG icons
- **Benefits**: Tree-shakable, consistent design, and TypeScript support

### Key Design Decisions

#### 1. Schema-Driven Form Architecture

**Decision**: Use JSON Schema and UI Schema for form definition

**Data Schema** (`app/_data/schema.json`):

```json
{
  "type": "object",
  "properties": {
    "firstName": { "type": "string", "title": "First Name" },
    "lastName": { "type": "string", "title": "Last Name" },
    "email": { "type": "string", "format": "email" },
    "url": { "type": "string", "title": "LinkedIn or Personal Website" },
    "resume": { "type": "object", "title": "Resume / CV" },
    "visasInterested": {
      "type": "array",
      "items": { "enum": ["O-1", "EB-1A", "EB-2 NIW", "I don't know"] }
    },
    "additionalInfo": { "type": "string", "title": "Additional Information" }
  }
}
```

**UI Schema** (`app/_data/uischema.json`):

- Defines layout with custom instruction components
- Specifies specialized renderers (file upload, checkbox arrays, textareas)
- Includes contextual icons and helpful messaging

**Rationale**:

- **Maintainability**: Form structure can be modified without code changes
- **Validation**: Built-in JSON Schema validation
- **Flexibility**: Easy to add/remove fields or change layouts
- **Consistency**: Ensures uniform data structure across the application

#### 2. Custom Renderer System

**Decision**: Implement custom renderers for specialized form components

**Available Renderers**:

- `CustomInputRenderer` - Styled text inputs with error states
- `CustomTextareaRenderer` - Multi-line text areas with configurable rows
- `CustomFileUploadRenderer` - File upload with validation and preview
- `CustomCheckboxArrayRenderer` - Multi-select checkboxes for visa types
- `CustomInstructionRenderer` - Contextual information sections with icons
- `CustomVerticalLayoutRenderer` - Layout container for form structure

**Renderer Registration**:

```typescript
const customRenderers = [
  {
    tester: customVerticalLayoutTester,
    renderer: CustomVerticalLayoutRenderer,
  },
  { tester: customInstructionTester, renderer: CustomInstructionRenderer },
  { tester: customFileUploadTester, renderer: CustomFileUploadControl },
  { tester: customInputTester, renderer: CustomInputControl },
  { tester: customCheckboxArrayTester, renderer: CustomCheckboxArrayControl },
  { tester: customTextareaTester, renderer: CustomTextareaControl },
];
```

**Rationale**:

- **Brand Consistency**: Custom styling that matches Alma's design system
- **Enhanced UX**: Specialized components for better user experience
- **Flexibility**: Easy to modify individual component behavior
- **Reusability**: Components can be reused across different forms

#### 3. Component Architecture

**Decision**: Atomic design principles with shared styled components

**Shared Components** (`app/_components/shared.tsx`):

- `FlexContainer` - Flexible layout container with configurable props
- `Text` - Typography component with size, weight, and color options
- `Button` - Primary button with hover states and loading support
- `UnstyledButton` - Minimal button for custom implementations
- `Input` - Form input with error states and focus styling
- `Checkbox` - Custom checkbox with styled appearance

**Structure**:

```
app/
├── _components/     # Shared, reusable components
├── _data/          # Schemas and mock data
├── _lib/           # Utility functions and setup
├── _store/         # State management (Jotai atoms)
├── _type/          # TypeScript type definitions
├── leads/          # Lead management feature
└── submit-lead/    # Lead submission feature
```

**Rationale**:

- **Consistency**: Shared components ensure uniform styling
- **Maintainability**: Changes to base components propagate throughout the app
- **Developer Experience**: Easy to build new features with existing primitives
- **Type Safety**: Strong TypeScript interfaces prevent runtime errors
