// --- Lógica del Sitio Web Apex ---

// Se ejecuta cuando el contenido de la página se ha cargado completamente
document.addEventListener("DOMContentLoaded", () => {
  // Inicialización de todas las funcionalidades
  initSmoothScrolling();
  initForm();
  initScrollAnimations();
  initNavbarBehavior();
  initPricingButtons();
});

/**
 * Agrega un desplazamiento suave a todos los enlaces que apuntan a anclas (#)
 */
function initSmoothScrolling() {
  const navLinks = document.querySelectorAll('a[href^="#"]');
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        // Calcula la posición del objetivo restando la altura del navbar
        const offsetTop = targetSection.offsetTop - 76;
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });

        // Cierra el menú desplegable en móvil si está abierto
        const navbarCollapse = document.getElementById("navbarNav");
        if (navbarCollapse.classList.contains("show")) {
          const bsCollapse = new bootstrap.Collapse(navbarCollapse);
          bsCollapse.hide();
        }
      }
    });
  });
}

/**
 * Configura la lógica del formulario de varios pasos y la validación
 */
function initForm() {
  const cvForm = document.getElementById("cvForm");
  if (cvForm) {
    cvForm.addEventListener("submit", (e) => {
  if (!validateCurrentStep()) {
    e.preventDefault(); // Solo previene si la validación falla
  }
});

  }

  // Validación en tiempo real para el DNI (solo 8 dígitos numéricos)
  const dniInput = document.getElementById("dni");
  if (dniInput) {
    dniInput.addEventListener("input", function () {
      this.value = this.value.replace(/\D/g, "").substring(0, 8);
    });
  }

  // Validación del archivo al seleccionarlo
  const cvFileInput = document.getElementById("cv");
  if (cvFileInput) {
    cvFileInput.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (file) {
        validateFile(file, cvFileInput);
      }
    });
  }
}

/**
 * Cambia el fondo del navbar al hacer scroll
 */
function initNavbarBehavior() {
  const navbar = document.querySelector(".navbar");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("shadow");
      navbar.style.backgroundColor = "rgba(255, 255, 255, 0.95)";
    } else {
      navbar.classList.remove("shadow");
      navbar.style.backgroundColor = "rgba(255, 255, 255, 1)";
    }
  });
}

/**
 * Anima elementos para que aparezcan suavemente al hacer scroll
 */
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll(
    ".service-card, .pricing-card, .process-step, .advisory-card, .about-content, .hero-content, .hero-image, .about-image"
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
          observer.unobserve(entry.target); // Deja de observar el elemento una vez animado
        }
      });
    },
    { threshold: 0.1 }
  );

  animatedElements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
    observer.observe(el);
  });
}


// --- Lógica del Formulario Multi-Pasos ---

let currentStep = 1;
const formSteps = document.querySelectorAll(".form-step");
const totalSteps = formSteps.length;

/**
 * Navega al siguiente paso del formulario
 * @param {number} step - El número del paso al que se quiere ir
 */
window.nextStep = function(step) {
  if (validateCurrentStep()) {
    updateStep(step);
  }
};

/**
 * Navega al paso anterior del formulario
 * @param {number} step - El número del paso al que se quiere ir
 */
window.prevStep = function(step) {
  updateStep(step);
};

/**
 * Actualiza la interfaz para mostrar el paso correcto
 * @param {number} newStep - El número del nuevo paso
 */
function updateStep(newStep) {
  currentStep = newStep;

  // Actualiza los divs de los pasos
  formSteps.forEach((stepEl, index) => {
    stepEl.classList.toggle("active", index + 1 === currentStep);
  });

  // Actualiza los indicadores de paso (los círculos con números)
  const stepIndicators = document.querySelectorAll(".step");
  stepIndicators.forEach((indicator, index) => {
    indicator.classList.toggle("active", index + 1 === currentStep);
  });

  updateProgressLine();
  
  // Sube al inicio del formulario para una mejor UX
  document.getElementById("contacto").scrollIntoView({ behavior: "smooth", block: "start" });
}

/**
 * Valida los campos requeridos en el paso actual
 * @returns {boolean} - Devuelve true si el paso es válido
 */
function validateCurrentStep() {
  const currentStepElement = document.getElementById(`step${currentStep}`);
  const requiredFields = currentStepElement.querySelectorAll("[required]");
  let isValid = true;

  requiredFields.forEach((field) => {
    // Para checkboxes, valida la propiedad 'checked'
    const isCheckbox = field.type === 'checkbox';
    if ((isCheckbox && !field.checked) || (!isCheckbox && !field.value.trim())) {
      field.classList.add("is-invalid");
      // Muestra el feedback de invalidación de Bootstrap
      field.closest('.form-check')?.classList.add('was-validated');
      isValid = false;
    } else {
      field.classList.remove("is-invalid");
    }
  });

  if (!isValid) {
    showAlert("Por favor, completa todos los campos obligatorios (*).", "danger");
  }

  return isValid;
}


/**
 * Valida el archivo del CV (tamaño y tipo)
 * @param {File} file - El archivo a validar
 * @param {HTMLElement} inputElement - El elemento input del archivo
 * @returns {boolean}
 */
function validateFile(file, inputElement) {
  const maxSize = 5 * 1024 * 1024; // 5MB
  const allowedTypes = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];

  if (file.size > maxSize) {
    showAlert("El archivo es demasiado grande (máx. 5MB).", "danger");
    inputElement.value = "";
    return false;
  }

  if (!allowedTypes.includes(file.type)) {
    showAlert("Formato no válido. Solo se aceptan PDF, DOC y DOCX.", "danger");
    inputElement.value = "";
    return false;
  }
  return true;
}


/**
 * Actualiza la barra de progreso del formulario
 */
function updateProgressLine() {
    const progressBar = document.querySelector(".progress-bar");
    const progress = ((currentStep - 1) / (totalSteps - 1)) * 100;
    progressBar.style.width = `${progress}%`;
}


/**
 * Simula el envío del formulario y resetea la interfaz
 */
function handleFormSubmission() {
    const cvForm = document.getElementById("cvForm");
    const submitBtn = cvForm.querySelector('button[type="submit"]');
    const formData = new FormData(cvForm);

    // Muestra un estado de carga en el botón
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Enviando...';
    
    // --- IMPORTANTE: SIMULACIÓN DE ENVÍO ---
    // En una aplicación real, aquí es donde harías la llamada a tu backend
    // para procesar los datos, por ejemplo, usando fetch().
    
    /* Ejemplo de cómo sería con fetch:
    fetch('URL_DE_TU_API', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        console.log('Éxito:', data);
        showAlert("¡Registro completado exitosamente!", "success");
    })
    .catch(error => {
        console.error('Error:', error);
        showAlert("Hubo un error al enviar tu información.", "danger");
    })
    .finally(() => {
        // Resetea el botón sin importar el resultado
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fas fa-paper-plane me-2"></i>Enviar CV para Mejora';
    });
    */

    // Usamos setTimeout para simular la espera de la red
    console.log("Datos del formulario a enviar:", Object.fromEntries(formData));

    setTimeout(() => {
        // Restaura el botón
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fas fa-paper-plane me-2"></i>Enviar CV para Mejora';

        showAlert("¡Registro completado exitosamente! Nos pondremos en contacto contigo pronto.", "success");
        
        // Resetea el formulario y vuelve al primer paso
        cvForm.reset();
        updateStep(1);

    }, 2000);
}

/**
 * Muestra una alerta de Bootstrap en la parte superior de la página
 * @param {string} message - El mensaje a mostrar
 * @param {string} type - El tipo de alerta (e.g., 'success', 'danger', 'warning')
 */
function showAlert(message, type = "success") {
    const wrapper = document.createElement("div");
    wrapper.innerHTML = `
        <div class="alert alert-${type} alert-dismissible fade show" role="alert" style="position: fixed; top: 80px; left: 50%; transform: translateX(-50%); z-index: 1050;">
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    `;
    document.body.append(wrapper);

    // Elimina la alerta después de 5 segundos
    setTimeout(() => {
        wrapper.remove();
    }, 5000);
}


