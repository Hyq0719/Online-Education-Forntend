<template>
    <div>
        <!-- <sidebar></sidebar> -->
        <myheader></myheader>
        <nav1></nav1>
        <div style="height:1000px;"></div>
        <myfooter></myfooter>
        
    </div>
</template>

<script>
import myheader from '../components/myheader'
import nav1 from '../components/nav1'
import myfooter from '../components/myfooter'
// import sidebar from '../components/sidebar'
    export default{
        components:{
            myheader,
            nav1,
            myfooter,
            // sidebar,
        },
    }
</script>

<style>

</style>