# Tech Riwayaat - Vite + React Website

A high-performance, responsive website built with **Vite** and **React**. Features a modern design with white background, sticky navigation bar, and professional service badges.

## 🚀 Features

✨ **Vite Framework** - Lightning-fast development and build  
📱 **Fully Responsive** - Mobile, tablet, desktop optimized  
🎨 **Modern Design** - Clean white theme with green accents  
⚡ **Fast Performance** - Optimized for production  
🔒 **React Icons** - Professional icon library  
♿ **Accessible** - Keyboard navigation support  
📊 **Service Badges** - Professional chip components above CTA buttons  

## 📋 Components

### Navbar
- Sticky positioning (stays visible while scrolling)
- Logo with gradient icon
- Centered navigation links with icons
- "Schedule a Call" button on right
- Mobile hamburger menu with smooth animations

### Hero Section
- Eye-catching main heading with green highlights
- Professional tagline on single line
- Detailed description
- **Service Badges** with icons (4 horizontal chips):
  - 💻 WEB DESIGN & DEV
  - 📱 MOBILE APPS
  - 🤖 AGENTIC AI
  - ⚙️ WORDPRESS & PLUGINS
- Call-to-action buttons (Explore Services, Let's Talk)
- Trust badge with client statistics
- Fully responsive layout

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Quick Start

1. **Extract the project:**
   ```bash
   unzip tech-riwayaat.zip
   cd tech-riwayaat
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   - The browser will automatically open at `http://localhost:3000`
   - Or manually navigate to it

5. **Build for production:**
   ```bash
   npm run build
   ```

6. **Preview production build:**
   ```bash
   npm run preview
   ```

## 📁 Project Structure

```
tech-riwayaat/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Navbar.css
│   │   ├── Hero.jsx
│   │   └── Hero.css
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── vite.config.js
├── package.json
└── README.md
```

## 🎨 Design System

### Colors
- **Primary Green**: `#00d97e`
- **Dark Green**: `#00b366`
- **Text Dark**: `#1a1a1a`
- **Text Gray**: `#666`, `#555`
- **Background**: `#ffffff`
- **Borders**: `#e0e0e0`, `#e8e8e8`

### Typography
- **Font Family**: System UI fonts (best compatibility)
- **Heading Size**: 72px (Desktop), 48px (Tablet), 36px (Mobile)
- **Body Size**: 16px
- **Font Weights**: 400, 500, 600, 700

### Responsive Breakpoints
- **Desktop**: 1400px and up
- **Tablet**: 768px - 1399px
- **Mobile**: Below 768px
- **Small Mobile**: Below 480px

## 📦 Dependencies

- **react**: ^18.2.0 - React library
- **react-dom**: ^18.2.0 - React DOM rendering
- **react-icons**: ^5.0.0 - Professional icon library

## 🔧 Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Create optimized production build
- `npm run preview` - Preview production build locally

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🎯 Key Improvements Over CRA

- ⚡ **Faster Build Times** - Vite is significantly faster than Create React App
- 📦 **Smaller Bundle** - Better tree-shaking and optimization
- 🔄 **Instant Hot Reload** - Lightning-fast development feedback
- 🚀 **Production Optimized** - Automatic code splitting and minification

## 🛠️ Customization

### Change Brand Name
Edit `Navbar.jsx` and update the logo text:
```jsx
<span>Your Brand Name</span>
```

### Modify Colors
Edit the CSS files and update the color values:
```css
--primary-green: #00d97e;
```

### Add New Sections
1. Create a new component in `src/components/`
2. Import it in `App.jsx`
3. Add the component to the JSX

### Change Service Badges
Edit the `services` array in `Hero.jsx` to add, remove, or modify services.

## 📈 Performance

- Optimized images and assets
- CSS-in-JS for scoped styling
- Smooth animations using CSS transitions
- Mobile-first responsive design
- Touch-friendly interactive elements

## 🐛 Troubleshooting

### Port Already in Use
If port 3000 is busy, Vite will use the next available port.

### Module Not Found Errors
Run `npm install` again to ensure all dependencies are installed.

### Build Issues
Clear cache and reinstall:
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

## 📄 License

© 2024 Tech Riwayaat. All rights reserved.

## 📞 Support

For questions or issues, please contact support@techriwayaat.com

---

**Happy coding!** 🚀
