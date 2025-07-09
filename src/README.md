# Portfolio 3D - React App

Una aplicación de portfolio interactivo en 3D construida con React y Spline.

## 🚀 Características

- **Escena 3D Interactiva**: Renderizada con Spline
- **CV Dinámico**: Carga datos desde GitHub Gist en formato YAML
- **Multiidioma**: Soporte para inglés y español
- **Responsive**: Optimizado para móviles y desktop
- **Animaciones**: Efectos de hover y click en objetos 3D
- **Audio**: Efectos de sonido para la guitarra
- **Modales**: Información detallada en paneles laterales

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes React
│   ├── Modal.jsx       # Modal lateral para información
│   └── SplineScene.jsx # Escena 3D de Spline
├── config/             # Configuraciones centralizadas
│   └── cv.js          # Configuración del CV y URLs
├── constants/          # Constantes de la aplicación
│   └── objects.js     # Nombres de objetos interactivos
├── hooks/              # Custom hooks
│   ├── useCV.js       # Gestión del CV dinámico
│   ├── useModal.js    # Gestión de modales
│   ├── useSplineAnimations.js # Animaciones de objetos
│   └── useSplineRef.js # Referencias de Spline
├── services/           # Servicios externos
│   ├── audioService.js # Gestión de audio
│   └── cvService.js   # Fetch y formateo del CV
├── utils/              # Utilidades
│   └── styles.js      # Estilos comunes
└── App.jsx            # Componente principal
```

## 🔧 Optimizaciones Implementadas

### 1. **Gestión de Estado Optimizada**
- Uso de `useRef` para evitar stale closures en event handlers
- Refs actualizados automáticamente cuando cambia el estado
- Eliminación de re-renders innecesarios

### 2. **Configuración Centralizada**
- URLs y configuraciones en `src/config/cv.js`
- Constantes reutilizables para secciones del CV
- Títulos de modales centralizados

### 3. **Rendimiento Mejorado**
- Eliminación de logs de debug innecesarios
- Optimización de funciones con `useCallback`
- Memoización de funciones costosas
- Evita fetches innecesarios con dependencias correctas

### 4. **Código Limpio**
- Eliminación de código comentado y logs
- Formateo consistente
- Separación clara de responsabilidades
- Nombres de variables y funciones descriptivos

## 🎯 Funcionalidades Principales

### CV Dinámico
- Carga desde GitHub Gist en formato YAML
- Soporte para múltiples idiomas
- Formateo automático con emojis y estructura
- Secciones: Educación, Certificaciones, Proyectos, Contacto, etc.

### Interactividad 3D
- Objetos clickeables en la escena
- Animaciones de hover y click
- Efectos de sonido para elementos específicos
- Modales informativos para cada sección

### Responsive Design
- Adaptación automática para móviles
- Prevención de scroll en dispositivos táctiles
- Modales optimizados para diferentes tamaños

## 🛠️ Tecnologías Utilizadas

- **React 18**: Framework principal
- **Spline**: Renderizado 3D
- **js-yaml**: Parsing de YAML
- **Vite**: Build tool
- **CSS-in-JS**: Estilos dinámicos

## 📦 Instalación y Uso

1. Clonar el repositorio
2. Instalar dependencias: `npm install`
3. Ejecutar en desarrollo: `npm run dev`
4. Construir para producción: `npm run build`

## 🔄 Flujo de Datos

1. **Inicialización**: App carga con idioma por defecto
2. **Fetch CV**: `useCV` hook carga datos desde GitHub Gist
3. **Event Handling**: Click en objetos 3D activa modales
4. **Content Display**: Datos formateados se muestran en modales
5. **Language Switch**: Cambio de idioma recarga datos automáticamente

## 🎨 Personalización

### Cambiar URL del CV
Editar `src/config/cv.js`:
```javascript
export const CV_CONFIG = {
  GIST_BASE_URL: 'tu-url-del-gist',
  // ...
};
```

### Agregar Nuevas Secciones
1. Actualizar `CV_SECTIONS` en `config/cv.js`
2. Agregar handler en `App.jsx`
3. Implementar formateo en `cvService.js`

### Modificar Estilos
Los estilos están centralizados en `src/utils/styles.js` y `src/components/Modal.jsx`.

## 🚀 Rendimiento

- **Lazy Loading**: CV se carga solo cuando es necesario
- **Memoización**: Funciones costosas memoizadas
- **Refs**: Evita re-renders innecesarios
- **Optimización de Event Handlers**: Uso eficiente de callbacks

## 📝 Notas de Desarrollo

- El proyecto usa Vite para desarrollo rápido
- Los datos del CV se almacenan en GitHub Gist para fácil actualización
- La estructura modular facilita el mantenimiento y escalabilidad
- El código está optimizado para evitar memory leaks y re-renders 