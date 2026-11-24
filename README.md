# Novena de Navidad · Familia Garrido Rocha

Aplicación web interactiva, cálida y participativa hecha por la **Familia Garrido Rocha** para rezar juntos en casa los **nueve días de la Novena de Aguinaldos colombiana**.

Funciona **100% en el navegador** (sin servidores privados ni bases de datos de pago), guarda el progreso y la personalización en **LocalStorage**, incluye los **textos tradicionales completos**, **reproducción musical integrada** y es totalmente compatible con **GitHub Pages**.

---

## Características principales

1. **Identidad familiar personalizable**:
   - Portada dedicada de la **Familia Garrido Rocha**, con emblema navideño SVG (o foto familiar), lema, mensaje de bienvenida y paletas de colores adaptables.
   - Panel interactivo (**botón "Personalizar"** en la barra superior) y archivo centralizado `src/config/institutionConfig.ts`.
   - Exportación e importación de la configuración en formato `.json`.

2. **Los 9 días completos de la Novena tradicional colombiana**:
   - Cada día (16 al 24 de diciembre) está organizado en **8 pasos navegables**:
     1. *Oración para todos los días* (texto íntegro tradicional).
     2. *Consideración correspondiente al día* (textos íntegros tradicionales del Día 1 al Día 9).
     3. *Oración a la Santísima Virgen María* (texto íntegro tradicional).
     4. *Oración a San José* (texto íntegro tradicional).
     5. *Gozos* (coro y las 12 estrofas completas con selector interactivo y acompañamiento musical).
     6. *Oración al Niño Jesús* (texto íntegro tradicional).
     7. *Reflexión o mensaje familiar del día* y preguntas para dialogar en casa.
     8. *Actividad en familia*, dinámica navideña, compromiso propuesto y formulario para dejar mensajes en el muro familiar.

3. **Funcionalidades interactivas**:
   - Indicador visual del día actual de celebración (automático entre el 16 y 24 de diciembre o configurable manualmente).
   - Barra de progreso de los 9 días y botón **"Marcar día como realizado"** con animación festiva y timbre navideño.
   - Control de tamaño de texto (`85%` a `135%`) para lectura cómoda desde celulares, tabletas o televisores en la sala.
   - **Música navideña de fondo**, **lectura en voz alta de oraciones** y **sección de Villancicos** con melodías integradas en Web Audio API y soporte para archivos `.mp3`/`.wav` locales.
   - **Muro Familiar ("En Familia")** para compartir bendiciones, deseos de paz y compromisos de unión, amor, solidaridad, respeto y fraternidad.

---

## Instalación y ejecución local

Requisitos previos: **Node.js 18 o superior** y **npm**.

1. Clona el repositorio y entra en la carpeta del proyecto:
   ```bash
   git clone https://github.com/TU_USUARIO/novena-garrido-rocha.git
   cd novena-garrido-rocha
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Inicia el servidor de desarrollo local:
   ```bash
   npm run dev
   ```
   Abre el navegador en `http://localhost:3000`.

4. Para generar la versión lista para producción (carpeta `dist/`):
   ```bash
   npm run build
   ```

---

## Cómo publicar gratis en GitHub Pages (paso a paso)

Este proyecto ya incluye `base: './'` en `vite.config.ts` y el flujo automático `.github/workflows/deploy.yml`.

1. **Crea un repositorio nuevo en GitHub** (por ejemplo, `novena-garrido-rocha`).
2. **Sube tu código a la rama `main`**:
   ```bash
   git init
   git add .
   git commit -m "Novena de Navidad Familia Garrido Rocha"
   git branch -M main
   git remote add origin https://github.com/TU_USUARIO/novena-garrido-rocha.git
   git push -u origin main
   ```
3. **Activa GitHub Pages en tu repositorio**:
   - Ve a **Settings** (Configuración) → **Pages** en el menú izquierdo de tu repositorio en GitHub.
   - En **Build and deployment → Source**, selecciona **GitHub Actions**.
4. **Comparte el enlace con toda la familia**:
   - Al finalizar el flujo en la pestaña **Actions**, GitHub publicará la aplicación en `https://TU_USUARIO.github.io/novena-garrido-rocha/` para abrirla desde cualquier celular, tableta o computador.
