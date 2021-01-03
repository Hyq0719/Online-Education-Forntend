import Vue from 'vue'
import Router from 'vue-router'
import login from '../views/login';
import main from '../views/main';
import register from '../views/register';
import teacherregister from '../views/teacherregister';
import live from '../views/live';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/login',
            name: 'logi+n',
            component: login
        },
        {
            path: '/',
            name: 'main',
            component: main,
        },
        {
            path: '/register',
            name: 'register',
            component: register,
        },
        {
            path: '/register/teacher',
            name: 'teacherregister',
            component: teacherregister,
        },
        {
            path: '/live',
            name: 'live',
            component: live,
        },
    ]
})
