<template>
    <div class="profile">
        <main>
            <div id="profile" v-for="user in profile" :key="user.userId">
                <h3>Bonjour <span>{{ user.firstName }}</span> ravi de vous revoir !</h3><hr>
                <div id="profile_informations">
                    <p>{{ user.firstName }} {{ user.lastName }}</p>
                    <p>{{ user.email }}</p>
                    <p>Vous êtes parmis nous depuis le :</p>
                    <p>{{ user.createdAt | formatDate }}</p>
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

// Palette de couleurs
$primary-blue: #122442;
$text-danger: #d1515a;
$primary-grey: #aeaeaee0;
$secondary-grey: #424242;
$primary-white: whitesmoke;

main{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    #profile{
        text-align: center;
        margin: 5%;
        padding: 2%;
        width: 500px;
        background-color: #aeaeaee0;
        border: 0.25px solid darken(#aeaeaee0, 5%);
        border-radius: 5px;
        box-shadow: 0px 0px 20px 0px rgba(72, 79, 88,1);
        h3{
            span{
                color: $primary-blue;
            }
        }    
        #profile_informations {
            margin: 6%;
            line-height: 0.9;
            p{
                font-size: 120%;
            }
        }
        button {
            width: 200px;
            border: 1px outset $primary-grey;
            background-color: $primary-blue;
            color: white;
            border-radius: 10px;
            padding: 2.7%;
            font-size: 18px;
            text-decoration: none;
            text-align: center;
            font-weight: bold;
            &:hover{
                background: darken($primary-blue, 5%);
                transform: scale(1.01);
            }
        }
        #modal-confirmation{
            #confirm, #cancel{
                width: 100px;
                margin: 1% 4% 3% 4%;
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
        button{
            width: 250px;
            padding: 1%;
            margin-bottom: 6%;
            background-color: $primary-blue;
            &:hover{
                transform: scale(1.05);
                background-color: darken($text-danger, 10%);
            }
        }
    }
}
// RESPONSIVE
@media screen and (min-width: 300px) and (max-width: 325px){
main{
    #profile {
        width: 280px;
        margin: 10% 0 10% 0;
        }
    }
}
@media screen and (min-width: 326px) and (max-width: 400px){
main{
    #profile {
        width: 300px;
        margin: 10% 0 10% 0;
        }
    }
}
@media screen and (min-width: 401px) and (max-width: 425px){
main{
    #profile {
        width: 340px;
        margin: 10% 0 10% 0;
        }
    }
}
@media screen and (min-width: 426px) and (max-width: 500px){
main{
    #profile {
        width: 400px;
        margin: 5% 0 5% 0;
        }
    }
}
@media screen and (min-width: 501px) and (max-width: 525px){
main{
    #profile {
        width: 450px;
        margin: 5% 0 5% 0;
        }
    }
}
@media screen and (min-width: 526px) and (max-width: 600px){
main{
    #profile {
        width: 490px;
        }
    }
}

</style>