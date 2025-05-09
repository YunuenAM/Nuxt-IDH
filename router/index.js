import { createRouter, createWebHistory } from 'vue-router';
import TablaComponent from '~/components/app/TablaComponent.vue';
import HomeComponent from '~/components/app/HomeComponent.vue';
import CuentaComponent from '~/components/app/CuentaComponent.vue';
import AjustesComponent from '~/components/app/AjustesComponent.vue';// import HomeComponent from '~/components/app/HomeComponent.vue';

const routes = [
	{
		path: '/',
		name: 'Home',
		component: HomeComponent,
	},
	{
		path: '/tabla',
		name: 'Tabla',
		component: TablaComponent,
	},
	{
		path: '/cuenta',
		name: 'Cuenta',
		component: CuentaComponent,
	},
	{
		path: '/ajustes',
		name: 'Austes',
		component: AjustesComponent,
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});
export default router;
