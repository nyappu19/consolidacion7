<template>
  <div>
    <h1 class="pt-3 d-flex justify-center">Administración</h1>

    <v-data-table :headers="headers" :items="desserts" sort-by="calories" class="elevation-1">
      <template slot="top">
        <v-toolbar flat>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on }">
              <v-btn color="red" dark class="mb-2" v-on="on">Agregar curso</v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field label="Nombre" v-model="editedItem.nombre"></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field label="URL de la imagen" v-model="editedItem.img"></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field label="Cupos del curso" v-model.number="editedItem.cupos"></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field label="Inscritos en el curso" v-model.number="editedItem.inscritos"></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field label="Duracion del curso" v-model="editedItem.duracion"></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field label="Fecha de registro" v-model="editedItem.fecha_registro"></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field label="Costo del curso" v-model.number="editedItem.costo"></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-textarea label="Descripcion del curso" v-model="editedItem.descripcion"></v-textarea>
                    </v-col>
                  </v-row>
                  <v-col>
                    <v-btn color="green" dark @click="save">Agregar</v-btn>
                    <v-btn color="orange" dark @click="resetForm">Limpiar formulario</v-btn>
                    <v-btn color="red" dark @click="close">Cancelar</v-btn>
                  </v-col>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">Cancelar</v-btn>
                <v-btn color="blue darken-1" text @click="save">Guardar</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5">¿Estás seguro que quieres borrar este item?</v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete">Cancelar</v-btn>
                <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template slot="item.actions" slot-scope="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)" color="orange">mdi-pencil</v-icon>
        <v-icon small @click="deleteItem(item)" color="red">mdi-delete</v-icon>
      </template>
      <template slot="no-data">
        <v-btn color="primary" @click="initialize">Resetear</v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  name: 'Administracion',
  data() {
    return {
      dialog: false,
      dialogDelete: false,
      headers: [
        { text: 'Curso', align: 'start', sortable: false, value: 'nombre' },
        { text: 'Cupos', value: 'cupos' },
        { text: 'Inscritos', value: 'inscritos' },
        { text: 'Duracion', value: 'duracion' },
        { text: 'Costo', value: 'costo' },
        { text: 'Terminado', value: 'completado' },
        { text: 'Fecha', value: 'fecha_registro' },
        { text: 'Acciones', value: 'actions', sortable: false }
      ],
      desserts: [],
      editedIndex: -1,
      editedItem: {
        nombre: '',
        img: '',
        cupos: 0,
        inscritos: 0,
        duracion: '',
        costo: 0,
        completado: false,
        fecha_registro: '',
        descripcion: ''
      },
      defaultItem: {
        nombre: '',
        img: '',
        cupos: 0,
        inscritos: 0,
        duracion: '',
        costo: 0,
        completado: false,
        fecha_registro: '',
        descripcion: ''
      }
    };
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'Agregar curso' : 'Editar curso';
    }
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    }
  },
  created() {
    this.loadCourses();
  },
  methods: {
    loadCourses() {
      fetch('/cursos.json')
        .then(response => response.json())
        .then(data => {
          this.desserts = data;
        })
        .catch(error => {
          console.error('Error loading courses:', error);
        });
    },
    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    deleteItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },
    deleteItemConfirm() {
      this.desserts.splice(this.editedIndex, 1);
      this.closeDelete();
    },
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
      } else {
        this.desserts.push(this.editedItem);
      }
      this.close();
    },
    resetForm() {
      this.editedItem = Object.assign({}, this.defaultItem);
    }
  }
};
</script>

<style scoped>
/* Estilos específicos de este componente */
</style>
