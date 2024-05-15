(() => {
    const App = {
      htmlElements: {
        form: document.getElementById("login-form"),
        usernameInput: document.getElementById('username'),
        passwordInput: document.getElementById('password'),
        

      },
  
      init() {
       
        App.bindEvents();
       
       
          
      },
  
    bindEvents() {
        
        App.htmlElements.form.addEventListener("submit", App.handlers.onSubmit);
        window.addEventListener("load", App.handlers.onLoad);
        //App.methods.verificationsesion();
    
        },
  
    handlers: {
        onSubmit(event) {
        event.preventDefault();

        App.methods.userVerification();
        
        },
       /* onLoad()
        {           
            App.methods.verificationsesion();
        }*/
    },
  
      methods: {

        leervariables(){
        
        
        },

        logout() {
            localStorage.removeItem('isLoggedIn'); // Eliminar la sesión almacenada
            window.location.replace('index.html'); // Redirigir al usuario a la página de inicio de sesión
          },

        verificationsesion()
        {
            let isLoggedIn = localStorage.getItem('isLoggedIn');
            if (isLoggedIn != true) {
                //window.location.replace('index.html');
                App.methods.logout();
               // alert("Sesión NO existente, redirigido a LOGIN");
               // return; // Detiene la ejecución del código después de redirigir
            }
            else if (isLoggedIn === 'true') {
                window.location.replace('home.html'); // Redirige al usuario a la página de inicio si la sesión ya está iniciada
                alert("Sesión existe, redirigido a HOME.HTML");
                return; // Detiene la ejecución del código después de redirigir
        }
          },

        userVerification() {
            let isLoggedIn = localStorage.getItem('isLoggedIn');

            if (isLoggedIn != true) {
                window.location.replace('index.html');
                //App.methods.logout();
                const usr = App.htmlElements.usernameInput.value;
                const pass = App.htmlElements.passwordInput.value;
                if (usr === 'admin' && pass === 'admin') {
            // Iniciar sesión
                    localStorage.setItem('isLoggedIn', true);
                    window.location.replace('home.html');
                    alert('Sesion iniciada');
                }
                else{
                alert('Credenciales incorrectas');
                }
            }
            else if (isLoggedIn === true){

                alert('Seion ya fue iniciada');
                window.location.replace('home.html');

            }   
                
        }
      }
    };
  
    App.init();
  })();
  
