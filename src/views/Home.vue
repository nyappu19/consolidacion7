<template>
  <v-container>
        <h1 class="pb-7 d-flex justify-center">Lista de Cursos</h1>
    <v-row justify="space-around">
      <v-col v-for="curso in cursos" :key="curso.id" cols="12" sm="6" md="4" lg="3">
        <v-card width="450">
          <v-img height="200px" width="200px" :src="curso.img">
            <v-app-bar flat color="rgba(0, 0, 0, 0)">
             </v-app-bar>
          </v-img>

          <v-card-text>
            <div class="font-weight-bold ml-8 mb-2">
             <h3><strong>{{ curso.nombre }}</strong></h3>
            </div>
          <div class="font-weight-bold ml-8 mb-2">
            Información
          </div>
            <v-timeline align-top dense>

              <v-timeline-item color="purple" small>
                <div>
                  <div class="font-weight-normal">
                   <strong> Costo:</strong>$ {{ Number(curso.costo).toLocaleString("es-CL") }}
                  </div>
                   <div class="font-weight-normal">
                   <strong> Duracion:</strong> {{ curso.duracion }}
                  </div>
                </div>
              </v-timeline-item>

                <v-timeline-item color="green" small>
                <div>
                  <div class="font-weight-normal">
                   <strong> Cupos:</strong> {{ curso.cupos }}
                  </div>
                  <div class="font-weight-normal">
                   <strong> Inscritos:</strong> {{ curso.inscritos }}
                  </div>
                </div>
              </v-timeline-item>

              <v-timeline-item color="purple" small>
                <div>
                  <div class="font-weight-normal">
                   <strong> Fecha de registro:</strong><br> {{ curso.fecha_registro }}
                                     </div>
               </div>

              </v-timeline-item>
              <v-timeline-item color="green" small>
                <div>
                  <div class="font-weight-normal">
                   <strong> Descripcion:</strong> {{ curso.descripcion }}
                                     </div>
               </div>
              </v-timeline-item>

            </v-timeline>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Home',
  computed: {
    ...mapState(['cursos']),
  },
  data() {
    return {
      
    };
  },
  created() {
    this.$store.dispatch('fetchCursos');
  },
};
</script>

<style scoped>
/* Estilos personalizados si es necesario */
</style>
