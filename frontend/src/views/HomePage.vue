<template>
    <div class="home">
            <NavBar/>
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
