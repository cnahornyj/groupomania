<template>
    <div class="profile">
        <main>
        <div id="profile" v-for="user in profile" :key="user.userId">
            <h3>Bonjour <span>{{ user.firstName }}</span> ravi de vous revoir !</h3><hr>
            <div id="profile_informations">
                <h4>Votre profil</h4>
                <p>{{ user.firstName }} {{ user.lastName }}</p>
                <p>{{ user.email }}</p>
                <p>Vous êtes parmis nous depuis le {{ user.createdAt }}</p>
            </div> 
            <button v-on:click="deleteAccount">Supprimer mon compte</button>
        </div>
       </main>
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
#profile{
    h3{
        color: rgb(77, 76, 76);
    }
    text-align: center;
    margin: 5%;
    padding: 2%;
    width: 600px;
    background-color: #aeaeaee0;
    border: 0.25px solid darken(#aeaeaee0, 5%);
    border-radius: 5px;
    box-shadow: 0px 0px 20px 0px rgba(72, 79, 88,1);
    #profile_informations{
        margin: 2%;
    }
    h4{
        margin: 3% 0 3% 0;
    }
    p{
        line-height: 1.7;
    }
    button{
        width: 250px;
        padding: 1%;
    }
}
</style>