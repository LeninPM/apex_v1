# APEX - Sitio Web Estático

Sitio web estático para APEX, servicio de optimización y mejora de currículums profesionales.

## Estructura del Proyecto

```
/apex/
├── index.html          # Página principal
├── css/
│   └── styles.css      # Estilos personalizados
├── js/
│   └── script.js       # JavaScript del sitio
└── img/                # Imágenes y recursos visuales
```

## Características

- ✅ Sitio web completamente estático (sin backend)
- ✅ Formulario de contacto configurado para Netlify Forms
- ✅ Diseño responsive con Bootstrap 5
- ✅ Animaciones suaves y UX moderna
- ✅ Formulario multi-paso con validación

## Despliegue en Netlify

### Opción 1: Desde GitHub

1. Sube este proyecto a un repositorio de GitHub
2. Ve a [Netlify](https://www.netlify.com/) y crea una cuenta
3. Haz clic en "New site from Git"
4. Conecta tu repositorio de GitHub
5. Netlify detectará automáticamente la configuración:
   - **Build command**: (dejar vacío)
   - **Publish directory**: `.` (o dejar vacío)
6. Haz clic en "Deploy site"

### Opción 2: Arrastrar y Soltar

1. Comprime la carpeta `apex` en un archivo ZIP
2. Ve a [Netlify Drop](https://app.netlify.com/drop)
3. Arrastra el archivo ZIP a la página
4. ¡Listo! Tu sitio estará en línea

## Configuración del Formulario

El formulario está configurado para usar **Netlify Forms**:

- ✅ Atributo `data-netlify="true"` en el formulario
- ✅ Campo honeypot para protección contra spam
- ✅ Soporte para archivos adjuntos (CV en PDF, DOC, DOCX)

### Ver envíos del formulario

1. Ve al panel de Netlify
2. Navega a **Forms** en el menú lateral
3. Verás todos los envíos del formulario "contact"
4. Puedes configurar notificaciones por email o webhook

## Tecnologías Utilizadas

- **HTML5** - Estructura semántica
- **CSS3** - Estilos personalizados
- **JavaScript** - Interactividad y validación
- **Bootstrap 5.3** - Framework CSS
- **Font Awesome 6.0** - Iconos
- **Netlify Forms** - Manejo de formularios

## Notas Importantes

- Todas las rutas de archivos son relativas (sin Django)
- El formulario funciona completamente con Netlify Forms (sin backend)
- Asegúrate de que las imágenes estén en la carpeta `img/`
- Los estilos CSS están en `css/styles.css`
- El JavaScript está en `js/script.js`

## Contacto

Para más información sobre APEX:
- Email: a.p.e.x35264@gmail.com
- WhatsApp: +51 991 057 926

---

Desarrollado por **LICTECH** para **APEX**

