import { createApp } from 'vue';
import App from './App.vue';
import VueKonva from 'vue-konva';
import VueSignature from "vue-signature-pad";




const app = createApp(App);
app.use(VueSignature);
app.config.productionTip = false;
app.use(VueKonva);
app.mount('#app');