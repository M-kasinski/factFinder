# FactFinder Project Guide

## Build/Test Commands
- 🚀 Start dev server: `pnpm dev`
- 🏗️ Build for production: `pnpm build`
- 🧪 Run all tests: `pnpm test`
- 🔍 Run single test: `pnpm test -- path/to/test`
- 🔄 Watch tests: `pnpm test:watch`
- 🧹 Lint code: `pnpm lint`

## Code Style Guidelines
- 📚 Imports: React first, then external libs, then internal absolute paths (@/*)
- 🧰 UI Components: Use shadcn/ui with Tailwind for styling
- 📏 TypeScript: Use strict typing with explicit interfaces for props
- 🔤 Naming: PascalCase for components, camelCase for variables/functions
- 🐛 Error handling: Use try/catch with appropriate feedback
- 📝 Create/update steps.md to document project evolution
- 🌐 French language used for user-facing content
- 💾 Package manager: pnpm (not npm or yarn)

## Project Structure
- Next.js App Router
- Tailwind CSS for styling
- shadcn/ui component library
- Vitest for testing