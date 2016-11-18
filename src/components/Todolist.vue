<template>
  <div class="todolist">
    <form @submit.prevent="agregarTarea(nuevaTarea)"
          class="form" >
      <div class="input-group">
        <input v-model="nuevaTarea"
        required
          type="text" class="form-control" placeholder="Edite una tarea...">
        <span class="input-group-btn">
          <button class="btn btn-primary" type="submit">Agregar tarea</button>
        </span>
      </div>
    </form>
    
    <br>
    
    <div class="card" v-for="(tarea, index) in tareas">
      <div class="card-block">
        <h5 :class="{completado: tarea.completado}" class=" card-title">{{ tarea.titulo }}</h5>
        
        <input v-show="editandoTarea===index"
            v-model="tarea.titulo"
            @blur="editandoTarea=null, editarTarea(tarea)"
            type="text" class="form-control">
            
        <div class="float-xs-right">
          <a  @click="editandoTarea=index"
              href="#" class="btn btn-primary btn-sm" ><i class="fa fa-pencil" aria-hidden="true"></i></a>
          <a v-show="editandoTarea===index"
            @click="editandoTarea=null, editarTarea(tarea)"
            href="#" class="btn btn-outline-primary btn-sm"><i class="fa fa-floppy-o" aria-hidden="true"></i></a>          
          <a
             @click="actualizarEstadoTarea(true, tarea)"
            href="#" class="btn btn-success btn-sm"><i class="fa fa-check" aria-hidden="true"></i></a>
          <a
            @click="actualizarEstadoTarea(false, tarea)"
            href="#" class="btn btn-outline-success btn-sm"><i class="fa fa-undo" aria-hidden="true"></i></a>
          <a
            @click="eliminarTarea(tarea)"
            href="#" class="btn btn-danger btn-sm"><i class="fa fa-trash" aria-hidden="true"></i></a>
        </div>
      </div>
    </div>
    <pre>{{ $data }}</pre>
  </div>
</template>

<script>
import firebase from 'firebase'

// Initialize Firebase
var config = {
  apiKey: "AIzaSyDBSnVdwqjs0oKQpfVv3j5bPoggqM8qqHw",
  authDomain: "todolist-lab.firebaseapp.com",
  databaseURL: "https://todolist-lab.firebaseio.com",
  storageBucket: "todolist-lab.appspot.com",
  messagingSenderId: "404056089437"
};

firebase.initializeApp(config);

var db = firebase.database();


export default {
  name: 'todolist',
  created () {
    db.ref('tareas/').on('value', (snapshot) => {
      this.tareas = [];
      var objeto = snapshot.val();
      for (var propiedad in objeto) {
        this.tareas.unshift({
        '.key': propiedad,
        completado: objeto[propiedad].completado,
        titulo: objeto[propiedad].titulo
        });
      }
    });
  },
  data () {
    return {
      nuevaTarea: null,
      editandoTarea: null,
      tareas: []
    }
  },
  methods: {
    agregarTarea: function(tarea){
      db.ref('tareas/').push({
        titulo:tarea,
        completado:false
      })
      
      this.nuevaTarea = '';
    
    },
    editarTarea: function(tarea){
      db.ref('tareas/'+tarea['.key']).update({
        titulo:tarea.titulo,
      });   
    },
    actualizarEstadoTarea: function (estado, tarea) {
      db.ref('tareas/' + tarea['.key']).update({
          completado: estado ? true : false,
      });
    },
    eliminarTarea: function (tarea) {
        db.ref('tareas/' + tarea['.key']).remove();
    },
  }
}
</script>

<style>
.completado {
  font-style: italic;
  text-decoration: line-through;
  color: grey;
}
</style>