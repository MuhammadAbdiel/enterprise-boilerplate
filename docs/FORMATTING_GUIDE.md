# 🎨 Code Formatting Guide

## 📋 Overview

This project uses **Prettier** for consistent code formatting across the team. All team members must follow these formatting rules to maintain code quality and readability.

## 🚀 Setup

### 1. Install Dependencies

Dependencies are already included in `package.json`:

```bash
npm install
```

### 2. Install VSCode Extension (Recommended)

Install the **Prettier - Code formatter** extension:

- Extension ID: `esbenp.prettier-vscode`
- Or search "Prettier" in VSCode Extensions

### 3. Enable Format on Save

VSCode settings are already configured in `.vscode/settings.json`:

- ✅ Auto-format on save
- ✅ ESLint auto-fix on save
- ✅ Trim trailing whitespace
- ✅ Insert final newline

## 📐 Formatting Rules

### Core Rules

```json
{
  "semi": false, // ❌ No semicolons
  "singleQuote": true, // ✅ Single quotes ('')
  "tabWidth": 2, // 2 spaces for indentation
  "useTabs": false, // Use spaces, not tabs
  "trailingComma": "es5", // Trailing commas where valid in ES5
  "printWidth": 80, // Max line length: 80 characters
  "arrowParens": "always", // Always use parentheses in arrow functions
  "endOfLine": "lf", // Unix-style line endings
  "bracketSpacing": true, // Spaces inside object literals
  "jsxSingleQuote": false, // Double quotes in JSX
  "bracketSameLine": false // Put > on new line in JSX
}
```

### Examples

#### ✅ Correct (After Prettier)

```typescript
// Single quotes, no semicolons
const greeting = 'Hello, World!'
const user = { name: 'John', age: 30 }

// Arrow functions with parentheses
const add = (a, b) => a + b

// Trailing commas
const colors = [
  'red',
  'green',
  'blue',
]

// JSX with double quotes
const Component = () => {
  return <div className="container">Hello</div>
}
```

#### ❌ Incorrect (Before Prettier)

```typescript
// Double quotes, semicolons
const greeting = "Hello, World!";
const user = {name: "John", age: 30};

// Arrow functions without parentheses
const add = a => a + b;

// No trailing commas
const colors = [
  "red",
  "green",
  "blue"
];

// JSX with single quotes
const Component = () => {
  return <div className='container'>Hello</div>;
};
```

## 🛠️ Usage

### Format All Files

```bash
npm run format
```

This will format all files matching: `**/*.{js,jsx,ts,tsx,json,css,md}`

### Check Formatting (CI/CD)

```bash
npm run format:check
```

This will check if files are formatted correctly without modifying them.
Use this in CI/CD pipelines.

### Format Specific Files

```bash
# Single file
npx prettier --write src/components/Button.tsx

# Multiple files
npx prettier --write "src/**/*.tsx"

# Specific directory
npx prettier --write src/features/users/
```

## 🎯 Tailwind CSS Class Sorting

This project uses `prettier-plugin-tailwindcss` to automatically sort Tailwind CSS classes:

### Before

```tsx
<div className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
  Button
</div>
```

### After

```tsx
<div className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
  Button
</div>
```

Classes are sorted in the official Tailwind CSS recommended order.

## 👥 Team Guidelines

### For All Team Members

1. ✅ **Install Prettier VSCode extension**
2. ✅ **Enable format on save** (already configured)
3. ✅ **Run `npm run format` before committing** (if not using pre-commit hooks)
4. ✅ **Never commit unformatted code**

### For Code Reviewers

1. ❌ **Don't approve PRs with formatting issues**
2. ✅ **Check CI/CD formatting status**
3. ✅ **Ask contributors to run `npm run format`**

## 📚 Resources

- [Prettier Documentation](https://prettier.io/docs/en/)
- [Prettier Playground](https://prettier.io/playground/)
- [Prettier VSCode Extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [EditorConfig](https://editorconfig.org/)
- [Tailwind CSS Prettier Plugin](https://github.com/tailwindlabs/prettier-plugin-tailwindcss)
