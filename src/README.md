# Portfolio 3D Spline - Estructura Modular

Este proyecto ha sido refactorizado siguiendo las mejores prácticas de software engineering con una arquitectura modular y componentes reutilizables.

## Estructura de Directorios

```
src/
├── components/          # Componentes reutilizables
│   ├── Modal.jsx       # Componente modal para diálogos
│   └── SplineScene.jsx # Componente para la escena 3D
├── hooks/              # Hooks personalizados
│   ├── useModal.js     # Hook para manejo de modales
│   ├── useSplineRef.js # Hook para referencia de Spline
│   ├── useSplineAnimations.js # Hook para animaciones
│   └── useSplineEvents.js     # Hook para eventos de Spline
├── services/           # Servicios de la aplicación
│   └── audioService.js # Servicio para manejo de audio
├── constants/          # Constantes y configuraciones
│   └── objects.js      # Nombres de objetos y configuraciones
├── utils/              # Utilidades y helpers
│   └── styles.js       # Estilos comunes
└── App.jsx             # Componente principal (refactorizado)
```

## Componentes

### Modal.jsx
Componente reutilizable para mostrar diálogos modales con:
- Overlay con click para cerrar
- Animaciones suaves
- Estilos consistentes
- Props: `isOpen`, `onClose`, `title`, `content`

### SplineScene.jsx
Componente que encapsula la escena 3D de Spline con:
- Configuración de eventos
- Estilos consistentes
- Props: `onLoad`, `onMouseDown`, `onMouseHover`, `onMouseOut`

## Hooks Personalizados

### useModal.js
Maneja el estado del modal:
- `showDialog`: Estado de visibilidad
- `dialogTitle`: Título del diálogo
- `dialogContent`: Contenido del diálogo
- `showContentDialog(title, content)`: Función para mostrar diálogo
- `closeDialog()`: Función para cerrar diálogo

### useSplineRef.js
Maneja la referencia de Spline:
- `splineRef`: Referencia al objeto Spline
- `onLoad(spline)`: Callback cuando Spline se carga

### useSplineAnimations.js
Maneja las animaciones de levitación:
- `hoveredObjects`: Set de objetos en hover
- `handleObjectHover(objName, splineRef)`: Inicia animación de hover
- `handleObjectOut(objName, splineRef)`: Detiene animación de hover
- `cleanupAnimations()`: Limpia todas las animaciones

### useSplineEvents.js
Maneja los eventos de mouse en objetos:
- `handleSplineMouseDown(e)`: Maneja clicks en objetos
- Integración con audioService para efectos de sonido
- Integración con modal para mostrar contenido

## Servicios

### audioService.js
Servicio singleton para manejo de audio:
- `playMusic()`: Reproduce música (simulado)
- `playGuitarNotes()`: Toca notas de guitarra con Web Audio API
- `generateTone(note)`: Genera tonos específicos
- `stopAllAudio()`: Detiene todo el audio

## Constantes

### objects.js
Centraliza configuraciones:
- `INTERACTIVE_OBJECTS`: Nombres de objetos interactivos
- `ANIMATION_CONFIG`: Configuración de animaciones
- `MODAL_CONFIG`: Configuración del modal
- `DIALOG_CONTENT`: Contenido de los diálogos

## Utilidades

### styles.js
Estilos comunes reutilizables:
- `mainContainer`: Estilos del contenedor principal
- `splineContainer`: Estilos del contenedor de Spline
- `closeButton`: Estilos del botón de cerrar modal

## Beneficios de la Refactorización

1. **Separación de Responsabilidades**: Cada módulo tiene una responsabilidad específica
2. **Reutilización**: Componentes y hooks pueden ser reutilizados
3. **Mantenibilidad**: Código más fácil de mantener y debuggear
4. **Testabilidad**: Cada módulo puede ser testeado independientemente
5. **Escalabilidad**: Fácil agregar nuevas funcionalidades
6. **Legibilidad**: Código más limpio y organizado

## Uso

El componente principal `App.jsx` ahora es mucho más limpio y utiliza todos los hooks y componentes:

```jsx
function App() {
  const { splineRef, onLoad } = useSplineRef();
  const { showDialog, dialogTitle, dialogContent, showContentDialog, closeDialog } = useModal();
  const { handleObjectHover, handleObjectOut, cleanupAnimations } = useSplineAnimations();
  
  // ... resto del código simplificado
}
```

## Próximos Pasos

- Agregar PropTypes para validación de tipos
- Implementar tests unitarios
- Agregar TypeScript para mejor tipado
- Implementar lazy loading para componentes
- Agregar manejo de errores global 