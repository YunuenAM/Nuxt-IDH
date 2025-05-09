<template>
	<div class="tabla-container">
		<div class="filters">
			<select
				class="dropdown"
				aria-label="Filtrar por estado"
			>
				<option>Selecciona Estado</option>
				<option>Aguascalientes</option>
				<option>Baja California</option>
			</select>
			<select
				class="dropdown"
				aria-label="Filtrar por año"
			>
				<option>Selecciona Año</option>
				<option>2025</option>
				<option>2024</option>
			</select>
			<select
				class="dropdown"
				aria-label="Ordenar resultados"
			>
				<option>Ordenar</option>
				<option>Ascendente</option>
				<option>Descendente</option>
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
					v-for="(estado, index) in estados"
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
				aria-label="Página 1"
			>
				1
			</button>
			<button
				class="page-button"
				aria-label="Página 2"
			>
				2
			</button>
			<button
				class="page-button"
				aria-label="Página 3"
			>
				3
			</button>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			estados: [
				{ nombre: 'Aguascalientes', anio: 2025, idh: '0.821', showMenu: false },
				{ nombre: 'Baja California', anio: 2025, idh: '0.702', showMenu: false },
				{ nombre: 'Baja California Sur', anio: 2025, idh: '0.605', showMenu: false },
				{ nombre: 'Campeche', anio: 2025, idh: '0.750', showMenu: false },
				{ nombre: 'Coahuila', anio: 2025, idh: '0.800', showMenu: false },
			],
		};
	},
	methods: {
		toggleMenu(index) {
			this.estados = this.estados.map((estado, i) => ({
				...estado,
				showMenu: i === index ? !estado.showMenu : false,
			}));
		},
	},
};
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
