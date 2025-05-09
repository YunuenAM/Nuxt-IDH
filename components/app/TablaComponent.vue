<template>
	<div class="tabla-container">
		<div class="filters">
			<select
				class="dropdown"
				aria-label="Filtrar por estado"
				@change="filterByState($event.target.value)"
			>
				<option value="">
					Selecciona Estado
				</option>
				<option
					v-for="estado in estadosUnicos"
					:key="estado"
					:value="estado"
				>
					{{ estado }}
				</option>
			</select>
			<select
				class="dropdown"
				aria-label="Filtrar por año"
				@change="filterByYear($event.target.value)"
			>
				<option value="">
					Selecciona Año
				</option>
				<option
					v-for="anio in aniosUnicos"
					:key="anio"
					:value="anio"
				>
					{{ anio }}
				</option>
			</select>
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
					v-for="(estado, index) in filteredEstados"
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
				v-for="page in totalPages"
				:key="page"
				class="page-button"
				:aria-label="'Página ' + page"
				@click="goToPage(page)"
			>
				{{ page }}
			</button>
		</div>
	</div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

// Estados iniciales
const estados = ref([]);
const estadosUnicos = ref([]);
const aniosUnicos = ref([]);
const filteredEstados = ref([]);
const currentPage = ref(1);
const itemsPerPage = 10;

// Generar datos aleatorios
const generarDatos = () => {
	const estadosNombres = [
		'Aguascalientes',
		'Baja California',
		'Baja California Sur',
		'Campeche',
		'Chiapas',
		'Chihuahua',
		'Coahuila',
		'Colima',
		'Durango',
		'Guanajuato',
		'Guerrero',
		'Hidalgo',
		'Jalisco',
		'México',
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
	const anios = [2020, 2021, 2022, 2023, 2024, 2025];

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

// Filtrar por estado
function filterByState(estado) {
	filteredEstados.value = estados.value.filter(item =>
		estado ? item.nombre === estado : true,
	);
}

// Filtrar por año
function filterByYear(anio) {
	filteredEstados.value = estados.value.filter(item =>
		anio ? item.anio === parseInt(anio) : true,
	);
}

// Ordenar datos
function sortData(order) {
	if (order === 'asc') {
		filteredEstados.value.sort((a, b) => a.idh - b.idh);
	}
	else if (order === 'desc') {
		filteredEstados.value.sort((a, b) => b.idh - a.idh);
	}
}

// Cambiar página
function goToPage(page) {
	currentPage.value = page;
}

// Obtener datos paginados
const paginatedEstados = computed(() => {
	const start = (currentPage.value - 1) * itemsPerPage;
	const end = currentPage.value * itemsPerPage;
	return filteredEstados.value.slice(start, end);
});

// Total de páginas para paginación
const totalPages = computed(() => {
	return Math.ceil(filteredEstados.value.length / itemsPerPage);
});

// Alternar menú de opciones
function toggleMenu(index) {
	filteredEstados.value = filteredEstados.value.map((estado, i) => ({
		...estado,
		showMenu: i === index ? !estado.showMenu : false,
	}));
}

// Generar los datos al montar el componente
onMounted(() => {
	generarDatos();
});
</script>

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
