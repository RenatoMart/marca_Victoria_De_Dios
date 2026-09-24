# CONEXION.md - Mapa de Relaciones del Proyecto

## Descripción General
Este documento explica en detalle cómo se relacionan todos los archivos del proyecto, quién llama a quién, y cómo fluye la información desde el punto de entrada hasta la renderización final.

---

## 1. FLUJO PRINCIPAL DE LA APLICACIÓN

### 1.1 Punto de Entrada: main.tsx
```
main.tsx (PUNTO DE INICIO)
    ↓
    Importa y renderiza: <App />
    ↓
    Monta la aplicación en: #root (index.html)
```

**Archivo:** `src/main.tsx`
**Función:** Inicializar React y montar el componente raíz
**Importa:**
- `React` de 'react'
- `ReactDOM` de 'react-dom/client'
- `App` de './App.tsx'
- `./index.css` (estilos globales)

**Relación:** Este es el primer archivo que se ejecuta. Busca el elemento con id="root" en index.html y monta ahí toda la aplicación React.

---

### 1.2 Componente Raíz: App.tsx
```
App.tsx (COMPONENTE RAÍZ)
    ↓
    Importa: BrowserRouter, Routes, Route (React Router)
    ↓
    Estructura:
    <BrowserRouter>
        <div className="app-container">
            <Header />                    ← Componente
            <main className="app-content">
                <Routes>
                    <Route path="/" element={<Home />} />      ← Página
                    <Route path="/about" element={<About />} /> ← Página
                </Routes>
            </main>
            <Footer />                    ← Componente
        </div>
    </BrowserRouter>
```

**Archivo:** `src/App.tsx`
**CSS asociado:** `src/App.css`
**Función:** Definir la estructura general y el sistema de rutas

**Importa:**
- `BrowserRouter, Routes, Route` de 'react-router-dom'
- `Header` de './components/Header'
- `Footer` de './components/Footer'
- `Home` de './pages/Home'
- `About` de './pages/About'
- `./App.css`

**Relaciones:**
- **Contiene siempre:** Header (arriba) y Footer (abajo)
- **Cambia según la ruta:** Home (/) o About (/about) en el medio
- **CSS:** App.css define .app-container y .app-content para el layout general

---

## 2. COMPONENTES GLOBALES (Siempre visibles)

### 2.1 Header.tsx
```
Header.tsx
    ↓
    Usa: useLocation() de React Router
    ↓
    Renderiza:
    <header className="header">
        <div className="header-logo">
            <span>■</span>
            <h1>TechStore Pro</h1>
        </div>
        <nav className="header-nav">
            <Link to="/" className={activa si pathname === "/"}>Inicio</Link>
            <Link to="/about" className={activa si pathname === "/about"}>Acerca de</Link>
        </nav>
    </header>
```

**Archivo:** `src/components/Header.tsx`
**CSS asociado:** `src/styles/Header.css`
**Función:** Navegación principal de la aplicación

**Importa:**
- `Link, useLocation` de 'react-router-dom'
- `../styles/Header.css`

**Relaciones:**
- **Llamado por:** App.tsx (se renderiza siempre)
- **Usa:** React Router para navegación (Link) y detectar página activa (useLocation)
- **CSS:** Header.css estiliza .header, .header-logo, .header-nav, .nav-link, .nav-link.active
- **Interacción:** Al hacer click en "Inicio" o "Acerca de", cambia la ruta y React Router actualiza el contenido en App.tsx

**Clases CSS usadas:**
- `.header` - Contenedor principal con fondo blanco y sticky
- `.header-logo` - Logo y título
- `.header-icon` - Símbolo ■
- `.header-title` - Texto "TechStore Pro"
- `.header-nav` - Contenedor de navegación
- `.nav-link` - Links individuales
- `.nav-link.active` - Link de la página actual (fondo gris oscuro)

---

### 2.2 Footer.tsx
```
Footer.tsx
    ↓
    Usa: new Date().getFullYear() (JavaScript nativo)
    ↓
    Renderiza:
    <footer className="footer">
        <div className="footer-container">
            <div className="footer-sections">
                <div className="footer-section">Contacto</div>
                <div className="footer-section">Redes Sociales</div>
                <div className="footer-section">Ubicación</div>
            </div>
            <div className="footer-bottom">
                <p>© 2025 TechStore Pro</p>
            </div>
        </div>
    </footer>
```

**Archivo:** `src/components/Footer.tsx`
**CSS asociado:** `src/styles/Footer.css`
**Función:** Información de contacto y copyright

**Importa:**
- `../styles/Footer.css`

**Relaciones:**
- **Llamado por:** App.tsx (se renderiza siempre)
- **CSS:** Footer.css estiliza .footer, .footer-container, .footer-sections, .footer-section, .footer-title, .footer-text, .footer-social, .footer-link, .footer-bottom, .footer-copyright
- **No tiene interacción:** Es un componente estático de presentación

**Clases CSS usadas:**
- `.footer` - Contenedor principal con fondo gris oscuro
- `.footer-container` - Contenedor con max-width
- `.footer-sections` - Grid de 3 columnas
- `.footer-section` - Cada sección individual
- `.footer-title` - Títulos de sección
- `.footer-text` - Texto informativo
- `.footer-social` - Contenedor de links sociales
- `.footer-link` - Links individuales con hover
- `.footer-bottom` - Sección de copyright
- `.footer-copyright` - Texto del copyright

---

## 3. PÁGINAS (Cambian según la ruta)

### 3.1 Home.tsx (Ruta: /)
```
Home.tsx
    ↓
    Importa componentes:
    - LogoAnimation (AnimeJS)
    - Card (React)
    ↓
    Define: Array de productos (6 productos)
    ↓
    Renderiza:
    <div className="home-container">
        <section className="hero-section">
            <LogoAnimation />           ← Componente con AnimeJS
            <p className="hero-subtitle">Las mejores ofertas...</p>
        </section>
        
        <section className="products-section">
            <h2 className="section-title">Productos Destacados</h2>
            <div className="products-grid">
                {products.map(product => 
                    <Card {...product} />   ← Componente repetido 6 veces
                )}
            </div>
        </section>
    </div>
```

**Archivo:** `src/pages/Home.tsx`
**CSS asociado:** `src/styles/Home.css`
**Función:** Página principal con logo animado y productos

**Importa:**
- `Card` de '../components/Card'
- `LogoAnimation` de '../components/LogoAnimation'
- `../styles/Home.css`

**Relaciones:**
- **Llamado por:** App.tsx cuando la ruta es "/"
- **Usa componente:** LogoAnimation (1 vez, en hero)
- **Usa componente:** Card (6 veces, mapeando array de productos)
- **CSS:** Home.css estiliza .home-container, .hero-section, .hero-subtitle, .products-section, .section-title, .products-grid

**Datos internos:**
```javascript
const products = [
    { title: 'Laptop Gaming Pro', description: '...', imageUrl: '...', price: '$1,299', discount: '-15%' },
    { title: 'Smartphone Ultra 5G', ... },
    { title: 'Auriculares Pro Wireless', ... },
    { title: 'Tablet Creator 12.9"', ... },
    { title: 'Smartwatch Elite', ... },
    { title: 'Cámara Mirrorless 4K', ... }
]
```

**Flujo de datos:**
1. Home define el array `products`
2. Home mapea el array: `products.map(product => <Card {...product} />)`
3. Cada `product` (objeto) se pasa como props al componente Card
4. Card recibe: title, description, imageUrl, price, discount

**Clases CSS usadas:**
- `.home-container` - Contenedor principal blanco
- `.hero-section` - Sección superior con fondo gris degradado
- `.hero-subtitle` - Texto descriptivo
- `.products-section` - Sección de productos con padding
- `.section-title` - Título "Productos Destacados"
- `.products-grid` - Grid responsive de productos

---

### 3.2 About.tsx (Ruta: /about)
```
About.tsx
    ↓
    Importa componentes:
    - AboutLogoAnimation (AnimeJS)
    - Presentation (AnimeJS)
    ↓
    Renderiza:
    <div className='about-container'>
        <div className='about-hero'>
            <AboutLogoAnimation />  ← Logo animado "SOBRE NOSOTROS"
        </div>
        <div className='about-content'>
            <Presentation
                title="Nuestra Historia"
                paragraphs={[...]}
            />  ← Presentación animada tipo diapositivas
            <div className='about-features'>...</div>
            <div className='about-team'>...</div>
        </div>
    </div>
```

**Archivo:** `src/pages/About.tsx`
**CSS asociado:** `src/styles/About.css`
**Función:** Página "Acerca de" con logo animado y presentación de la historia

**Importa:**
- `AboutLogoAnimation` de '../components/AboutLogoAnimation'
- `Presentation` de '../components/Presentation'
- `../styles/About.css'

**Relaciones:**
- **Llamado por:** App.tsx cuando la ruta es "/about"
- **Usa componente:** AboutLogoAnimation (1 vez, en hero)
- **Usa componente:** Presentation (1 vez, con título y párrafos)
- **CSS:** About.css estiliza .about-container, .about-hero, .about-content, etc.

---

## 4. COMPONENTES DE UI

### 4.1 Card.tsx (Componente React Puro)
```
Card.tsx
    ↓
    Recibe props:
    - title: string
    - description: string
    - imageUrl?: string
    - linkUrl?: string
    - price?: string
    - discount?: string
    ↓
    Usa: useState para isHovered
    ↓
    Renderiza:
    <div className="card" onMouseEnter/onMouseLeave onClick>
        {discount && <div className="card-discount">{discount}</div>}
        {imageUrl && <div className="card-image-container">
            <img src={imageUrl} alt={title} />
        </div>}
        <div className="card-content">
            <h3 className="card-title">{title}</h3>
            <p className="card-description">{description}</p>
            <div className="card-footer">
                {price && <span className="card-price">{price}</span>}
                <button className="card-button">Comprar</button>
            </div>
        </div>
    </div>
```

**Archivo:** `src/components/Card.tsx`
**CSS asociado:** `src/styles/Card.css`
**Función:** Tarjeta de producto con imagen, descripción y precio

**Importa:**
- `useState` de 'react'
- `../styles/Card.css`

**Recibe props desde:** Home.tsx (cada objeto del array products)

**Props esperados:**
```typescript
type CardProps = {
    title: string;          // Obligatorio
    description: string;    // Obligatorio
    imageUrl?: string;      // Opcional
    linkUrl?: string;       // Opcional (no usado actualmente)
    price?: string;         // Opcional
    discount?: string;      // Opcional
}
```

**Relaciones:**
- **Llamado por:** Home.tsx (6 instancias, una por producto)
- **Recibe datos:** A través de props desde el array products en Home.tsx
- **Estado interno:** `isHovered` (boolean) - controla si el mouse está sobre la tarjeta
- **CSS:** Card.css estiliza .card, .card-hovered, .card-discount, .card-image-container, .card-image, .card-content, .card-title, .card-description, .card-footer, .card-price, .card-button

**Eventos:**
- `onMouseEnter` - Activa isHovered = true (agrega clase .card-hovered)
- `onMouseLeave` - Activa isHovered = false (quita clase .card-hovered)
- `onClick` - Abre linkUrl en nueva pestaña (si existe)

**Clases CSS usadas:**
- `.card` - Contenedor principal con fondo blanco y borde
- `.card-hovered` - Se aplica cuando el mouse está encima
- `.card:hover` - Eleva la tarjeta 4px
- `.card-discount` - Badge de descuento (esquina superior derecha)
- `.card-image-container` - Contenedor de imagen 220px
- `.card-image` - Imagen del producto (escala 1.05 en hover)
- `.card-content` - Contenedor del contenido con padding
- `.card-title` - Título del producto
- `.card-description` - Descripción del producto
- `.card-footer` - Contenedor de precio y botón
- `.card-price` - Precio grande y bold
- `.card-button` - Botón "Comprar"

---

### 4.2 LogoAnimation.tsx (Componente con AnimeJS)
```
LogoAnimation.tsx
    ↓
    Usa: useEffect, useRef de React
    Usa: anime de 'animejs'
    ↓
    Define: text = 'STORE'
    ↓
    useEffect ejecuta 3 animaciones de AnimeJS:
    1. Entrada (translateY, opacity, scale)
    2. Pulso continuo (scale loop)
    3. Cambio de color (color loop)
    ↓
    Renderiza:
    <div ref={containerRef} className="logo-animation-container">
        <div className="logo-text">
            {text.split('').map((letter, index) =>
                <span ref={lettersRef[index]} className="logo-letter">
                    {letter}
                </span>
            )}
        </div>
    </div>
```

**Archivo:** `src/components/LogoAnimation.tsx`
**CSS asociado:** `src/styles/LogoAnimation.css`
**Función:** Logo "STORE" animado con AnimeJS

**Importa:**
- `useEffect, useRef` de 'react'
- `anime` de 'animejs'
- `../styles/LogoAnimation.css`

**Relaciones:**
- **Llamado por:** Home.tsx (1 vez, en la sección hero)
- **Usa librería externa:** AnimeJS para animaciones
- **CSS:** LogoAnimation.css estiliza .logo-animation-container, .logo-text, .logo-letter

**Funcionamiento interno:**

1. **Refs:**
   - `containerRef` - Referencia al div contenedor
   - `lettersRef` - Array de referencias a cada letra (S, T, O, R, E)

2. **useEffect se ejecuta al montar:**
   ```javascript
   useEffect(() => {
       // Animación 1: Entrada
       anime({
           targets: lettersRef.current,  // Las 5 letras
           translateY: [50, 0],          // De 50px abajo a posición normal
           opacity: [0, 1],              // De invisible a visible
           scale: [0.8, 1],              // De 80% a 100%
           delay: anime.stagger(100),    // Cada letra 100ms después
           duration: 1000,
           easing: 'easeOutExpo'
       });

       // Animación 2: Pulso continuo
       anime({
           targets: lettersRef.current,
           scale: [1, 1.05, 1],         // Crece 5% y vuelve
           duration: 3000,
           delay: anime.stagger(150),
           loop: true,                   // Infinito
           easing: 'easeInOutSine'
       });

       // Animación 3: Cambio de color
       anime({
           targets: lettersRef.current,
           color: [
               { value: '#2c3e50' },    // Gris oscuro
               { value: '#34495e' },    // Gris medio
               { value: '#2c3e50' }     // Vuelve a oscuro
           ],
           duration: 6000,
           delay: anime.stagger(300),
           loop: true,                   // Infinito
           easing: 'linear'
       });
   }, []);
   ```

3. **Renderizado:**
   - `'STORE'.split('')` → ['S', 'T', 'O', 'R', 'E']
   - `.map()` crea 5 `<span>` elementos
   - Cada `<span>` tiene:
     - `className="logo-letter"`
     - `ref` asignado a `lettersRef[index]`
     - Contenido: la letra

**Clases CSS usadas:**
- `.logo-animation-container` - Contenedor centrado con fondo gradient
- `.logo-text` - Contenedor flex de las letras
- `.logo-letter` - Cada letra individual (7rem, gris oscuro)

---

### 4.3 AboutLogoAnimation.tsx (Componente con AnimeJS)
```
AboutLogoAnimation.tsx
    ↓
    Usa: useEffect, useRef de React
    Usa: anime de 'animejs'
    ↓
    Define: text = 'SOBRE NOSOTROS'
    ↓
    useEffect ejecuta 2 animaciones de AnimeJS:
    1. Entrada (opacity, translateY)
    2. Pulso continuo (scale loop)
    ↓
    Renderiza:
    <div ref={containerRef} className="about-logo-animation-container">
        <div className="about-logo-text">
            {text.split(' ').map((word, index) =>
                <div key={index} className="about-logo-word">
                    {word.split('').map((letter, i) =>
                        <span key={i} ref={lettersRef[i]} className="about-logo-letter">
                            {letter}
                        </span>
                    )}
                </div>
            )}
        </div>
    </div>
```

**Archivo:** `src/components/AboutLogoAnimation.tsx`
**CSS asociado:** `src/styles/AboutLogoAnimation.css`
**Función:** Logo "SOBRE NOSOTROS" animado con AnimeJS

**Importa:**
- `useEffect, useRef` de 'react'
- `anime` de 'animejs'
- `../styles/AboutLogoAnimation.css`

**Relaciones:**
- **Llamado por:** About.tsx (1 vez, en la sección hero)
- **Usa librería externa:** AnimeJS para animaciones
- **CSS:** AboutLogoAnimation.css estiliza .about-logo-animation-container, .about-logo-text, .about-logo-word, .about-logo-letter

**Funcionamiento interno:**

1. **Refs:**
   - `containerRef` - Referencia al div contenedor
   - `lettersRef` - Array de referencias a cada letra

2. **useEffect se ejecuta al montar:**
   ```javascript
   useEffect(() => {
       // Animación 1: Entrada
       anime({
           targets: lettersRef.current,  // Todas las letras
           opacity: [0, 1],              // De invisible a visible
           translateY: [30, 0],          // De 30px abajo a posición normal
           delay: anime.stagger(100),    // Cada letra 100ms después
           duration: 800,
           easing: 'easeOutExpo'
       });

       // Animación 2: Pulso continuo
       anime({
           targets: lettersRef.current,
           scale: [1, 1.05, 1],         // Crece 5% y vuelve
           duration: 3000,
           delay: anime.stagger(150),
           loop: true,                   // Infinito
           easing: 'easeInOutSine'
       });
   }, []);
   ```

3. **Renderizado:**
   - `'SOBRE NOSOTROS'.split(' ')` → ['SOBRE', 'NOSOTROS']
   - `.map()` crea 2 `<div class="about-logo-word">`
   - Por cada palabra, se mapea cada letra a un `<span>` con `className="about-logo-letter"`

**Clases CSS usadas:**
- `.about-logo-animation-container` - Contenedor centrado
- `.about-logo-text` - Contenedor flex de las palabras
- `.about-logo-word` - Cada palabra en una línea
- `.about-logo-letter` - Cada letra individual (5rem, gris oscuro)

---

### 4.4 Presentation.tsx (Componente de Presentación)
```
Presentation.tsx
    ↓
    Recibe props:
    - title: string
    - paragraphs: string[]
    ↓
    Usa: useEffect, useRef de React
    Usa: anime de 'animejs'
    ↓
    useEffect ejecuta 2 animaciones de AnimeJS:
    1. Entrada del título (translateX, opacity)
    2. Entrada de párrafos (translateX, opacity con stagger)
    ↓
    Renderiza:
    <div ref={containerRef} className="presentation-container">
        <h2 ref={titleRef} className="presentation-title">{title}</h2>
        {paragraphs.map((paragraph, index) =>
            <p
                key={index}
                ref={el => { if (el) paragraphRefs.current[index] = el; }}
                className="presentation-text"
            >
                {paragraph}
            </p>
        )}
    </div>
```

**Archivo:** `src/components/Presentation.tsx`
**CSS asociado:** `src/styles/Presentation.css`
**Función:** Componente de presentación animada tipo diapositivas

**Importa:**
- `useEffect, useRef` de 'react'
- `anime` de 'animejs'
- `../styles/Presentation.css`

**Relaciones:**
- **Llamado por:** About.tsx (1 vez, en el contenido)
- **Usa librería externa:** AnimeJS para animaciones
- **CSS:** Presentation.css estiliza .presentation-container, .presentation-title, .presentation-text

**Funcionamiento interno:**

1. **Refs:**
   - `containerRef` - Referencia al div contenedor
   - `titleRef` - Referencia al título
   - `paragraphRefs` - Array de referencias a cada párrafo

2. **useEffect se ejecuta al montar:**
   ```javascript
   useEffect(() => {
       // Animación del título
       anime({
           targets: titleRef.current,
           translateX: [-100, 0],
           opacity: [0, 1],
           duration: 800,
           easing: 'easeOutQuad'
       });

       // Animación de párrafos como diapositivas
       anime({
           targets: paragraphRefs.current,
           translateX: [200, 0],
           opacity: [0, 1],
           delay: anime.stagger(500, { start: 1000 }),
           duration: 600,
           easing: 'easeOutQuad'
       });
   }, []);
   ```

3. **Renderizado:**
   - Renderiza el título con `ref={titleRef}`
   - `.map()` crea párrafos con `ref` asignado a `paragraphRefs[index]`

**Clases CSS usadas:**
- `.presentation-container` - Contenedor con padding y fondo
- `.presentation-title` - Título grande centrado
- `.presentation-text` - Párrafos con margen

---

## 5. ARCHIVOS CSS Y SUS RELACIONES

### 5.1 index.css (Estilos Globales)
**Archivo:** `src/index.css`
**Importado por:** main.tsx (se aplica a toda la aplicación)

**Afecta a:**
- `*` - Reset de margin, padding, box-sizing
- `:root` - Variables de fuente, color, fondo
- `a` - Estilos de enlaces globales
- `body` - Fondo gris claro (#f8f9fa)
- `#root` - Contenedor raíz transparente
- `h1` - Tamaño de fuente global
- `button` - Estilos base de botones

**Propósito:** Estilos base que se aplican en toda la aplicación

---

### 5.2 App.css (Layout Principal)
**Archivo:** `src/App.css`
**Importado por:** App.tsx

**Clases definidas:**
- `.app-container` - Flex column, min-height 100vh, fondo gris claro
- `.app-content` - Flex 1, fondo blanco

**Afecta a:** La estructura principal de App.tsx

---

### 5.3 Home.css (Página Home)
**Archivo:** `src/styles/Home.css`
**Importado por:** Home.tsx

**Clases definidas:**
- `.home-container` - Contenedor principal blanco
- `.hero-section` - Sección superior con gradient
- `.hero-subtitle` - Texto descriptivo gris
- `.products-section` - Sección de productos con padding
- `.section-title` - Título grande centrado
- `.products-grid` - Grid responsive (1-4 columnas según pantalla)

**Media queries:**
- Mobile (< 768px): 1 columna
- Tablet (768-1024px): 2 columnas
- Desktop (1025-1399px): 3 columnas
- XL (≥ 1400px): 4 columnas

---

### 5.4 Header.css (Componente Header)
**Archivo:** `src/styles/Header.css`
**Importado por:** Header.tsx

**Clases definidas:**
- `.header` - Fondo blanco, sticky, borde inferior
- `.header-logo` - Flex con gap para icono y título
- `.header-icon` - Símbolo ■
- `.header-title` - Texto "TechStore Pro"
- `.header-nav` - Flex con gap para links
- `.nav-link` - Links con padding y border-radius
- `.nav-link:hover` - Hover con fondo gris claro
- `.nav-link.active` - Página activa con fondo gris oscuro

**Media queries:**
- < 768px: Header en columna, nav full width
- < 480px: Solo iconos en nav (texto oculto)

---

### 5.5 Footer.css (Componente Footer)
**Archivo:** `src/styles/Footer.css`
**Importado por:** Footer.tsx

**Clases definidas:**
- `.footer` - Fondo gris oscuro (#2c3e50)
- `.footer-container` - Max-width 1200px centrado
- `.footer-sections` - Grid responsive de secciones
- `.footer-section` - Cada sección individual
- `.footer-title` - Títulos de sección
- `.footer-text` - Texto informativo
- `.footer-social` - Flex para links sociales
- `.footer-link` - Links con hover sutil
- `.footer-bottom` - Borde superior para copyright
- `.footer-copyright` - Texto del copyright

**Media queries:**
- < 768px: 1 columna, links full width

---

### 5.6 Card.css (Componente Card)
**Archivo:** `src/styles/Card.css`
**Importado por:** Card.tsx

**Clases definidas:**
- `.card` - Contenedor blanco con borde y sombra
- `.card:hover` - Elevación y sombra más grande
- `.card-hovered` - Borde gris oscuro (cuando isHovered = true)
- `.card-discount` - Badge de descuento (esquina superior derecha)
- `.card-image-container` - Contenedor de imagen 220px
- `.card-image` - Imagen del producto (escala 1.05 en hover)
- `.card-content` - Padding y flex column
- `.card-title` - Título del producto
- `.card-description` - Descripción del producto
- `.card-footer` - Contenedor de precio y botón
- `.card-price` - Precio grande y bold
- `.card-button` - Botón "Comprar"

**Media queries:**
- < 768px: Footer en columna, botón full width

---

### 5.7 LogoAnimation.css (Componente Logo)
**Archivo:** `src/styles/LogoAnimation.css`
**Importado por:** LogoAnimation.tsx

**Clases definidas:**
- `.logo-animation-container` - Flex centrado con gradient de fondo
- `.logo-text` - Flex centrado con gap entre letras
- `.logo-letter` - Letra 7rem, gris oscuro, sombra sutil, opacity 0 inicial

**Media queries:**
- < 768px: Letras 4.5rem
- < 480px: Letras 3rem

**Nota:** La opacity 0 inicial es importante - AnimeJS la anima a 1 en el useEffect

---

### 5.8 AboutLogoAnimation.css (Componente Logo Sobre Nosotros)
**Archivo:** `src/styles/AboutLogoAnimation.css`
**Importado por:** AboutLogoAnimation.tsx

**Clases definidas:**
- `.about-logo-animation-container` - Flex centrado
- `.about-logo-text` - Flex centrado de las palabras
- `.about-logo-word` - Cada palabra en una línea
- `.about-logo-letter` - Cada letra individual (5rem, gris oscuro)

**Media queries:**
- < 768px: Letras 3rem

---

### 5.9 Presentation.css (Componente Presentación)
**Archivo:** `src/styles/Presentation.css`
**Importado por:** Presentation.tsx

**Clases definidas:**
- `.presentation` - Contenedor con padding y fondo gris claro
- `.presentation-title` - Título grande y bold
- `.presentation-content` - Contenedor de los párrafos
- `.presentation-paragraph` - Cada párrafo con margen

---

## 6. FLUJO COMPLETO DE DATOS

### Ejemplo: Mostrar un Producto en Home

```
1. main.tsx inicia la aplicación
   ↓
2. main.tsx renderiza <App />
   ↓
3. App.tsx renderiza estructura:
   - <Header /> (siempre visible)
   - <Routes> (cambia según URL)
   - <Footer /> (siempre visible)
   ↓
4. Usuario navega a "/" (raíz)
   ↓
5. React Router renderiza <Home />
   ↓
6. Home.tsx ejecuta:
   - Define array 'products' con 6 objetos
   - Renderiza <LogoAnimation /> (1 vez)
   - Renderiza {products.map(product => <Card {...product} />)} (6 veces)
   ↓
7. Por cada producto:
   Card.tsx recibe props:
   {
       title: 'Laptop Gaming Pro',
       description: 'Potente laptop...',
       imageUrl: 'https://...',
       price: '$1,299',
       discount: '-15%'
   }
   ↓
8. Card.tsx renderiza:
   - <img> con imageUrl
   - <h3> con title
   - <p> con description
   - <span> con price
   - <div> con discount
   - <button> "Comprar"
   ↓
9. Card.css aplica estilos a cada elemento
   ↓
10. Usuario ve la tarjeta en pantalla
```

---

## 7. FLUJO DE ANIMACIONES (AnimeJS)

### LogoAnimation en Home

```
1. Home.tsx importa y renderiza <LogoAnimation />
   ↓
2. LogoAnimation.tsx se monta en el DOM
   ↓
3. useEffect se ejecuta (solo una vez al montar)
   ↓
4. Se crean refs para containerRef y lettersRef[]
   ↓
5. Se ejecutan 3 animaciones de anime() en paralelo:
   
   Animación A (entrada - 1 segundo):
   - lettersRef[0] (S): opacity 0→1, translateY 50→0, delay 200ms
   - lettersRef[1] (T): opacity 0→1, translateY 50→0, delay 300ms
   - lettersRef[2] (O): opacity 0→1, translateY 50→0, delay 400ms
   - lettersRef[3] (R): opacity 0→1, translateY 50→0, delay 500ms
   - lettersRef[4] (E): opacity 0→1, translateY 50→0, delay 600ms
   
   Animación B (pulso - infinito):
   - Todas las letras: scale 1→1.05→1 cada 3 segundos
   
   Animación C (color - infinito):
   - Todas las letras: color #2c3e50 → #34495e → #2c3e50 cada 6 segundos
   ↓
6. LogoAnimation.css aplica estilos base (color, tamaño, sombras)
   ↓
7. AnimeJS modifica inline styles (transform, opacity, color)
   ↓
8. Usuario ve "STORE" aparecer letra por letra con animaciones
```

---

### AboutLogoAnimation en About

```
1. About.tsx importa y renderiza <AboutLogoAnimation />
   ↓
2. AboutLogoAnimation.tsx se monta en el DOM
   ↓
3. useEffect se ejecuta (solo una vez al montar)
   ↓
4. Se crean refs para containerRef y lettersRef[]
   ↓
5. Se ejecutan 2 animaciones de anime() en paralelo:
   
   Animación A (entrada - 800ms):
   - lettersRef[0] (S): opacity 0→1, translateY 30→0, delay 200ms
   - lettersRef[1] (O): opacity 0→1, translateY 30→0, delay 300ms
   - lettersRef[2] (B): opacity 0→1, translateY 30→0, delay 400ms
   - lettersRef[3] (R): opacity 0→1, translateY 30→0, delay 500ms
   - lettersRef[4] (E): opacity 0→1, translateY 30→0, delay 600ms
   - lettersRef[5] (N): opacity 0→1, translateY 30→0, delay 700ms
   - lettersRef[6] (O): opacity 0→1, translateY 30→0, delay 800ms
   - lettersRef[7] (S): opacity 0→1, translateY 30→0, delay 900ms
   - lettersRef[8] (O): opacity 0→1, translateY 30→0, delay 1000ms
   - lettersRef[9] (T): opacity 0→1, translateY 30→0, delay 1100ms
   - lettersRef[10] (R): opacity 0→1, translateY 30→0, delay 1200ms
   - lettersRef[11] (O): opacity 0→1, translateY 30→0, delay 1300ms
   - lettersRef[12] (S): opacity 0→1, translateY 30→0, delay 1400ms
   
   Animación B (pulso - infinito):
   - Todas las letras: scale 1→1.05→1 cada 3 segundos
   ↓
6. AboutLogoAnimation.css aplica estilos base (color, tamaño, sombras)
   ↓
7. AnimeJS modifica inline styles (transform, opacity, color)
   ↓
8. Usuario ve "SOBRE NOSOTROS" aparecer letra por letra con animaciones
```

---

## 8. SISTEMA DE RUTAS (React Router)

### Navegación entre páginas

```
Estado inicial: URL = "/"
    ↓
App.tsx renderiza:
- Header (con Link to="/")
- <Route path="/" element={<Home />} />  ← ACTIVA
- <Route path="/about" element={<About />} />  ← INACTIVA
- Footer
    ↓
Usuario ve: Home con productos
    ↓
Usuario hace click en Link "Acerca de" en Header
    ↓
React Router intercepta el click
    ↓
React Router cambia URL a "/about"
    ↓
React Router desmonta <Home />
    ↓
React Router monta <About />
    ↓
Header actualiza (useLocation detecta pathname = "/about")
    ↓
Header aplica clase .active al Link "/about"
    ↓
Usuario ve: About con información de la empresa
    ↓
Header y Footer permanecen igual (no se desmontan)
```

---

## 9. EVENTOS Y ESTADOS

### Card.tsx - Manejo de hover

```
Estado inicial:
- isHovered = false
- className="card"
    ↓
Usuario mueve mouse sobre la tarjeta
    ↓
Evento onMouseEnter se dispara
    ↓
setIsHovered(true)
    ↓
React re-renderiza Card
    ↓
className="card card-hovered"
    ↓
Card.css aplica estilos de .card-hovered (borde gris oscuro)
    ↓
Usuario ve borde gris oscuro aparecer
    ↓
Usuario mueve mouse fuera de la tarjeta
    ↓
Evento onMouseLeave se dispara
    ↓
setIsHovered(false)
    ↓
React re-renderiza Card
    ↓
className="card"
    ↓
Borde gris desaparece
```

### Header.tsx - Detección de ruta activa

```
Usuario está en "/" (Home)
    ↓
Header usa: const location = useLocation()
    ↓
location.pathname = "/"    // O "/about"

className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
```
React Router proporciona `useLocation()` que devuelve un objeto con `pathname` (la ruta actual).

---

## 10. RESUMEN DE DEPENDENCIAS

### Dependencias entre archivos:

```
main.tsx
└── App.tsx
    ├── Header.tsx
    │   └── Header.css
    ├── Home.tsx (ruta /)
    │   ├── Home.css
    │   ├── LogoAnimation.tsx
    │   │   └── LogoAnimation.css
    │   └── Card.tsx (x6)
    │       └── Card.css
    ├── About.tsx (ruta /about)
    │   ├── AboutLogoAnimation.tsx
    │   │   └── AboutLogoAnimation.css
    │   └── Presentation.tsx
    │       └── Presentation.css
    └── Footer.tsx
        └── Footer.css

index.css (global, importado por main.tsx)
App.css (importado por App.tsx)
```

### Dependencias de librerías externas:

```
React (react)
├── useState
├── useEffect
├── useRef
└── Componentes JSX

React DOM (react-dom/client)
└── createRoot

React Router (react-router-dom)
├── BrowserRouter
├── Routes
├── Route
├── Link
└── useLocation

AnimeJS (animejs)
└── anime (función de animación)
```

---

## 11. CONVENCIONES DE NOMBRES

### Estructura de nombres:

**Componentes (PascalCase):**
- `App.tsx` → componente `App`
- `Header.tsx` → componente `Header`
- `LogoAnimation.tsx` → componente `LogoAnimation`

**Páginas (PascalCase):**
- `Home.tsx` → componente `Home`
- `About.tsx` → componente `About`

**CSS (kebab-case o PascalCase):**
- `index.css` - Global
- `App.css` - Para App.tsx
- `Home.css` - Para Home.tsx
- `Header.css` - Para Header.tsx

**Clases CSS (kebab-case):**
- `.app-container`
- `.hero-section`
- `.card-title`
- `.nav-link`

**Variables JavaScript (camelCase):**
- `products` - array de datos
- `isHovered` - estado boolean
- `containerRef` - referencia
- `currentYear` - variable

---

## 12. ORDEN DE CARGA Y EJECUCIÓN

### Timeline de carga completa:

```
Tiempo 0ms: Navegador carga index.html
    ↓
Tiempo 50ms: Navegador encuentra <script src="main.tsx">
    ↓
Tiempo 100ms: Vite compila main.tsx y dependencias
    ↓
Tiempo 200ms: main.tsx ejecuta
    ↓
Tiempo 210ms: index.css se aplica (estilos globales)
    ↓
Tiempo 220ms: App.tsx se monta
    ↓
Tiempo 230ms: App.css se aplica
    ↓
Tiempo 240ms: Header.tsx se monta
    ↓
Tiempo 250ms: Header.css se aplica
    ↓
Tiempo 260ms: React Router detecta ruta "/"
    ↓
Tiempo 270ms: Home.tsx se monta
    ↓
Tiempo 280ms: Home.css se aplica
    ↓
Tiempo 290ms: LogoAnimation.tsx se monta
    ↓
Tiempo 300ms: LogoAnimation.css se aplica
    ↓
Tiempo 310ms: LogoAnimation useEffect ejecuta
    ↓
Tiempo 320ms: AnimeJS inicia animación de entrada (1 segundo)
    ↓
Tiempo 330ms: Card.tsx (x6) se montan
    ↓
Tiempo 340ms: Card.css se aplica a las 6 tarjetas
    ↓
Tiempo 350ms: Footer.tsx se monta
    ↓
Tiempo 360ms: Footer.css se aplica
    ↓
Tiempo 500ms: Primera letra "S" aparece (animación)
    ↓
Tiempo 600ms: Segunda letra "T" aparece
    ↓
Tiempo 700ms: Tercera letra "O" aparece
    ↓
Tiempo 800ms: Cuarta letra "R" aparece
    ↓
Tiempo 900ms: Quinta letra "E" aparece
    ↓
Tiempo 1320ms: Animación de entrada completa
    ↓
Tiempo 1321ms: Animaciones de pulso y color empiezan (infinitas)
    ↓
Tiempo ∞: Aplicación lista y respondiendo a interacciones
```

---

## 13. PREGUNTAS FRECUENTES

### ¿Por qué Card se renderiza 6 veces?
```javascript
// En Home.tsx
products.map(product => <Card {...product} />)
```
El array `products` tiene 6 elementos, entonces `.map()` crea 6 componentes Card, cada uno con diferentes props.

### ¿Cómo sabe Header qué página está activa?
```javascript
const location = useLocation();  // Hook de React Router
// location.pathname = "/" o "/about"

className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
```
React Router proporciona `useLocation()` que devuelve un objeto con `pathname` (la ruta actual).

### ¿Por qué las animaciones son infinitas?
```javascript
anime({
    // ...
    loop: true  // Esta propiedad hace que la animación se repita
})
```

### ¿Dónde se definen los datos de los productos?
Los datos están hardcodeados en `Home.tsx`:
```javascript
const products = [
    { title: 'Laptop...', ... },
    // ... 5 más
]
```
En una aplicación real, estos vendrían de una API o base de datos.

### ¿Por qué algunos CSS tienen `@media`?
Los `@media queries` hacen el diseño responsive. Cambian estilos según el tamaño de pantalla:
```css
@media (max-width: 768px) {
    .products-grid {
        grid-template-columns: 1fr;  /* 1 columna en móvil */
    }
}
```

---

## 14. DIAGRAMA DE FLUJO VISUAL

```
┌─────────────────────────────────────────────────────────┐
│                      index.html                         │
│                     (div id="root")                     │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
            ┌────────────────┐
            │   main.tsx     │ ← Importa index.css (global)
            └────────┬───────┘
                     │
                     ▼
            ┌────────────────┐
            │    App.tsx     │ ← Importa App.css
            └────────┬───────┘
                     │
        ┌────────────┼────────────┐
        │            │            │
        ▼            ▼            ▼
   ┌─────────┐  ┌─────────┐  ┌────────┐
   │ Header  │  │ Routes  │  │ Footer │
   │   .tsx  │  │         │  │  .tsx  │
   └────┬────┘  └────┬────┘  └───┬────┘
        │            │            │
        ▼            │            ▼
   Header.css        │       Footer.css
                     │
          ┌──────────┴──────────┐
          │                     │
          ▼                     ▼
     ┌─────────┐          ┌──────────┐
     │  Home   │          │  About   │
     │  .tsx   │          │   .tsx   │
     └────┬────┘          └──────────┘
          │                     │
          ├── Home.css          ├── About.css
          │                     │
          ├── LogoAnimation.tsx ├── AboutLogoAnimation.tsx
          │   └── LogoAnimation.css   └── AboutLogoAnimation.css
          │                     │
          └── Card.tsx (x6)     └── Presentation.tsx
              └── Card.css          └── Presentation.css
              └─ Props: title, description, imageUrl, price, discount
```

