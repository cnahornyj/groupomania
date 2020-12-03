<template>
    <div class="profile">
        <div class="profile__box" v-for="user in profile" :key="user.userId">
            <h1 class="profile__title">Bonjour <span>{{ user.firstName }}</span> ravi de vous revoir !</h1>
            <h2 class="profile__subtitle">Voici vos informations : </h2>
            <p class="profile__firstName"><strong>Votre Nom :</strong> {{ user.firstName }}</p>
            <p class="profile__lastName"><strong>Votre Prénom :</strong> {{ user.lastName }}</p>
            <p class="profile__email"><strong>Votre e-mail :</strong> {{ user.email }}</p>
            <p class="profile__createdAt"><strong>Date de création :</strong> {{ user.createdAt }}</p>
        </div>
        <button v-on:click='deleteAccount'  class="home__button home__button--delete">Supprimer mon compte</button>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'Profile',
    props: ['userId', 'token'],
    data(){
        return {
            profile:""
        }
    },
    methods:{
        deleteAccount(){
            axios.delete('http://localhost:3000/api/users/' + this.userId, {
                headers: {
                    'Content-Type' : 'application/json',
                    'Authorization': `Bearer ${this.token}`
                }
            })
            .then(() => {
                console.log("Profil supprimé");
                sessionStorage.clear();
                this.$store.commit("setAuthentication", false);
                this.$router.push('/Login');
            })
        },
        toggleModale(){
            this.revele = !this.revele;
        }
    },
    mounted(){
        axios.get("http://localhost:3000/api/users/" + this.userId, 
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.token}`
            }
        })
        .then(res => {
            const data = res.data;
            console.log(data);
            this.profile = data;

        })
        .catch(error => console.log({error}));
    }
}
</script>

<style lang="scss">
    .profile{
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin: auto;

        p{
            margin-bottom: 15px;
        }

        &__box{
            margin-top: 150px;
        }

        &__title{
            margin-bottom: 25px;
            span{
                color:#0075b4;
            }
        }
        &__subtitle{
            margin-bottom:40px;
        }

    }
</style>