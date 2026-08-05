.PHONY: dev build preview install clean sync help

# Default target: start development server
dev:
	pnpm dev

# Build for production
build:
	pnpm build

# Preview production build locally
preview:
	pnpm preview

# Install dependencies
install:
	pnpm install

# Clean build artifacts and node_modules
clean:
	rm -rf dist node_modules .vite

# Checkout main branch and pull latest changes
sync:
	git checkout main
	git pull origin main
