<template>
    <div class="home">
        <div class="header">
            <NavBar/>
        </div>
        <div class="contentBar">
            <Post/>
        </div>
    </div>
</template>

<script>
import NavBar from '../components/NavBar.vue'
import Post from '../components/Post'

export default {
    name: 'Home',
    components:{
        NavBar,
        Post
    },
}
</script>

<style lang="scss">

</style>