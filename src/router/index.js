import Vue from 'vue'
import Router from 'vue-router'
import Login from '../views/Login';
import LoginTeacher from '../views/LoginTeacher';
import Main from '../views/Main';
import Register from '../views/Register';
import RegisterTeacher from '../views/RegisterTeacher';
import Live from '../views/Live';
import Course from '../views/Course';
import CourseMenu from '../views/CourseMenu';
import Searchpage from "@/views/Searchpage";
import Classmanagement from "@/views/Classmanagement";
import Information from '../views/Information';
import Feedback from "@/views/Feedback";
import Classmanagement_student from "@/components/classmanagement/student";
import Classmanagement_class from "@/components/classmanagement/class";

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/login',
            name: 'Login',
            component: Login,
        },
        {
            path: '/login/teacher',
            name: 'LoginTeacher',
            component: LoginTeacher,
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
            name: 'RegisterTeacher',
            component: RegisterTeacher,
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
            children: [{

                path: 'student',
                name: 'Classmanagement_student',
                component: Classmanagement_student,
            },
                {
                    path: 'class',
                    name: 'Classmanagement_class',
                    component: Classmanagement_class,
                }]
        },
        {
            path: '/Information',
            name: 'Information',
            component: Information,
        },
        {
            path: '/Feedback',
            name: Feedback,
            component: Feedback,
        }
    ]
})
