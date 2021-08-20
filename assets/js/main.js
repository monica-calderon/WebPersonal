
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos,
      behavior: 'smooth'
    })
  }

  /**
   * Back to top button
   */

  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('body').classList.toggle('mobile-nav-active')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let body = select('body')
      if (body.classList.contains('mobile-nav-active')) {
        body.classList.remove('mobile-nav-active')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Preloader
   */
  let preloader = select('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove()
    });
  }

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })

  }); 

  /* Form */
  $(function(){
    $(".msg").hide();
    $("#contact-form").on("submit", function(e){  
              
        // Cancelamos el evento si se requiere 
        e.preventDefault();
 
        // Obtenemos los datos del formulario 
        var f = $(this);
        var formData = new FormData(document.getElementById("contact-form"));
        formData.append("dato", "valor");
               
        // Enviamos los datos al archivo PHP que procesará el envio de los datos a un determinado correo 
        $.ajax({
            url: "assets\contact\sendmail.php",
            type: "post",
            dataType: "json",
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            beforeSend: function() {
              $("#mail-btn").remove();
              $('.msg').html('<div class="loader"></div>');
            },
        })
 
        // Cuando el formulario es enviado, mostramos un mensaje en la vista HTML 
        // En el archivo enviarcorreo.php devuelvo el valor '1' el cual es procesado con jQuery Ajax 
        // y significa que el mensaje se envio satisfactoriamente. 
        .done(function (res) {                  
 
          if(res.a == "1"){
                    
            // Mostramos el mensaje 'Tu Mensaje ha sido enviado Correctamente !' 
            $(".msg").show();
            $(".msg").html("<h3>¡Muchas gracias!</h3>"
            + "<p>Tu mensaje ha sido enviado correctamente. Recibirá una respuesta lo antes posible.</p>"
            );                   
            $("#contact-form").trigger("reset");
            $("#mail-btn").remove();    
 
          }  else {
            $(".msg").show();       
            $(".msg").html("<h3>¡Muchas gracias!</h3>"
            + "<p>Tu mensaje ha sido enviado correctamente. Recibirá una respuesta lo antes posible.</p>"
            ); 
            $("#mail-btn").remove();
          }
                                                      
        })
 
        // Mensaje de error al enviar el formulario 
        .fail(function (res) {
            $(".msg").show();            
            $(".msg").html('<h3>Disculpe las molestias</h3>'
            + '<p>Se ha superado el número de correos que se pueden mandar a través de este formulario al día.</p>'
            + '<p>Por favor, envíe el correo haciendo click <a href="mailto: monicacalderon.gm@gmail.com?Subject=CONTACTO%20WEB%20-%20">aquí</a></p>');
            $("#mail-btn").remove();
        });
 
    });
});

  

  /* Form response */
/*   let mail_btn = select('#mail-btn');
  mail_btn.addEventListener('click', () => {

      var mensajeModal = '<div class="modal_wrap">'+
                            '<div class="msg_modal">'+
                              '<h3>¡Muchas gracias!</h3>'+
                              '<p>Prueba</p>'+
                              '<p>Prueba 2</p>'+
                              '<span id="close-btn">Cerrar</span>'+
                            '</div>'+
                          '</div>'
      
       mail_btn.innerHTML = mensajeModal;

  }) */

/*   let modal_wrap = select('.modal_wrap');
  window.addEventListener('load', () => {
    modal_wrap.remove()
  }); */

/*   let mail_btn = select('#mail-btn');
  mail_btn.addEventListener('click', () => {
    

    modal_wrap.innerHTML = mensajeModal;
  }) */

})()
