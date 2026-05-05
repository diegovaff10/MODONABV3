        // Smooth Scroll Setup (Lenis)
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: 'vertical',
            smooth: true
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        // GSAP ScrollTrigger Integration
        gsap.registerPlugin(ScrollTrigger);
        lenis.on('scroll', ScrollTrigger.update);
        gsap.ticker.add((time) => lenis.raf(time * 1000));
        gsap.ticker.lagSmoothing(0);

        /* ── GSAP Choreography ── */

        // 1. Initial Hero Reveal (Split Text Effect)
        gsap.to('.hero .line-mask span', {
            y: 0,
            duration: 1.2,
            stagger: 0.1,
            ease: "power4.out",
            delay: 0.2
        });

        gsap.from('.stat-anim', {
            opacity: 0,
            y: 20,
            duration: 1,
            stagger: 0.1,
            ease: "power2.out",
            delay: 0.8
        });

        gsap.to('.hero-action', { opacity: 1, duration: 1, delay: 1.2 });

        // 2. Scroll Reveals for Headers
        gsap.utils.toArray('h2 .line-mask span').forEach(el => {
            gsap.to(el, {
                y: 0,
                duration: 1.2,
                ease: "power4.out",
                scrollTrigger: {
                    trigger: el,
                    start: "top 85%"
                }
            });
        });

        // 3. Image Parallax Effect
        gsap.utils.toArray('.parallax-img').forEach(img => {
            gsap.to(img, {
                yPercent: -15,
                ease: "none",
                scrollTrigger: {
                    trigger: img,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true
                }
            });
        });

        // Background Video Parallax
        gsap.utils.toArray('.parallax-bg').forEach(bg => {
            gsap.to(bg, {
                yPercent: 10,
                ease: "none",
                scrollTrigger: {
                    trigger: bg.parentElement,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true
                }
            });
        });

        /* ── Interactive Accordion (Services) ── */
        // Set initial heights
        gsap.set('.accordion-item:not(.active) .acc-content-wrapper', { height: 0 });
        gsap.set('.accordion-item.active .acc-content-wrapper', { height: 'auto' });

        const accordions = document.querySelectorAll('.accordion-item');
        accordions.forEach(acc => {
            const header = acc.querySelector('.acc-header');

            header.addEventListener('click', () => {
                const content = acc.querySelector('.acc-content-wrapper');
                const icon = acc.querySelector('.arrow-icon');
                const isOpen = acc.classList.contains('active');

                // Close all
                accordions.forEach(other => {
                    other.classList.remove('active');
                    gsap.to(other.querySelector('.acc-content-wrapper'), { height: 0, duration: 0.5, ease: "power2.inOut" });
                    other.querySelector('.arrow-icon').innerText = '↘';
                    other.querySelector('.acc-title').classList.remove('color-blue');
                });

                // Open clicked
                if (!isOpen) {
                    acc.classList.add('active');
                    gsap.to(content, { height: "auto", duration: 0.5, ease: "power2.inOut" });
                    icon.innerText = '↗';
                    acc.querySelector('.acc-title').classList.add('color-blue');
                }
            });
        });

        /* ── Team Hover Reveal Interaction ── */
        const hoverImg = document.querySelector('.hover-img-container');
        const teamItems = document.querySelectorAll('.team-list-item');

        if (hoverImg && teamItems.length) {
            // Quick setters for GSAP performance on mousemove
            const setX = gsap.quickSetter(hoverImg, "x", "px");
            const setY = gsap.quickSetter(hoverImg, "y", "px");

            window.addEventListener('mousemove', (e) => {
                setX(e.clientX - 175); // Center width (350/2)
                setY(e.clientY - 225); // Center height (450/2)
            });

            teamItems.forEach(item => {
                item.addEventListener('mouseenter', () => {
                    const img = item.getAttribute('data-img');
                    hoverImg.style.backgroundImage = `url('${img}')`;
                    gsap.to(hoverImg, { opacity: 1, scale: 1, duration: 0.3, ease: "power2.out" });

                    // Dim other items slightly
                    teamItems.forEach(other => {
                        if (other !== item) other.style.opacity = '0.3';
                    });
                });
                item.addEventListener('mouseleave', () => {
                    gsap.to(hoverImg, { opacity: 0, scale: 0.9, duration: 0.3, ease: "power2.out" });
                    teamItems.forEach(other => other.style.opacity = '1');
                });
            });
        }

        /* ── Horizontal Scroll for Courses (desktop only) ── */
        const coursesContainer = document.querySelector('.courses-container');
        if (coursesContainer && window.innerWidth > 768) {
            gsap.to(coursesContainer, {
                x: () => -(coursesContainer.scrollWidth - window.innerWidth + (window.innerWidth * 0.08)),
                ease: "none",
                scrollTrigger: {
                    trigger: ".courses",
                    start: "top top",
                    end: () => "+=" + coursesContainer.scrollWidth,
                    pin: true,
                    scrub: 1
                }
            });
        }

        /* ── Footer GSAP Fix ── */
        gsap.to('.footer-giant .line-mask span', {
            y: 0,
            duration: 1.2,
            ease: "power4.out",
            scrollTrigger: {
                trigger: '.footer-giant',
                start: "top 95%"
            }
        });

        /* ── Language Toggle Logic ── */
        const translations = {
            en: {
                'Modonab Elite | Odontología Avanzada': 'Modonab Elite | Advanced Dentistry',
                'Cambiar idioma': 'Change language',
                'AGENDAR CITA': 'BOOK APPOINTMENT',
                'SERVICIOS': 'SERVICES',
                'EQUIPO': 'TEAM',
                'ACADEMIA': 'ACADEMY',
                'CONTACTO': 'CONTACT',
                'NOCHE 🌙': 'NIGHT 🌙',
                'DÍA ☀️': 'DAY ☀️',
                'CAMBIAR MODO VISUAL': 'CHANGE VISUAL MODE',
                'Años de Práctica': 'Years of Practice',
                'Sonrisas Perfectas': 'Perfect Smiles',
                'Tratamiento Alta Calidad': 'High Quality Treatment',
                'CUIDAMOS DE': 'WE CARE FOR',
                'TU SONRISA': 'YOUR SMILE',
                'Y': 'AND',
                'SALUD': 'HEALTH',
                'Modonab Elite es una clínica dental moderna donde las tecnologías avanzadas se combinan con un enfoque individualizado para cada paciente.': 'Modonab Elite is a modern dental clinic where advanced technologies meet an individualized approach for every patient.',
                'VER SERVICIOS ↗': 'VIEW SERVICES ↗',
                'NOSOTROS': 'ABOUT US',
                'MERECE': 'DESERVES',
                'LA': 'THE',
                'EXCELENCIA': 'EXCELLENCE',
                'Tecnología': 'Technology',
                'TECNOLOGÍAS INNOVADORAS': 'INNOVATIVE TECHNOLOGIES',
                'La clínica cuenta con tecnología de vanguardia para asegurar una experiencia perfecta y sin dolor para cada paciente.': 'The clinic features state-of-the-art technology to ensure a seamless and pain-free experience for every patient.',
                'Desde diseño de sonrisa hasta implantes complejos, garantizamos resultados óptimos con el más alto nivel de comodidad.': 'From smile design to complex implants, we deliver optimal results with the highest level of comfort.',
                'AGENDAR CONSULTA ↗': 'BOOK CONSULTATION ↗',
                'Instrumental': 'Instruments',
                'EXPERIMENTA': 'EXPERIENCE',
                'EL ARTE': 'THE ART',
                'DE LA': 'OF',
                'ODONTOLOGÍA': 'DENTISTRY',
                'DE LUJO': 'LUXURY',
                'NUESTROS': 'OUR',
                'Tecnología CAD/CAM y arte clínico al servicio de tu sonrisa. Planificamos cada tratamiento con precisión digital y ejecución de lujo.': 'CAD/CAM technology and clinical artistry at the service of your smile. We plan every treatment with digital precision and premium execution.',
                'DISEÑO DE SONRISA': 'SMILE DESIGN',
                'Flujo Digital Completo (DSD)': 'Complete Digital Workflow (DSD)',
                'Diseñamos tu nueva sonrisa antes de comenzar cualquier procedimiento. Mediante escáner intraoral y software de diseño, visualizás el resultado final en 3D antes de la primera sesión clínica.': 'We design your new smile before beginning any procedure. Using an intraoral scanner and design software, you can preview the final 3D result before the first clinical session.',
                'Carillas de porcelana': 'Porcelain veneers',
                'Coronas CAD/CAM': 'CAD/CAM crowns',
                'Blanqueamiento': 'Whitening',
                'Contorneado gingival': 'Gum contouring',
                'AGENDAR EVALUACIÓN ↗': 'BOOK EVALUATION ↗',
                'IMPLANTES DENTALES': 'DENTAL IMPLANTS',
                'Implantología de Alta Precisión': 'High-Precision Implantology',
                'Restauramos tu función masticatoria y tu estética con implantes de titanio de última generación. La corona final replica perfectamente la anatomía de tu diente natural, sin que nadie pueda distinguirla.': 'We restore chewing function and aesthetics with latest-generation titanium implants. The final crown perfectly replicates the anatomy of your natural tooth, so no one can tell the difference.',
                'Carga inmediata': 'Immediate loading',
                'Implante unitario': 'Single implant',
                'Regeneración ósea': 'Bone regeneration',
                'ODONTOLOGÍA ESTÉTICA': 'AESTHETIC DENTISTRY',
                'Rehabilitación Estética Integral': 'Comprehensive Aesthetic Rehabilitation',
                'Desde blanqueamientos profesionales hasta rehabilitaciones completas con carillas de porcelana, trabajamos cada detalle para que tu sonrisa sea armónica, natural y duradera. Especialistas en el tratamiento de dientes manchados, fracturados o desgastados.': 'From professional whitening to complete rehabilitations with porcelain veneers, we work on every detail so your smile looks harmonious, natural, and long-lasting. Specialists in treating stained, fractured, or worn teeth.',
                'Blanqueamiento LED': 'LED whitening',
                'Carillas E.max': 'E.max veneers',
                'Composite directo': 'Direct composite',
                'Rehabilitación total': 'Full rehabilitation',
                'CIRUGÍA GUIADA': 'GUIDED SURGERY',
                'Planificación 3D & Guía Quirúrgica': '3D Planning & Surgical Guide',
                'Planificamos cada cirugía de implantes en 3D mediante tomografía computada. La guía quirúrgica impresa en 3D nos permite ejecutar la intervención con una precisión milimétrica, reduciendo el tiempo de recuperación y maximizando la seguridad del paciente.': 'We plan every implant surgery in 3D using computed tomography. The 3D-printed surgical guide allows us to perform the procedure with millimetric precision, reducing recovery time and maximizing patient safety.',
                'Guía impresa 3D': '3D-printed guide',
                'Sin colgajo': 'Flapless',
                'Recuperación rápida': 'Fast recovery',
                'NUESTRO EQUIPO —': 'OUR TEAM —',
                'TU CONFIANZA': 'YOUR TRUST',
                'LAURA BAZÁN': 'LAURA BAZÁN',
                'Especializada en Cirugía Dentoalveolar, Odontología Estética y Rehabilitadora. Formación en FUCS Colombia, NYU y FACOP Brasil. Trainer oficial de Scanner Virtuo Vivo STRAUMANN.': 'Specialized in dentoalveolar surgery, aesthetic dentistry, and rehabilitation. Trained at FUCS Colombia, NYU, and FACOP Brazil. Official STRAUMANN Virtuo Vivo Scanner trainer.',
                'DIRECTORA CLÍNICA': 'CLINICAL DIRECTOR',
                'GABRIEL NAIGUS': 'GABRIEL NAIGUS',
                'Especialista en Periodoncia (Maimónides), Prótesis Dentobucomaxilar (UBA) e Implantología (NYU). Docente titular en Odontología Digital y mentor de CEREC de Dentsply Sirona.': 'Specialist in Periodontics (Maimónides), Dentobucomaxillofacial Prosthetics (UBA), and Implantology (NYU). Professor of Digital Dentistry and CEREC mentor for Dentsply Sirona.',
                'SOCIO FUNDADOR': 'FOUNDING PARTNER',
                'FORMACIÓN PROFESIONAL': 'PROFESSIONAL TRAINING',
                'MODONAB': 'MODONAB',
                'PRESENCIAL / 5 DÍAS': 'IN-PERSON / 5 DAYS',
                'CURSO INTENSIVO: ESTÉTICA DIGITAL': 'INTENSIVE COURSE: DIGITAL AESTHETICS',
                'CURSO INTENSIVO: CIRUGÍA GUIADA': 'INTENSIVE COURSE: GUIDED SURGERY',
                'VER CURSO ↗': 'VIEW COURSE ↗',
                'CURSO INTENSIVO / 5 DÍAS': 'INTENSIVE COURSE / 5 DAYS',
                'ESTÉTICA': 'AESTHETICS',
                'DIGITAL': 'DIGITAL',
                'Convertite en especialista en estética dental digital y dominá el flujo completo de trabajo, desde el diagnóstico hasta la ejecución clínica. Este programa intensivo de 5 días está diseñado para odontólogos que buscan integrar tecnología, precisión y criterio estético en su práctica diaria. El enfoque combina teoría y práctica real, permitiéndote trabajar con pacientes asignados por el equipo de ModoNab desde el inicio.': 'Become a specialist in digital dental aesthetics and master the complete workflow, from diagnosis to clinical execution. This intensive 5-day program is designed for dentists who want to integrate technology, precision, and aesthetic judgment into their daily practice. The program combines theory with real practice, allowing you to work with patients assigned by the ModoNab team from the very beginning.',
                'CONSULTAR DISPONIBILIDAD ↗': 'CHECK AVAILABILITY ↗',
                'Modalidad': 'Format',
                'Presencial': 'In-person',
                'Duración': 'Duration',
                '5 días': '5 days',
                'Ubicación': 'Location',
                'Mendoza': 'Mendoza',
                'Dirigido a': 'For',
                'Odontólogos': 'Dentists',
                'INSCRIBIRME': 'ENROLL',
                'DESCARGAR PDF': 'DOWNLOAD PDF',
                'QUÉ VAS A APRENDER': 'WHAT YOU WILL LEARN',
                'DEL DIAGNÓSTICO A LA EJECUCIÓN CLÍNICA': 'FROM DIAGNOSIS TO CLINICAL EXECUTION',
                'Planificación orofacial y digital': 'Orofacial and digital diagnosis',
                'Fotografía clínica, análisis facial, diseño de sonrisa y comunicación visual del plan de tratamiento.': 'Clinical photography, facial analysis, smile design, and visual communication of the treatment plan.',
                'Flujo digital completo': 'Complete digital workflow',
                'Diseño de sonrisa, mock-ups, test drives, provisionales y coordinación con laboratorio para restauraciones estéticas.': 'Smile design, mock-ups, test drives, provisionals, and lab coordination for aesthetic restorations.',
                'Tecnología y materiales': 'Technology and materials',
                'Escáner intraoral, software de diseño, impresión 3D, materiales de alta estética y cementación adhesiva.': 'Intraoral scanner, design software, 3D printing, high-aesthetic materials, and adhesive cementation.',
                'Práctica clínica y posicionamiento': 'Clinical practice and positioning',
                'Trabajo con casos reales, ejecución de restauraciones y estrategias de venta para potenciar tu mercado.': 'Work with real cases, execute restorations, and apply sales strategies to strengthen your market presence.',
                'CIRUGÍA': 'SURGERY',
                'GUIADA': 'GUIDED',
                'Dominá la cirugía guiada y llevá tu práctica al siguiente nivel mediante el uso de tecnología digital avanzada. Este programa intensivo está diseñado para odontólogos que buscan incorporar precisión, planificación digital y predictibilidad en implantología. Durante el curso, vas a aprender a planificar cirugías mediante software especializado, interpretar tomografías con exactitud y diseñar guías quirúrgicas personalizadas. El enfoque combina teoría, simulación y práctica, permitiéndote comprender todo el proceso desde el diagnóstico hasta la ejecución clínica.': 'Master guided surgery and take your practice to the next level through advanced digital technology. This intensive program is designed for dentists who want to incorporate precision, digital planning, and predictability into implantology. During the course, you will learn how to plan surgeries using specialized software, accurately interpret CT scans, and design custom surgical guides. The program combines theory, simulation, and practice, allowing you to understand the full process from diagnosis to clinical execution.',
                'PLANIFICACIÓN DIGITAL Y CIRUGÍA GUIADA': 'DIGITAL PLANNING AND GUIDED SURGERY',
                'Planificación digital y diagnóstico': 'Digital surgical planning and diagnosis',
                'Software especializado, interpretación precisa de tomografías y diseño de guías quirúrgicas personalizadas.': 'Specialized software, accurate CT interpretation, and custom surgical guide design.',
                'Escaneo e integración de imágenes': 'Scanning and image integration',
                'Escáneres intraorales y extraorales, integración de imágenes tomográficas y herramientas CAD-CAM para casos implantológicos completos.': 'Intraoral and extraoral scanners, tomographic image integration, and CAD-CAM tools for complete implant cases.',
                'Guías y materiales': 'Guides and materials',
                'Fundamentos de impresión 3D, diseño y fabricación de guías quirúrgicas, selección de materiales y componentes protéticos.': '3D printing fundamentals, guide design and fabrication, and selection of materials and prosthetic components.',
                'Protocolos mínimamente invasivos': 'Minimally invasive protocols',
                'Intervenciones menos invasivas, más rápidas y altamente predecibles con análisis de casos clínicos reales.': 'Less invasive, faster, and highly predictable interventions with real case analysis.',
                'Flujo clínico-laboratorio': 'Clinical-laboratory workflow',
                'Confección de prótesis, uso de fresadoras, cementación y ajustes finales para la rehabilitación completa del paciente.': 'Prosthesis fabrication, milling, cementation, and final adjustments for complete patient rehabilitation.',
                'VOLVER A CURSOS ↗': 'BACK TO COURSES ↗',
                'Curso Estética Digital': 'Digital Aesthetics Course',
                'Curso Cirugía Guiada': 'Guided Surgery Course',
                'DISEÑÁ TU': 'DESIGN YOUR',
                'NUEVA': 'NEW',
                'SONRISA': 'SMILE',
                'Combinamos tecnología de vanguardia con un enfoque artesanal para crear resultados que superan tus expectativas.': 'We combine state-of-the-art technology with an artisanal approach to create results that exceed your expectations.',
                'UBICACIÓN': 'LOCATION',
                'Pueyrredón 322 PB, Consultorio 2 — Mendoza': 'Pueyrredón 322 Ground Floor, Office 2 — Mendoza',
                'HORARIOS': 'HOURS',
                'Lunes a Viernes: 9:00 - 19:00 hs': 'Monday to Friday: 9:00 AM - 7:00 PM',
                'TELÉFONO': 'PHONE',
                'CHATEÁ CON NOSOTROS': 'CHAT WITH US',
                '10% OFF EN TU PRIMERA VISITA': '10% OFF YOUR FIRST VISIT',
                'Nombre Completo': 'Full Name',
                'Tratamiento de interés': 'Treatment of Interest',
                'Seleccioná una opción': 'Select an option',
                'Diseño de Sonrisa': 'Smile Design',
                'Implantes Dentales': 'Dental Implants',
                'Ortodoncia Invisible': 'Invisible Orthodontics',
                'WhatsApp / Teléfono': 'WhatsApp / Phone',
                'Mensaje o Preferencia de Horario': 'Message or Preferred Time',
                'SOLICITAR CONSULTA ↗': 'REQUEST CONSULTATION ↗',
                '¿Tienes dudas?': 'Have questions?',
                'Estamos aquí para ayudarte.': 'We are here to help.',
                'EMAIL ADDRESS:': 'EMAIL ADDRESS:',
                'NAVEGACIÓN': 'NAVIGATION',
                'Nosotros': 'About us',
                'Servicios': 'Services',
                'Por qué elegirnos': 'Why choose us',
                'Dentistas': 'Dentists',
                'modonab@gmail.com': 'modonab@gmail.com',
                'Pueyrredón 322, Mendoza': 'Pueyrredón 322, Mendoza',
                'LUNES - VIERNES': 'MONDAY - FRIDAY',
                'DISEÑADO POR': 'DESIGNED BY',
                'ADFUSION': 'ADFUSION',
                '© 2026 MODONAB.': '© 2026 MODONAB.',
                'TODOS LOS DERECHOS RESERVADOS.': 'ALL RIGHTS RESERVED.',
                'POLÍTICA DE PRIVACIDAD': 'PRIVACY POLICY',
                'TÉRMINOS DE SERVICIO': 'TERMS OF SERVICE',
                'CONFIGURACIÓN DE COOKIES': 'COOKIES SETTINGS',
                'ELITE.': 'ELITE.',
                'Ej: Laura García': 'Ex: Laura Garcia',
                '+54 261 000-0000': '+54 261 000-0000',
                '¿Cómo podemos ayudarte?': 'How can we help you?',
                'Curso 1': 'Course 1',
                'Curso 2': 'Course 2',
                'Curso 3': 'Course 3'
            }
        };

        translations.es = Object.fromEntries(
            Object.entries(translations.en).map(([spanish, english]) => [english, spanish])
        );

        let currentLanguage = localStorage.getItem('modonab-language') || 'es';
        const langToggle = document.getElementById('lang-toggle');

        function normalizedText(text) {
            return text.replace(/\s+/g, ' ').trim();
        }

        function translateTextNodes(language) {
            const dictionary = translations[language];
            const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
                acceptNode(node) {
                    const parent = node.parentElement;
                    if (!parent || ['SCRIPT', 'STYLE', 'SVG', 'PATH'].includes(parent.tagName)) {
                        return NodeFilter.FILTER_REJECT;
                    }
                    return normalizedText(node.nodeValue) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
                }
            });

            const nodes = [];
            while (walker.nextNode()) nodes.push(walker.currentNode);

            nodes.forEach(node => {
                const original = node.nodeValue;
                const key = normalizedText(original);
                if (!dictionary[key]) return;

                const leading = original.match(/^\s*/)[0];
                const trailing = original.match(/\s*$/)[0];
                node.nodeValue = `${leading}${dictionary[key]}${trailing}`;
            });
        }

        function translateFormAttributes(language) {
            const dictionary = translations[language];
            document.querySelectorAll('[placeholder], [alt], [title]').forEach(el => {
                ['placeholder', 'alt', 'title'].forEach(attribute => {
                    if (!el.hasAttribute(attribute)) return;
                    const key = normalizedText(el.getAttribute(attribute));
                    if (dictionary[key]) el.setAttribute(attribute, dictionary[key]);
                });
            });
        }

        function updateLanguageUI() {
            document.documentElement.lang = currentLanguage;
            langToggle.textContent = currentLanguage === 'en' ? 'EN/ES' : 'ES/EN';
            langToggle.setAttribute('aria-label', currentLanguage === 'en' ? 'Change language' : 'Cambiar idioma');
            document.title = currentLanguage === 'en'
                ? document.body.dataset.titleEn || translations.en['Modonab Elite | Odontología Avanzada']
                : document.body.dataset.titleEs || 'Modonab Elite | Odontología Avanzada';
            updateThemeLabel();
        }

        function applyLanguage(language) {
            translateTextNodes(language);
            translateFormAttributes(language);
            currentLanguage = language;
            localStorage.setItem('modonab-language', language);
            updateLanguageUI();
        }

        if (langToggle) {
            langToggle.addEventListener('click', () => {
                applyLanguage(currentLanguage === 'en' ? 'es' : 'en');
            });
        }

        /* ── Theme Toggle Logic ── */
        const btnTheme = document.getElementById('btn-theme');
        const themeIcon = document.getElementById('theme-icon');

        function updateThemeLabel() {
            if (!themeIcon) return;
            const isLight = document.body.getAttribute('data-theme') === 'light';
            themeIcon.className = isLight ? 'bi bi-sun' : 'bi bi-moon-stars';
            btnTheme.setAttribute(
                'aria-label',
                currentLanguage === 'en' ? 'Change visual mode' : 'Cambiar modo visual'
            );
        }

        if (btnTheme) {
            btnTheme.addEventListener('click', () => {
                const isLight = document.body.getAttribute('data-theme') === 'light';
                if (isLight) {
                    document.body.removeAttribute('data-theme');
                } else {
                    document.body.setAttribute('data-theme', 'light');
                }
                updateThemeLabel();
            });
        }

        if (currentLanguage === 'en') {
            applyLanguage('en');
        } else {
            updateLanguageUI();
        }

        /* ── Header: Glass on Scroll ── */
        const siteHeader = document.getElementById('site-header');
        window.addEventListener('scroll', () => {
            if (siteHeader) siteHeader.classList.toggle('scrolled', window.scrollY > 40);
        }, { passive: true });

        /* ── Hamburger Menu Logic ── */
        const hamburger = document.getElementById('hamburger');
        const navOverlay = document.getElementById('nav-overlay');
        const navLinks = document.querySelectorAll('.nav-link');

        if (hamburger && navOverlay) {
            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('is-active');
                navOverlay.classList.toggle('active');
            });
        }

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navOverlay) navOverlay.classList.remove('active');
                if (hamburger) hamburger.classList.remove('is-active');
            });
        });

        const contactForm = document.getElementById('contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', (event) => {
                event.preventDefault();
                const formData = new FormData(contactForm);
                const name = (formData.get('name') || '').toString().trim();
                const treatment = (formData.get('treatment') || '').toString().trim();
                const phone = (formData.get('phone') || '').toString().trim();
                const message = (formData.get('message') || '').toString().trim();

                const subject = encodeURIComponent('Consulta desde sitio web');
                const body = encodeURIComponent(
                    `Nombre: ${name}\nTratamiento de interés: ${treatment}\nWhatsApp / Teléfono: ${phone}\nMensaje: ${message}`
                );

                window.location.href = `mailto:modonab@gmail.com?subject=${subject}&body=${body}`;
            });
        }
