import Vue from 'vue';
import Router from 'vue-router';
import Main from '../views/Main';
import Index from '../views/Index';
import Login from '../views/Login';
import LoginTeacher from '../views/LoginTeacher';
import Register from '../views/Register';
import RegisterTeacher from '../views/RegisterTeacher';
import Live from '../views/Live';
import LiveMenu from '../views/LiveMenu';
import Course from '../views/Course';
import CourseMenu from '../views/CourseMenu';
import Task from '../views/Task';
import TaskMenu from '../views/TaskMenu';
import Searchpage from "@/views/Searchpage";
import classManagement from "@/views/Classmanagement";
import TeacherInfo from '../views/TeacherInfo';
import Information from '../views/Information';
import InformationChange from '../views/InformationChange';
import History from '../views/History';
import Collect from '../views/Collect';
import VIP from '../views/VIP';
import Feedback from "@/views/Feedback";

import classManagementClass from "@/components/classmanagement/class";
import classBread from "@/components/classmanagement/classbread";
import commentClass from "@/components/classmanagement/commentClass";
import liveManagement from "@/components/classmanagement/liveManagement";
import blank from "@/components/classmanagement/blank";
import commentAudit from "@/components/admin/commentAudit";
import liveAudit from "@/components/admin/liveAudit";
import classAudit from "@/components/admin/classAudit";
import adminPage from "@/components/admin/adminPage";
import adminLogin from "@/components/admin/adminLogin";
import teacherAudit from "@/components/admin/teacherAudit";

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Index',
            component: Index,
        },
        {
            path: '/main',
            name: 'Main',
            component: Main,
        },
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
            path: '/task',
            name: 'Task',
            component: Task,
        },
        {
            path: '/taskmenu',
            name: 'TaskMenu',
            component: TaskMenu,
        },
        {
            path: '/searchpage',
            name: 'searchpage',
            component: Searchpage,
        },
        {
            path: '/Classmanagement',
            name: 'classManagement',
            component: classManagement,
            children: [
                {
                    path: 'classBread',
                    name: 'classBread',
                    component: classBread,
                },
                {
                    path: 'class/:id',
                    name: 'classManagementClass',
                    props: true,
                    component: classManagementClass,
                },
                {
                    path: 'commentClass/:id',
                    name: 'commentClass',
                    props: true,
                    component: commentClass,
                },
                {
                    path:'liveManagement',
                    name:'liveManagement',
                    component:liveManagement,
                },
                {
                    path:'blank',
                    name:'blank',
                    component:blank,
                },
            ]
        },
        {
            path:'/admin',
            name:'admin',
            redirect: {name : "adminLogin"},
            replace: true,
        },
        {
            path:'/adminLogin',
            name: 'adminLogin',
            component: adminLogin,
        },
        {
            path:'/adminPage',
            name:'adminPage',
            component:adminPage,
            children:[
                {
                    path: 'classAudit',
                    name: 'classAudit',
                    component: classAudit,
                },
                {
                    path: 'commentAudit',
                    name: 'commentAudit',
                    component: commentAudit,
                },
                {
                  path: 'liveAudit',
                  name: 'liveAudit',
                    component: liveAudit,
                },
                {
                    path: 'teacherAudit',
                    name: 'teacherAudit',
                    component: teacherAudit,
                },
            ]
        },
        {
            path: '/TeacherInfo',
            name: 'TeacherInfo',
            component: TeacherInfo,
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
            path: '/history',
            name: 'History',
            component: History,
        },
        {
            path: '/collect',
            name: 'Collect',
            component: Collect,
        },
        {
            path: '/VIP',
            name: 'VIP',
            component: VIP,
        },
        {
            path: '/Feedback',
            name: Feedback,
            component: Feedback,
        },
    ],
});
