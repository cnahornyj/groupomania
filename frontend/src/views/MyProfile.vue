<template>
    <div class="home">
        <div class="header">
            <NavBar/>
        </div>
        <div class="addBar">
            <Profile v-bind:userId="userId" v-bind:token="token"/>
        </div>
    </div>
</template>

<script>
import NavBar from '../components/NavBar.vue'
import Profile from '../components/Profile.vue'

export default {
    name: 'Home',
    data(){
        return{
            revele: false,
            userId: sessionStorage.getItem('userId'),
            token: sessionStorage.getItem('usertoken')
        }
    },
    components:{
        NavBar,
        Profile,
    }
}
</script>

<style lang="scss">
    .home__button{
        display: block;
        padding: 5px 10px;
        border-radius: 5px;
        border: none;
        color: white;
        background-color:#004367;
        margin-top: 25px;

        cursor: pointer;

        &--delete{
            background-color: red;
        }
    }
</style>