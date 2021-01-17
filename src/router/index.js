import Vue from 'vue'
import Router from 'vue-router'
import Login from '../views/Login';
import Main from '../views/Main';
import Register from '../views/Register';
import TeacherRegister from '../views/TeacherRegister';
import Live from '../views/Live';
import Course from '../views/Course';
import CourseMenu from '../views/CourseMenu';
import Searchpage from "@/views/Searchpage";
import Classmanagement from "@/views/Classmanagement";

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/login',
            name: 'Login',
            component: Login,
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
        {
            path: '/course',
            name: 'Course',
            component: Course,
        },
        {
            path: '/coursemenu',
            name: 'CourseMenu',
            component: CourseMenu,
        },
        {
            path: '/searchpage',
            name: 'searchpage',
            component: Searchpage,
        },
        {
            path: '/Classmanagement',
            name: 'Classmanagement',
            component: Classmanagement,
        }
    ]
})
