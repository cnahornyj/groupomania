<template>
    <div class="home">
        <div class="header">
            <NavBar/>
        </div>
        <div class="contentBar">
            <Posts/>
        </div>
    </div>
</template>

<script>
import NavBar from '../components/NavBar.vue'
import Posts from '../components/Posts.vue'

export default {
    name: 'Home',
    components:{
        NavBar,
        Posts,
    },
}
</script>

<style lang="scss">

    .home{
        display:flex;
        flex-direction: column;
    }

    .header{
        position: fixed;
        order:1;
        z-index: 2;
        background-color: #004367;
        height: 80px;
        width:100%;
        padding: 20px;

        @media (max-width: 556px){
            height: 120px;
        }

    }

    .contentBar{
        order:3;
        width: 100%;
        max-width: 800px;
        margin: auto;
    }

    .addBar{
        order:2;
        width: 100%;
        max-width: 800px;
        margin: auto;
        padding: 20px;
    }
</style>