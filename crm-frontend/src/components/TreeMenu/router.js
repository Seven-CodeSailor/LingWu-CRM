import { createRouter,createWebHashHistory } from 'vue-router'
import Home from "./Home.vue"
import switch-page from "./switch-page.vue"
const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: "/",
            component: Home
        },
        {
            path: "/switch-page",
            component: switch-page
        }
    ]
})

export default router