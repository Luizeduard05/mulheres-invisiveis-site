document.addEventListener('DOMContentLoaded', () => {
  /* =========================
     MOBILE MENU
  ========================== */
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      mobileMenu.classList.toggle('active');
    });

    document.querySelectorAll('.mobile-menu a').forEach(link =>
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
      })
    );
  }


  /* =========================
     SLIDER (AÇÕES SOCIAIS)
  ========================== */
  const actions = document.querySelectorAll('.action');
  const dots = document.querySelectorAll('.dot');
  const prevBtn = document.querySelector('.slider-prev');
  const nextBtn = document.querySelector('.slider-next');

  let currentIndex = 0;
  let interval;

  const showSlide = (index) => {
    actions.forEach(el => el.classList.remove('active'));
    dots.forEach(el => el.classList.remove('active'));

    actions[index]?.classList.add('active');
    dots[index]?.classList.add('active');

    currentIndex = index;
  };

  const next = () => showSlide((currentIndex + 1) % actions.length);
  const prev = () => showSlide((currentIndex - 1 + actions.length) % actions.length);

  dots.forEach((dot, i) => dot.addEventListener('click', () => showSlide(i)));
  prevBtn?.addEventListener('click', prev);
  nextBtn?.addEventListener('click', next);

  const slider = document.querySelector('.action-slider');

  const startAuto = () => interval = setInterval(next, 5000);
  const stopAuto = () => clearInterval(interval);

  slider?.addEventListener('mouseenter', stopAuto);
  slider?.addEventListener('mouseleave', startAuto);

  startAuto();


  /* =========================
     SMOOTH SCROLL
  ========================== */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();

      const navbarHeight = document.querySelector('.navbar').offsetHeight;

      window.scrollTo({
        top: target.offsetTop - navbarHeight,
        behavior: 'smooth'
      });

      hamburger?.classList.remove('active');
      mobileMenu?.classList.remove('active');
    });
  });


  /* =========================
     ACTIVE LINK ON SCROLL
  ========================== */
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-links a, .mobile-menu a');

  window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
      const offset = section.offsetTop - 150;
      if (window.scrollY >= offset) current = section.id;
    });

    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
  });


  showSlide(0);
}); 

// CHAVE PIX

function copiarPix() {
    const chave = document.getElementById("pixKey").innerText;

    navigator.clipboard.writeText(chave)
        .then(() => {
            const feedback = document.getElementById("copy-feedback");
            feedback.textContent = "✅ Chave copiada com sucesso!";

            setTimeout(() => {
                feedback.textContent = "";
            }, 3000);
        })
        .catch(() => {
            alert("Erro ao copiar. Copie manualmente.");
        });
}

function alternarPix() {
    const chave = document.getElementById("pix-chave-content");
    const qr = document.getElementById("pix-qr-content");
    const botao = document.getElementById("togglePixBtn");

    if (qr.classList.contains("hidden")) {
        chave.classList.add("hidden");
        qr.classList.remove("hidden");
        botao.textContent = "Ver chave Pix";
    } else {
        qr.classList.add("hidden");
        chave.classList.remove("hidden");
        botao.textContent = "Ver QR Code";
    }
}

// modal

function abrirModal() {
    document.getElementById("modalAjuda").classList.add("active");
    document.body.style.overflow = "hidden"; 
}

function fecharModal() {
    document.getElementById("modalAjuda").classList.remove("active");
    document.body.style.overflow = "auto"; 
}

function irParaPix(event) {
    if(event) event.preventDefault();

    fecharModal();

    setTimeout(() => {
        const seçãoPix = document.querySelector(".como-ajudar-pix");
        
        if (seçãoPix) {
            seçãoPix.scrollIntoView({ 
                behavior: "smooth", 
                block: "center" 
            });

            seçãoPix.style.transition = "0.5s";
            seçãoPix.style.boxShadow = "0 0 20px rgba(186, 79, 97, 0.4)";
            setTimeout(() => seçãoPix.style.boxShadow = "none", 2000);
        }
    }, 300); 
}