# Atelier Frames Website

A minimalist, futuristic website for Atelier Frames - the world's first AI-powered art frame. This website features a clean, Apple-inspired aesthetic with smooth animations, parallax effects, and AI art generation capabilities.

## Features

- Modern, responsive design with Apple-inspired aesthetics
- Smooth parallax scrolling effects and micro-interactions
- Clean typography and generous whitespace
- Subtle animations using Framer Motion
- AI art generation demo using Replicate API
- Dynamic scene slideshow showcasing the product in various environments
- Fully responsive layout for all devices
- Kickstarter campaign integration

## Tech Stack

- Next.js 14 with App Router
- React 18
- TypeScript
- Tailwind CSS for styling
- Framer Motion for animations and parallax effects
- Replicate API for AI art generation

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn
- Replicate API key for AI art generation

### Quick Start

The easiest way to start the application is to use the provided run script:

```bash
# Make the script executable (if not already)
chmod +x run.sh

# Run the application
./run.sh
```

The script will:
1. Check for and create a `.env.local` file if it doesn't exist
2. Install dependencies if needed
3. Start the development server

### Environment Setup

Create a `.env.local` file in the root directory with the following variables:
```
REPLICATE_API_TOKEN=your_replicate_api_key
```

### Manual Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ateliersite
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Project Structure

- `/app` - Next.js App Router pages and API routes
- `/components` - React components
- `/public` - Static assets
- `/styles` - Global CSS styles

## Key Components

- **Hero** - Main landing section with parallax effects, animated elements, and feature highlights
- **Header** - Navigation with responsive mobile menu and scroll effects
- **Features** - Highlights of the product's key features
- **HowItWorks** - Step-by-step explanation of the product, including AI art demo
- **AIArtDemo** - Interactive component allowing users to create AI-generated artwork
- **Integration** - Dynamic slideshow of scenes showcasing the product in various environments
- **Pricing** - Product pricing options
- **Newsletter** - Email signup form
- **Footer** - Modern footer with links and Kickstarter campaign promotion
- **ParallaxFrame** - Component for parallax scrolling effect

## API Routes

- **/api/generate-art** - Connects with the Replicate API to generate AI artwork based on user prompts

## Customization

- Update the color scheme in `tailwind.config.js`
- Modify fonts in `globals.css` and `tailwind.config.js`
- Replace placeholder images with actual product images in the components
- Adjust the AI art generation parameters in `app/api/generate-art/route.ts`

## Deployment

This website can be easily deployed on Vercel, Netlify, or any other platform that supports Next.js.

```bash
npm run build
# or
yarn build
```

Make sure to set the `REPLICATE_API_TOKEN` environment variable in your deployment platform.

## License

[MIT](LICENSE)
