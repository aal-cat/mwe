# قبيلة آل مياو | Al Meow Clan

## Overview
This is a static website showcasing hero profiles for the Al Meow Clan gaming community. The site features interactive flip cards with hero images, names, titles, and links to their TikTok profiles or Discord IDs.

## Project Architecture

### Structure
- **index.html** - Main HTML page with RTL (Arabic) support
- **style.css** - Custom CSS with cyber gaming dark theme
- **script.js** - Vanilla JavaScript for dynamic card generation and interactivity
- **server.py** - Python HTTP server serving static files on port 5000
- **Images** - Hero profile images (1.jpg through 11.jpg)
- **music.mp3** - Background music file

### Features
- Responsive grid layout for hero cards
- Interactive 3D flip cards (click to reveal back)
- Enhanced Discord ID display with one-click copy
- Support form with email integration (sends to gszgxgxvx@gmail.com)
- Animated background toggle with gradient effects
- Background music toggle with visual feedback
- Cache-control headers for proper update handling
- RTL support for Arabic text
- Cyber gaming theme with neon cyan accents

## Technology Stack
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Backend**: Python 3 (Flask)
- **Email Service**: Resend API
- **Fonts**: Google Fonts (Cairo, Tajawal)
- **Port**: 5000 (frontend)

## Environment Variables
- **RESEND_API_KEY**: Required for email functionality. Get a free API key from https://resend.com

## Recent Changes
- **2025-11-10**: Project imported from GitHub and configured for Replit
  - Converted from Vite/React setup to pure static HTML/CSS/JS
  - Added missing hero images (3-11.jpg) using stock images
  - Removed Tailwind dependencies and wrote custom CSS
  - Upgraded from simple HTTP server to Flask backend
  - Added support form with email integration (Resend API)
  - Enhanced ID copy functionality with visual feedback
  - Improved background toggle with animated gradients
  - Improved music toggle with visual feedback
  - Set up workflow to run on port 5000
  - Configured autoscale deployment

## Development

### Local Development
The site runs automatically via the configured workflow. The server binds to 0.0.0.0:5000 to work with Replit's preview system.

### Deployment
Configured for autoscale deployment, suitable for this static site that doesn't need persistent state.

## User Preferences
None specified yet.

## Notes
- The site uses Arabic (RTL) as the primary language
- All hero data is stored in script.js for easy editing
- Images are served from the root directory
- No build step required - pure static files
- Email functionality requires RESEND_API_KEY environment variable
- User rejected Resend connector integration, using manual API key setup instead
