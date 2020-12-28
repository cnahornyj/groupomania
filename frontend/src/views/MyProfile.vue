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
            role: sessionStorage.getItem('role'),
            token: sessionStorage.getItem('usertoken')
        }
    },
    components:{
        NavBar,
        Profile,
    }
}
</script>
