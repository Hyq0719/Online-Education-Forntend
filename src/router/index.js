import Vue from 'vue'
import Router from 'vue-router'
import login from '../views/login';
import main from '../views/main';
import register from '../views/register';
import teacherregister from '../views/teacherregister';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path:'/main/login',
      name:'login',
      component:login
    },
    {
      path:'/main',
      name:'main',
      component:main,
    },
    {
      path:'/main/register',
      name:'register',
      component:register,
    },
    {
      path:'/main/register/teacher',
      name:'teacherregister',
      component:teacherregister,
    }
  ]
})
