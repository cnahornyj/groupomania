<template>
    <div class="profile">
        <main>
        <div id="profile" v-for="user in profile" :key="user.userId">
            <h3>Bonjour <span>{{ user.firstName }}</span> ravi de vous revoir !</h3><hr>
            <div id="profile_informations">
                <p>{{ user.firstName }} {{ user.lastName }}</p>
                <p>{{ user.email }}</p>
                <p>Vous êtes parmis nous depuis le {{ user.createdAt | formatDate }}</p>
            </div> 
            <button @click="toggleModale">Supprimer mon compte</button>
            <div id="modal-confirmation" v-if="showModal===true" @close="toggleModale">
                <hr>
                <p id="confirm-delete">Etes vous sûr de vouloir supprimer votre compte ?</p>
                <button id="confirm" @click="deleteAccount">OUI</button>
                <button id="cancel" @click="toggleModale">NON</button>
            </div>
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
            profile:"",
            showModal: false
        }
    },
    methods:{
        toggleModale(){
            this.showModal = !this.showModal
        },
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
    #modal-confirmation{
        #confirm, #cancel{
            width: 100px;
            margin: 2%;
        }
        #confirm{
            &:hover{
                transform: scale(1.01);
                color: #1F1F1F;
                background-color: #5CC150;
            }
        }
        p{
            font-weight: bold;
        }
    }
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