import Vue from 'vue'
import Router from 'vue-router'
import Login from '../views/Login';
import LoginTeacher from '../views/LoginTeacher';
import Main from '../views/Main';
import Register from '../views/Register';
import RegisterTeacher from '../views/RegisterTeacher';
import Live from '../views/Live';
import LiveMenu from '../views/LiveMenu';
import Course from '../views/Course';
import CourseMenu from '../views/CourseMenu';
import Searchpage from "@/views/Searchpage";
import Classmanagement from "@/views/Classmanagement";
import Information from '../views/Information';
import InformationChange from '../views/InformationChange';
import Feedback from "@/views/Feedback";
import Classmanagement_class from "@/components/classmanagement/class";
import buildClass from "@/components/classmanagement/buildClass";
import updateClass from "@/components/classmanagement/updateClass";

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
            path: '/livemenu',
            name: 'LiveMenu',
            component: LiveMenu,
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
            children: [
                {
                    path: 'class',
                    name: 'Classmanagement_class',
                    component: Classmanagement_class,
                },
                {

                    path: 'updateClass',
                    name: 'updateClass',
                    component: updateClass,
                },
                {
                    path: 'buildClass',
                    name: 'buildClass',
                    component: buildClass,
                }]
        },
        {
            path: '/Information',
            name: 'Information',
            component: Information,
        },
        {
            path: '/Information/change',
            name: 'InformationChange',
            component: InformationChange,
        },
        {
            path: '/Feedback',
            name: Feedback,
            component: Feedback,
        }
    ]
})
