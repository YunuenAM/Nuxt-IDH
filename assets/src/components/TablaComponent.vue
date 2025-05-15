<template>
	<v-card class="pa-4">
		<v-row>
			<v-col
				cols="12"
				md="4"
			>
				<v-select
					v-model="selectedEstado"
					:items="estados"
					label="Selecciona Estado"
					clearable
				/>
			</v-col>
			<v-col
				cols="12"
				md="4"
			>
				<v-select
					v-model="selectedAño"
					:items="anios"
					label="Selecciona Año"
					clearable
				/>
			</v-col>
			<v-col
				cols="12"
				md="4"
			>
				<v-select
					v-model="selectedOrden"
					:items="['Ascendente', 'Descendente']"
					label="Ordenar"
				/>
			</v-col>
		</v-row>
	</v-card>
</template>

<script setup>
import { ref, computed } from 'vue';

const data = ref([
	{ estado: 'Aguascalientes', anio: 2025, idh: 0.821 },
	{ estado: 'Baja California', anio: 2025, idh: 0.702 },
	{ estado: 'Baja California Sur', anio: 2025, idh: 0.805 },
	{ estado: 'Campeche', anio: 2025, idh: 0.750 },
	{ estado: 'Coahuila', anio: 2025, idh: 0.880 },
]);

const selectedEstado = ref(null);
const selectedAño = ref(null);
const selectedOrden = ref(null);

const estados = computed(() => [...new Set(data.value.map(d => d.estado))]);
const anios = computed(() => [...new Set(data.value.map(d => d.anio))]);
</script>
