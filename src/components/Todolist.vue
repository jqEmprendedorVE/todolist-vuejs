<template>
  <div class="todolist">
    <form @submit.prevent="agregarTarea(nuevaTarea)"
          class="form" >
      <div class="input-group">
        <input v-model="nuevaTarea"
        required
          type="text" class="form-control" placeholder="Edite una tarea...">
        <span class="input-group-btn">
          <button class="btn btn-primary" :disabled="!this.$store.state.autentificado" type="submit">Agregar tarea</button>
        </span>
      </div>
    </form>
    
    <br>
    
    <div class="card" v-for="(tarea, index) in tareas">
      <div class="card-block">
        <h5 :class="{completado: tarea.completado}" class=" card-title">
          <img class="avatar" :src="tarea.avatar"  height="32px" width="32px" style="margin.right:15px; border-radius:4px">
          {{ tarea.titulo }}
          <small style="font-size:12px">({{ tarea.nombre }})</small>
        </h5>
        
        <input v-show="editandoTarea===index"
            v-model="tarea.titulo"
            @blur="editandoTarea=null, editarTarea(tarea)"
            type="text" class="form-control">
            
        <div v-if="usuarioActivo!=null">
          <div class="float-xs-right" v-if="tarea.uid==usuarioActivo.uid">
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
    </div>
    <pre>{{ $data }}</pre>
  </div>
</template>

<script>

  export default {
    name: 'todolist',
    created() {
      this.$store.state.db.ref('tareas/').on('value', (snapshot) => {
        this.tareas = [];
        var objeto = snapshot.val();
        for (var propiedad in objeto) {
          this.tareas.unshift({
            '.key': propiedad,
            completado: objeto[propiedad].completado,
            titulo: objeto[propiedad].titulo,
            nombre: objeto[propiedad].nombre,
            avatar: objeto[propiedad].avatar,
            uid: objeto[propiedad].uid
          });
        }
      });
    },
    data() {
      return {
        nuevaTarea: null,
        editandoTarea: null,
        tareas: [],
        db: {},
        uid:null
      }
    },
    props: ['usuarioActivo', 'autentificado'],
    methods: {
      agregarTarea: function(tarea) {
        var usuario = this.usuarioActivo;
        console.log(usuario);
        if(this.$store.state.autentificado){  
          this.$store.state.db.ref('tareas/').push({
            titulo: tarea,
            completado: false,
            nombre: usuario.displayName,
            avatar: usuario.photoURL,
            uid: usuario.uid
          })

          this.nuevaTarea = '';
        }

      },
      editarTarea: function(tarea) {
        this.$store.state.db.ref('tareas/' + tarea['.key']).update({
          titulo: tarea.titulo,
        });
      },
      actualizarEstadoTarea: function(estado, tarea) {
        this.$store.state.db.ref('tareas/' + tarea['.key']).update({
          completado: estado ? true : false,
        });
      },
      eliminarTarea: function(tarea) {
        this.$store.state.db.ref('tareas/' + tarea['.key']).remove();
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