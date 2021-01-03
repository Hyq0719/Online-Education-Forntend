import Vue from 'vue'
import Router from 'vue-router'
import Login from '../views/Login';
import Main from '../views/Main';
import Register from '../views/Register';
import TeacherRegister from '../views/TeacherRegister';
import Live from '../views/Live';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            path: '/',
            name: 'Main',
            component: Main,
        },
        {
            path: '/register',
            name: 'Register',
            component: Register,
        },
        {
            path: '/register/teacher',
            name: 'TeacherRegister',
            component: TeacherRegister,
        },
        {
            path: '/live',
            name: 'Live',
            component: Live,
        },
    ]
})
