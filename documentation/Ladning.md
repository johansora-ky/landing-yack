# Estructura de Landing Page: Presentación de YACK 🐆

Esta propuesta de estructura para la *landing page* está basada en los lineamientos del Manual de Identidad y la estrategia de la Brand Mascot de KrediYA.

---

## 1. Hero Section (Inicio y Presentación)
**Objetivo:** Generar un impacto visual inmediato ("stopper effect"), presentar a YACK y establecer el tono cercano de la comunicación.

* **Visual:** Un render 3D ultra-realista de YACK (con su hoodie fucsia con el logo "YA" y zapatillas azules) en una pose amigable y relajada, saludando o invitando a interactuar.
* **Titular Principal (H1):** ¡Hola! Soy YACK, tu nuevo compañero en KrediYA.
* **Subtítulo (H2):** Estoy aquí para acompañarte, orientarte y hacer que tus finanzas sean mucho más fáciles de entender.
* **Llamado a la acción (CTA):** "Conoce mi historia" (Desplaza hacia abajo).

---

## 2. Sección: ¿Quién soy y de dónde vengo? (El Origen)
**Objetivo:** Conectar culturalmente con el usuario y explicar el simbolismo detrás del jaguar, reforzando la identidad Latam.

* **Visual:** Una animación o secuencia de imágenes que muestre a YACK en diferentes escenarios (educación, consejería), destacando su agilidad y confianza.
* **Titular:** Fuerte, ágil y siempre a tu lado.
* **Copy:** * *¿Por qué un jaguar?* Porque es el felino más poderoso de América y un símbolo de protección y liderazgo desde nuestras culturas precolombinas. 
    * Al igual que el jaguar, mi misión es proteger tu tranquilidad financiera y guiarte en cada paso que des con KrediYA.

---

## 3. Sección: Mi Misión Contigo (El Rol Estratégico)
**Objetivo:** Dejar claro qué hace YACK (y qué NO hace). Es clave posicionarlo como educador y guía, no como vendedor.

* **Estructura:** Un grid de 3 o 4 columnas con íconos o mini-ilustraciones de YACK interactuando.
* **Puntos clave a destacar:**
    1.  **Te hablo claro:** Sin palabras enredadas. Te explico los procesos de forma sencilla.
    2.  **Te acompaño, no te vendo:** No estoy aquí para ofrecerte promociones, estoy aquí para ayudarte a organizarte y darte tips financieros útiles.
    3.  **Resuelvo tus dudas:** Si necesitas ayuda en Atención al Cliente (ATC), seré la cara amable que te acompañará para encontrar soluciones.
    4.  **Generando Confianza:** Validaré tus preocupaciones sin juzgarte y te orientaré con seguridad.

---

## 4. Sección: Mi Personalidad (Ficha de Personaje)
**Objetivo:** Humanizar a YACK y hacer que los usuarios sientan simpatía por él.

* **Visual:** Ficha tipo "ID Card" o perfil de red social de YACK con datos curiosos.
* **Detalles del Perfil:**
    * **Estilo:** Relajado pero seguro. ¡Siempre llevo mi hoodie fucsia!
    * **Actitud:** Positiva, empática y amigable.
    * **Frase favorita:** “Vamos paso a paso, tú no estás solo.”
    * **Lo que me gusta:** Dar consejos breves y accionables (Tips) y usar emojis (¡con moderación! 😉).
    * **Lo que evito:** Los discursos comerciales, el tono autoritario y las presiones.

---

## 5. Sección: Descargables y Goodies (Conexión Emocional)
**Objetivo:** Llevar a YACK a la vida diaria del usuario, aprovechando su escalabilidad transversal.

* **Visual:** Mockups de teléfonos con stickers de WhatsApp de YACK, fondos de pantalla o posts de redes sociales.
* **Copy:** ¡Lleva a YACK contigo! Descarga mis stickers para WhatsApp y úsalos en tus chats.
* **Botones de descarga:** "Descargar Stickers", "Descargar Wallpapers".

---

## 6. Footer / Call to Action Final
**Objetivo:** Redirigir al usuario hacia la experiencia principal de KrediYA, ahora con una percepción más amigable.

* **Titular:** ¿Listo para empezar nuestro camino juntos?
* **Copy:** Descarga la app de KrediYA y descubre cómo puedo ayudarte a manejar tus finanzas con confianza.
* **Botón Principal (CTA):** "Ir a la App" o "Hablar con Soporte".

------------------------------------------------------------------------

### 1. REQUERIMIENTOS DE UX/INTERACCIÓN (CRÍTICO)
La página debe comportarse exactamente como una presentación de diapositivas (Slides) sin scroll visible.
- Contenedores de tamaño `100vh` y `100vw`.
- Scroll nativo del navegador DESACTIVADO (`overflow: hidden`).
- Transición entre secciones: Debe ser una transición de opacidad (Fade-out / Fade-in) de 0.5s, dando la sensación de que la pantalla cambia por completo sin movimiento de arrastre vertical.
- Navegación mediante:
  1. Flechas del teclado (Arriba/Abajo).
  2. Rueda del ratón (detectar evento `wheel` con un `debounce` o tiempo de espera para no saltar varias pantallas de golpe).

### 2. COLORES Y MARCA (PRIORIDAD ABSOLUTA)
- El color Magenta/Fucsia es el protagonista indiscutible.
- Usa estrictamente esta paleta oficial de KrediYA:
  - Magenta: #E70F47
  - Azul Claro: #0368E0
  - Azul Primario: #004EBC
  - Azul Oscuro: #0046AD
- Gradientes permitidos (úsalos para fondos inmersivos):
  - Magenta Gradient: linear-gradient(135deg, #B61C2D, #E70F47)
  - Blue Gradient: linear-gradient(135deg, #0046AD, #004DFF)
- Logos (Usa etiquetas <img> con estas URLs):
  - Versión Color: https://www.krediya.com/hs-fs/hubfs/krdya_new_color_full.png?width=90&height=25&name=krdya_new_color_full.png
  - Versión Negativo (Blanco): https://22317019.fs1.hubspotusercontent-na1.net/hubfs/22317019/sourceweb/Logos_Krdya/krdya_white_full.png