<script setup>
import { ref, computed, onMounted } from 'vue';

const estados = ref([]);
const estadosUnicos = ref([]);
const aniosUnicos = ref([]);
const selectedFilters = ref({ estados: [], anios: [] });
const currentPage = ref(1);
const itemsPerPage = ref(6);
const maxVisiblePages = 3;
const estadoSelectKey = ref(0);
const anioSelectKey = ref(0);
const estadoBuscado = ref('');
const generarDatos = () => {
	const estadosNombres = [
		'Aguascalientes',
		'Baja California',
		'Baja California Sur',
		'Campeche',
		'Chiapas',
		'Chihuahua',
		'Ciudad de México',
		'Coahuila',
		'Colima',
		'Durango',
		'Guanajuato',
		'Guerrero',
		'Hidalgo',
		'Jalisco',
		'Michoacán',
		'Morelos',
		'Nayarit',
		'Nuevo León',
		'Oaxaca',
		'Puebla',
		'Querétaro',
		'Quintana Roo',
		'San Luis Potosí',
		'Sinaloa',
		'Sonora',
		'Tabasco',
		'Tamaulipas',
		'Tlaxcala',
		'Veracruz',
		'Yucatán',
		'Zacatecas',
	];
	const anios = [2019, 2020, 2021, 2022, 2023, 2024, 2025];

	const datosGenerados = [];

	estadosNombres.forEach((estado) => {
		anios.forEach((anio) => {
			datosGenerados.push({
				nombre: estado,
				anio: anio,
				idh: (Math.random() * (1 - 0.5) + 0.5).toFixed(3),
				showMenu: false,
			});
		});
	});

	estados.value = datosGenerados;
	estadosUnicos.value = estadosNombres;

	aniosUnicos.value = anios;
};
const limpiarCampos = () => {
	selectedFilters.value.estados = [];
	selectedFilters.value.anios = [];
	estadoSelectKey.value += 1;
	anioSelectKey.value += 1;
	currentPage.value = 1;
};
const filteredEstados = computed(() => {
	let filtered = [...estados.value];
	if (selectedFilters.value.estados.length) {
		filtered = filtered.filter(estado =>
			selectedFilters.value.estados.includes(estado.nombre),
		);
	}
	if (estadoBuscado.value.trim() !== '') {
		const busqueda = estadoBuscado.value.trim().toLowerCase();
		filtered = filtered.filter(estado =>
			estado.nombre.toLowerCase().includes(busqueda),
		);
	}
	return filtered;
	if (selectedFilters.value.anios.length) {
		filtered = filtered.filter(estado =>
			selectedFilters.value.anios.includes(estado.anio.toString()),
		);
	}
	return filtered;
});

const filterByState = (selectedEstados) => {
	selectedFilters.value.estados = selectedEstados;
	currentPage.value = 1; // Reiniciar a la primera página
};

const filterByYear = (selectedAnios) => {
	selectedFilters.value.anios = selectedAnios;
	currentPage.value = 1; // Reiniciar a la primera página
};

const sortData = (order) => {
	if (order === 'asc') {
		estados.value.sort((a, b) => a.idh - b.idh);
	}
	else if (order === 'desc') {
		estados.value.sort((a, b) => b.idh - a.idh);
	}
	currentPage.value = 1;
};

const goToPage = (page) => {
	currentPage.value = page;
};

const previousPage = () => {
	if (currentPage.value > 1) {
		currentPage.value -= 1;
	}
};

const nextPage = () => {
	if (currentPage.value < totalPages.value) {
		currentPage.value += 1;
	}
};

const paginatedEstados = computed(() => {
	const start = (currentPage.value - 1) * itemsPerPage.value;
	const end = currentPage.value * itemsPerPage.value;
	return filteredEstados.value.slice(start, end);
});

const totalPages = computed(() => {
	return Math.ceil(filteredEstados.value.length / itemsPerPage.value);
});

const visiblePages = computed(() => {
	const startPage = Math.max(1, currentPage.value - Math.floor(maxVisiblePages / 2));
	const endPage = Math.min(totalPages.value, startPage + maxVisiblePages - 1);
	return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
});

const toggleMenu = (index) => {
	paginatedEstados.value = paginatedEstados.value.map((estado, i) => ({
		...estado,
		showMenu: i === index ? !estado.showMenu : false,
	}));
};

onMounted(() => {
	generarDatos();
	limpiarCampos();
});
</script>

<template>
	<div class="tabla-container">
		<div class="filters">
			<h2 class="filters-title">
				Resumen Índice de Desarrollo Humano en México
			</h2>
			<!-- Filtro por Estado -->
			<div class="searcher-container">
				<input
					v-model="estadoBuscado"
					type="text"
					class="searcher"
					placeholder="Buscar por estado"
					aria-label="Buscar por estado"
				>
			</div>
			<div class="filter-group-row">
				<select
					:key="estadoSelectKey"
					v-model="selectedFilters.estados"
					class="dropdown"
					aria-label="Filtrar por estado"
					multiple
					:title="'Mantén presionada la tecla Ctrl (Cmd en Mac) para seleccionar más de uno'"
					@change="filterByState([...$event.target.selectedOptions].map(option => option.value))"
				>
					<option
						v-for="estado in estadosUnicos"
						:key="estado"
						:value="estado"
					>
						{{ estado }}
					</option>
				</select>
				<tooltip message="Mantén presionada la tecla Ctrl (Cmd en Mac) para seleccionar más de uno" />
			</div>

			<!-- Filtro por Año -->
			<div class="filter-group-row">
				<select
					:key="anioSelectKey"
					v-model="selectedFilters.anios"
					class="dropdown"
					aria-label="Filtrar por año"
					multiple
					:title="'Mantén presionada la tecla Ctrl (Cmd en Mac) para seleccionar más de uno'"
					@change="filterByYear([...$event.target.selectedOptions].map(option => option.value))"
				>
					<option
						v-for="anio in aniosUnicos"
						:key="anio"
						:value="anio"
					>
						{{ anio }}
					</option>
				</select>
			</div>

			<!-- Ordenar -->
			<div class="filter-group-row">
				<select
					class="dropdown"
					aria-label="Ordenar resultados"
					@change="sortData($event.target.value)"
				>
					<option value="">
						Ordenar
					</option>
					<option value="asc">
						Ascendente
					</option>
					<option value="desc">
						Descendente
					</option>
				</select>
			</div>
		</div>

		<!-- Botón de Limpiar -->
		<div class="clear-button-container">
			<button
				class="clear-button"
				@click="limpiarCampos"
			>
				Limpiar Campos
			</button>
		</div>
		<!-- Tabla -->
		<table
			class="tabla"
			aria-label="Tabla de estados con IDH"
		>
			<thead>
				<tr>
					<th scope="col">
						Estado
					</th>
					<th scope="col">
						Año
					</th>
					<th scope="col">
						IDH
					</th>
					<th scope="col">
						Opciones
					</th>
				</tr>
			</thead>
			<tbody>
				<tr
					v-for="(estado, index) in paginatedEstados"
					:key="index"
				>
					<td>{{ estado.nombre }}</td>
					<td>{{ estado.anio }}</td>
					<td>{{ estado.idh }}</td>
					<td>
						<button
							class="icon-button"
							aria-haspopup="true"
							aria-expanded="false"
							@click="toggleMenu(index)"
						>
							⋮
						</button>
						<div
							v-if="estado.showMenu"
							class="dropdown-menu"
							aria-label="Opciones de estado"
						>
							<button
								class="dropdown-item"
								aria-label="Ver gráfica para {{ estado.nombre }}"
							>
								📊 Ver Gráfica
							</button>
							<button
								class="dropdown-item"
								aria-label="Editar estado {{ estado.nombre }}"
							>
								✏️ Editar
							</button>
							<button
								class="dropdown-item"
								aria-label="Eliminar estado {{ estado.nombre }}"
							>
								🗑️ Eliminar
							</button>
						</div>
					</td>
				</tr>
			</tbody>
		</table>

		<!-- Paginación -->
		<div
			class="pagination"
			aria-label="Navegación de paginación"
		>
			<button
				class="page-button"
				aria-label="Página anterior"
				:disabled="currentPage === 1"
				@click="previousPage"
			>
				←
			</button>
			<button
				v-for="page in visiblePages"
				:key="page"
				class="page-button"
				:aria-label="'Página ' + page"
				:class="{ active: page === currentPage }"
				@click="goToPage(page)"
			>
				{{ page }}
			</button>
			<button
				class="page-button"
				aria-label="Página siguiente"
				:disabled="currentPage === totalPages"
				@click="nextPage"
			>
				→
			</button>
		</div>
	</div>
</template>

<style scoped>
.tabla-container {
	padding: 1.5rem;
	background: linear-gradient(180deg, #0a254a, #112);
	border-radius: 8px;
	width: 100%;
}

.filters {
	display: flex;
	flex-wrap: wrap;
	gap: 1rem;
	margin-bottom: 1rem;
}
.filters-title {
	color: white;
	font-size: 1.5rem;
	font-weight: bold;
	margin-bottom: 0.5rem;
	text-align: left;

}

.dropdown {
	background: #0a254a;
	color: white;
	border: 1px solid #1e90ff;
	border-radius: 4px;
	padding: 0.5rem;
	width: 100%;
	max-width: 200px;
}

.tabla {
	width: 100%;
	border-collapse: collapse;
}

.tabla th,
.tabla td {
	border: 1px solid #1e90ff;
	background-color: #1e90ff;
	padding: 0.5rem;
	color: white;
	text-align: center;
	font-size: 0.9rem;
	background: linear-gradient(180deg, #0a254a, #112);
}

.tabla th {
	background: #1e90ff;
	background-color: #1e90ff;
	background: linear-gradient(180deg, #0a254a, #112);
	font-weight: bold;
}

.tabla tbody tr:nth-child(even) {
	background: linear-gradient(180deg, #0a254a, #112);
}

.icon-button {
	background: none;
	border: none;
	color: #1e90ff;
	cursor: pointer;
	font-size: 1.2rem;
}

.icon-button:focus {
	outline: 2px solid #4682b4;
}

.dropdown-menu {
	background: #1e90ff;
	border-radius: 4px;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
	position: absolute;
	z-index: 10;
	display: flex;
	flex-direction: column;
}

.dropdown-item {
	background: none;
	border: none;
	color: white;
	padding: 0.5rem 1rem;
	text-align: left;
	cursor: pointer;
	font-size: 0.9rem;
}

.dropdown-item:hover {
	background: #4682b4;
}

.pagination {
	display: flex;
	justify-content: center;
	gap: 0.5rem;
	margin-top: 1rem;
}

.page-button {
	background: #1e90ff;
	color: white;
	border: none;
	border-radius: 4px;
	padding: 0.5rem 1rem;
	cursor: pointer;
}

.page-button:hover {
	background: #4682b4;
}

@media (max-width: 468px) {
	.tabla-container {
		padding: 1rem;
	}

	.filters {
		justify-content: center;
		flex-direction: column;
		gap: 0.5rem;
	}

	.tabla th,
	.tabla td {
		font-size: 1rem;
		padding: 0.4rem;
	}

	.icon-button {
		font-size: 1rem;
	}

	.page-button {
		padding: 0.4rem 0.8rem;
		font-size: 0.8rem;
	}
}

@media (min-width: 1024px) {
	.tabla-container {
		padding: 3rem;
	}

	.tabla {
		width: 100%;
	}
}
</style>
