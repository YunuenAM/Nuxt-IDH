<template>
	<div
		class="sidebar"
		role="complementary"
		aria-labelledby="sidebar-title"
	>
		<div class="logo">
			<img
				src="~/assets/logo.png"
				alt="Logo"
			>
			<h2>HDI</h2> <!-- App Name💻 -->
		</div>

		<ul
			class="menu"
			role="menu"
			aria-label="Main Menu"
		>
			<!-- Main Page: my Dashboard 🏠 -->
			<li
				:class="{ active: activeItem === 'Dashboard' }"
				role="menuitem"
				aria-current="page"
				@click="navigateTo('Dashboard', '/')"
			>
				<span class="icon Dashboard">
					<img
						src="~/assets/icons/dashboard.svg"
						alt="icon"
					>
				</span>
				<span class="text">Dashboard</span>
			</li>
			<li
				:class="{ active: activeItem === 'Tablas' }"
				@click="navigateTo('Tabla', '/tablas')"
			>
				<span class="icon Graphs">
					<img
						src="~/assets/icons/bar-chart.svg"
						alt="icon"
					>
				</span>
				<!-- Data Visualization 📊 -->
				<span class="text">Tablas</span>
			</li>
			<li
				:class="{ active: activeItem === 'Cuenta' }"
				role="menuitem"
				@click="navigateTo('Cuenta', '/cuenta')"
			>
				<span class="icon">
					<img
						src="~/assets/icons/billing.svg"
						alt="icon billing"
					>
					<!-- Billing Settings 💳 -->
				</span>
				<span class="text">Cuenta</span>
			</li>
			<li
				:class="{ active: activeItem === 'Ajustes' }"
				role="menuitem"
				@click="navigateTo('Ajustes', '/ajustes')"
			>
				<span class="icon">
					<img
						src="~/assets/icons/gear.svg"
						alt="icon gear"
					>
					<!-- App Personalization ⚙️ -->
				</span>
				<span class="text">Ajustes</span>
			</li>
		</ul>
		<!-- Help panel 🆘 -->
		<div
			class="help-panel"
			role="region"
			aria-labelledby="help-panel-title"
		>
			<span class="icon">
				<img
					src="~/assets/icons/question-circle.png"
					alt="icon question"
					width="32rem"
					height="32rem"
				>

			</span><h3>¿Necesitas ayuda?</h3>
			<!-- Support Call 📞 -->
			<button
				aria-label="Contact Support"
				@click="contactSupport"
			>
				Contáctanos
			</button>
		</div>
	</div>
</template>

<script>
// Removed unused navigateToDashboard function to resolve linting error.
</script>

<style scoped>
.sidebar {
  width: 20rem;
  background: linear-gradient(180deg, #0a0f2c, #04124c);
  color: white;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1.25rem 0.625rem;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.2);
}

.logo {
  text-align: center;
  margin-bottom: 3rem;
  font-size: 5rem
}

.logo img {
  max-width: 8.375rem;
}

.logo h2 {
  font-size: 1.5rem;
  margin: 0.675rem 0 0;
  color: white;
}

.menu {
  list-style: none;
  padding: 0;
  margin: 0;
}

.menu li {
  display: flex;
  align-items: center;
  padding: 0.75rem .938rem;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s, transform 0.2s;
  color: white;
}

.menu li .icon {
  margin-right: 0.938rem;
  color: white;
}

.menu li .icon img {
  width: 1.75rem;
  height: 1.75rem;
  filter: invert(1);
  color: white;
}

.menu li .text {
  font-size: 1.1rem;
  color: white;
}

.menu li.active,
.menu li:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: scale(1.05);
}

.help-panel {
  text-align: center;
  border-radius: 0.75rem;
  padding: 0.75rem;
  background-image: url('~/assets/icons/helpPanel.png');
  background-size: cover;
  background-repeat: no-repeat;
}

.help-panel h3 {
  font-size: 1rem;
  margin-bottom: 10px;
  color: white;
}

.help-panel button {
  background: #0F194E;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s, transform 0.2s;
}

.help-panel button:hover {
  background: #ddd;
  transform: scale(1.05);
}

/* Responsive Design 📱 */
/* Media queries for tablets  */
@media (max-width: 768px) {
  .sidebar {
    width: 12.5rem;
    height: auto;
    padding: 1rem 0.5rem;

  }

  .logo {
    margin-bottom: 1rem;
  }

  .menu li .text {
   font-size: 1rem;
  }

  .help-panel {
    margin-top: 1rem;
  }
}

/* Media queries for mobile  */

@media (max-width: 465px) {
  .sidebar {
    width: 4.5rem;
    height: 100vh;
    overflow-y:auto;

  }

  .logo img {
    max-width: 4rem;
  }

  .logo h2 {
  display: none;
  }
  .menu li  {
    flex-direction: column;
    align-items: center;
    padding: 0.5rem;
  }

  .menu li .text {
    font-size: 0.875rem;
  }

  .menu li .icon{
    margin-right: 0;
    margin-bottom: 0.25rem;
  }

  .menu li .text {
    font-size: 0.875rem;
    display: none;
  }

  .help-panel h3 {
    font-size: 0.36rem;
    color: #ddd;
  }

  .help-panel button {
    font-size: 0.14rem;
    padding: 0.5rem 0.75rem;
  }

}
</style>
