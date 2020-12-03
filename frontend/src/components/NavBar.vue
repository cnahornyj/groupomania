<template>
    <nav class="navigation">
        <router-link class="navigation__link" to="/Home"><img class="navigation__logo" src="../assets/white-logo.png" alt="logo Groupomania blanc"></router-link>
        <div class="navigation__links">
            <router-link class="navigation__link" to="/Home">Accueil</router-link>
            <router-link class="navigation__link" to="/Profile">Mon Profil</router-link>
            <p class="navigation__link" to="/Login" v-on:click="Logout()">Déconnexion</p>
        </div>
        
    </nav>
</template>

<script>
export default {
    name:'NavBar',
    data(){
        return {
            userId: sessionStorage.getItem('userId')
        }
    },
    methods:{
        Logout(){
            console.log("Sessionstorage Cleared");
            sessionStorage.clear();
            this.$store.commit("setAuthentication", false);
            this.$router.push('/Login');
        }
    }
}
</script>

<style lang="scss">
    .navigation{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        max-width: 800px;
        height: 100%;
        margin: auto;

        position: relative;

        @media (max-width: 556px){
            flex-direction: column;
        }


        &__link{
            display: inline-block;
            text-decoration: none;
            color: white;
            font-size: 15px;
            margin:0px 10px 0px;
            cursor: pointer;

            &:active{
                opacity: 0.7;
            }

            @media (max-width: 556px){
                font-size: 12px;
            }
        }
    }
</style>