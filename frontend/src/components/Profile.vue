<template>
    <div class="profile">
        <main>
        <div id="profile" v-for="user in profile" :key="user.userId">
            <h3>Bonjour <span>{{ user.firstName }}</span> ravi de vous revoir !</h3><hr>
            <img src="../assets/alex.jpg" alt="Votre photo de profil"/>
            <div id="profile_informations">
                <p>{{ user.firstName }} {{ user.lastName }}</p>
                <p>{{ user.email }}</p>
                <p>Vous êtes parmis nous depuis le {{ user.createdAt | formatDate }}</p>
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
