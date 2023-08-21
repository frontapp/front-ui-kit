## What is `_pre-built`

All the components that are in the `_pre-built/` folder are components that are meant to be:

- Opinionated
- Built from existing components/elements
- Not built from other `_pre-built/` components

Since these components could be built from existing components/elements an external developer
would be able to build the exact same component.

These components will have a strict interface to them, that may not fit all use-cases. If you
find a component that doesn't work exactly as you would like, they should all be built from
smaller components in the library.
