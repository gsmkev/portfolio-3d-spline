# Portfolio 3D - React App

A modern 3D interactive portfolio built with React and Spline.

## 🚀 Features

- **3D Interactive Scene**: Rendered with Spline
- **Dynamic CV**: Loads data from GitHub Gist in YAML format
- **Multi-language**: Support for English and Spanish
- **Responsive**: Optimized for mobile and desktop
- **Animations**: Smooth hover and click effects on 3D objects
- **Audio**: Sound effects for interactive elements
- **Modals**: Detailed information in side panels

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── Modal.jsx       # Side modal for information
│   └── SplineScene.jsx # 3D Spline scene
├── config/             # Centralized configurations
│   ├── app.js         # App configuration and constants
│   └── cv.js          # CV configuration and URLs
├── constants/          # Application constants
│   └── objects.js     # Interactive object names
├── hooks/              # Custom hooks
│   ├── useCV.js       # Dynamic CV management
│   ├── useModal.js    # Modal management
│   ├── useSplineAnimations.js # Object animations
│   └── useSplineRef.js # Spline references
├── services/           # External services
│   ├── audioService.js # Audio management
│   └── cvService.js   # CV fetch and formatting
├── utils/              # Utilities
│   └── styles.js      # Common styles
└── App.jsx            # Main component
```

## 🔧 Optimizations Implemented

### 1. **State Management Optimization**
- Use of `useRef` to avoid stale closures in event handlers
- Refs automatically updated when state changes
- Elimination of unnecessary re-renders

### 2. **Centralized Configuration**
- URLs and configurations in `src/config/`
- Reusable constants for CV sections
- Centralized modal titles

### 3. **Performance Improvements**
- Removal of unnecessary debug logs
- Function optimization with `useCallback`
- Memoization of expensive functions
- Avoids unnecessary fetches with correct dependencies

### 4. **Clean Code**
- Removal of commented code and logs
- Consistent formatting
- Clear separation of responsibilities
- Descriptive variable and function names

## 🎯 Main Functionalities

### Dynamic CV
- Loads from GitHub Gist in YAML format
- Support for multiple languages
- Automatic formatting with clean structure
- Sections: Education, Certifications, Projects, Contact, etc.

### 3D Interactivity
- Clickable objects in the scene
- Hover and click animations
- Sound effects for specific elements
- Informative modals for each section

### Responsive Design
- Automatic adaptation for mobile devices
- Touch scroll prevention on mobile
- Modals optimized for different sizes

## 🛠️ Technologies Used

- **React 18**: Main framework
- **Spline**: 3D rendering
- **js-yaml**: YAML parsing
- **Vite**: Build tool
- **CSS-in-JS**: Dynamic styles

## 📦 Installation and Usage

1. Clone the repository
2. Install dependencies: `npm install`
3. Run in development: `npm run dev`
4. Build for production: `npm run build`

## 🔄 Data Flow

1. **Initialization**: App loads with default language
2. **CV Fetch**: `useCV` hook loads data from GitHub Gist
3. **Event Handling**: Click on 3D objects activates modals
4. **Content Display**: Formatted data displayed in modals
5. **Language Switch**: Language change automatically reloads data

## 🎨 Customization

### Change CV URL
Edit `src/config/cv.js`:
```javascript
export const CV_CONFIG = {
  GIST_BASE_URL: 'your-gist-url',
  // ...
};
```

### Add New Sections
1. Update `CV_SECTIONS` in `config/cv.js`
2. Add handler in `App.jsx`
3. Implement formatting in `cvService.js`

### Modify Styles
Styles are centralized in `src/utils/styles.js` and `src/components/Modal.jsx`.

## 🚀 Performance

- **Lazy Loading**: CV loads only when needed
- **Memoization**: Expensive functions memoized
- **Refs**: Avoids unnecessary re-renders
- **Event Handler Optimization**: Efficient callback usage

## 📝 Development Notes

- Project uses Vite for fast development
- CV data stored in GitHub Gist for easy updates
- Modular structure facilitates maintenance and scalability
- Code optimized to prevent memory leaks and re-renders

## 🎯 Code Quality

- **Clean Architecture**: Separation of concerns
- **Type Safety**: Consistent data structures
- **Performance**: Optimized rendering and state management
- **Maintainability**: Clear, documented code
- **Scalability**: Modular design for easy expansion 