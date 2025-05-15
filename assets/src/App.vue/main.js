import { createApp } from 'vue';
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import router from './router';

createApp(App).use(router).use(vuetify).mount('#app');

export default createVuetify({ components, directives });
