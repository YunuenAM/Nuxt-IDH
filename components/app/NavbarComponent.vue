<template>
	<div class="sidebar">
		<div class="logo">
			<img
				src="~/assets/logo.png"
				alt="Logo"
			>
			<h2>HDI</h2>
		</div>
		<ul class="menu">
			<li
				v-for="item in menuItems.value"
				:key="item.name"
				:class="{ active: activeItem === item.name.value }"
				@click="setActiveItem(item.name)"
			>
				<span class="icon">
					<img
						:src="item.icon"
						alt="icon"
					>
				</span>
				<span class="text">{{ item.name }}</span>
			</li>
		</ul>
		<div class="help-panel">
			<h3>¿Necesitas ayuda?</h3>
			<button @click="contactSupport">
				Contáctanos
			</button>
		</div>
	</div>
</template>

<script>
import { ref } from 'vue';
import TableroIcon from '~/assets/icons/dashboard.svg';
import TablasIcon from '~/assets/icons/bar-chart.svg';
import CuentaIcon from '~/assets/icons/billing.svg';
import AjustesIcon from '~/assets/icons/gear.svg';

export default {
	name: 'Sidebar',
	setup() {
		const activeItem = ref('Tablero');
		const menuItems = ref([
			{ name: 'Tablero', icon: TableroIcon },
			{ name: 'Tablas', icon: TablasIcon },
			{ name: 'Cuenta', icon: CuentaIcon },
			{ name: 'Ajustes', icon: AjustesIcon },
		]);

		const setActiveItem = (item) => {
			activeItem.value = item;
		};

		const contactSupport = () => {
			alert('Redirigiendo a soporte...');
		};

		return {
			activeItem,
			menuItems,
			setActiveItem,
			contactSupport,
		};
	},
};
</script>

<style scoped>
.sidebar {
  width: 250px;
  background: linear-gradient(180deg, #0a0f2c, #04124c);
  color: white;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px 10px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.2);
}

.logo {
  text-align: center;
  margin-bottom: 20px;
}

.logo img {
  max-width: 80px;
}

.logo h2 {
  font-size: 1.5rem;
  margin: 10px 0 0;
}

.menu {
  list-style: none;
  padding: 0;
  margin: 0;
}

.menu li {
  display: flex;
  align-items: center;
  padding: 10px 15px;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s, transform 0.2s;
}

.menu li.active,
.menu li:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: scale(1.05);
}

.menu li .icon {
  margin-right: 10px;
}

.menu li .icon img {
  width: 24px;
  height: 24px;
}

.menu li .text {
  font-size: 1rem;
}

.help-panel {
  text-align: center;
  background: linear-gradient(135deg, #1a2a6c, #b21f1f, #fdbb2d);
  border-radius: 12px;
  padding: 15px;
  color: white;
}

.help-panel h3 {
  font-size: 1rem;
  margin-bottom: 10px;
}

.help-panel button {
  background: white;
  color: #04124c;
  padding: 8px 12px;
  border: none;
  border-radius: 8px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background 0.3s, transform 0.2s;
}

.help-panel button:hover {
  background: #ddd;
  transform: scale(1.05);
}
</style>

  <style scoped>
  .navbar {
    background-color: #333;
    padding: 1rem;
  }

  .navbar ul {
    list-style: none;
    display: flex;
    gap: 1rem;
  }

  .navbar a {
    color: white;
    text-decoration: none;
  }

  .navbar a:hover {
    text-decoration: underline;
  }
  </style>
