<template>
  <div id="app">
    <div class="container">
      <div class="header clearfix">
        <nav>
          <ul class="nav nav-pills float-xs-right">
            <li class="nav-item" v-if="!this.$store.state.autentificado">
              <a class="nav-link" href="#" @click.prevent="conectar">Conectar</a>
            </li>
            <li class="nav-item dropdown" v-if="this.$store.state.autentificado">
              <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">
                <img :src="usuarioActivo.photoURL" height="32px" width="32px" alt="..." class="rounded">
                {{usuarioActivo.displayName}}
              </a>
              <div class="dropdown-menu " style="text-align:center">
                <a class="dropdown-item" href="javascript:void(0)">
                <p></p>
                <p>Perfil del usuario</p>
                </a>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" href="#" @click.prevent="desconectar"><i class="fa fa-sign-out" aria-hidden="true"></i> Salir</a>
              </div>
            </li>
          </ul>
        </nav>
        <h3 class="text-muted">Todolist</h3>
      </div>

      <todolist :autentificado="autentificado" :usuarioActivo="usuarioActivo"></todolist> 
     
      <footer class="footer">
        <p>&copy; Company 2014</p>
      </footer>

    </div> <!-- /container -->
  </div>
</template>

<script>
  import Todolist from './components/Todolist'

  export default {
    name: 'app',
    components: {
      Todolist
    },
    data(){
      return {
        usuarioActivo: null
      }
    },
    created: function() {
      let store = this.$store.commit;
      let vm = this;
      
      var config = {
        apiKey: "AIzaSyDBSnVdwqjs0oKQpfVv3j5bPoggqM8qqHw",
        authDomain: "todolist-lab.firebaseapp.com",
        databaseURL: "https://todolist-lab.firebaseio.com",
        storageBucket: "todolist-lab.appspot.com",
        messagingSenderId: "404056089437"
      };
      this.$firebaseApp.init(config);
      store('setfirebaseDB', this.$firebaseApp.db());
      store('setfirebaseAuth', this.$firebaseApp.auth());
      store('setfirebaseProviderG', this.$firebaseApp.providerG());


      this.$store.state.auth.onAuthStateChanged(function(user) {
        if (user) {
          store('setUsuarioActivo',user);
          vm.usuarioActivo = user;
        } else {
          store('setUsuarioActivo',null);
          vm.usuarioActivo = null;
        }
      });
    },
    methods: {
      conectar: function() {
        this.$store.state.auth.signInWithPopup(this.$store.state.provider).catch(function(error) {
          console.log('Errores: ' + error)
        });
      },
      desconectar: function() {
        this.$store.state.auth.signOut();
      }
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    margin-top: 10px;
  }
  /* Space out content a bit */
  
  body {
    padding-top: 1.5rem;
    padding-bottom: 1.5rem;
  }
  /* Everything but the jumbotron gets side spacing for mobile first views */
  
  .header,
  .marketing,
  .footer {
    padding-right: 1rem;
    padding-left: 1rem;
  }
  /* Custom page header */
  
  .header {
    padding-bottom: 1rem;
    border-bottom: .05rem solid #e5e5e5;
  }
  /* Make the masthead heading the same height as the navigation */
  
  .header h3 {
    margin-top: 0;
    margin-bottom: 0;
    line-height: 3rem;
  }
  /* Custom page footer */
  
  .footer {
    padding-top: 1.5rem;
    color: #777;
    border-top: .05rem solid #e5e5e5;
  }
  /* Customize container */
  
  @media (min-width: 48em) {
    .container {
      max-width: 46rem;
    }
  }
  
  .container-narrow> hr {
    margin: 2rem 0;
  }
  /* Main marketing message and sign up button */
  
  .jumbotron {
    text-align: center;
    border-bottom: .05rem solid #e5e5e5;
  }
  
  .jumbotron .btn {
    padding: .75rem 1.5rem;
    font-size: 1.5rem;
  }
  /* Supporting marketing content */
  
  .marketing {
    margin: 3rem 0;
  }
  
  .marketing p+ h4 {
    margin-top: 1.5rem;
  }
  /* Responsive: Portrait tablets and up */
  
  @media screen and (min-width: 48em) {
    /* Remove the padding we set earlier */
    .header,
    .marketing,
    .footer {
      padding-right: 0;
      padding-left: 0;
    }
    /* Space out the masthead */
    .header {
      margin-bottom: 2rem;
    }
    /* Remove the bottom border on the jumbotron for visual effect */
    .jumbotron {
      border-bottom: 0;
    }
  }
</style>