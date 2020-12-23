<template>
    <main>
        <CreatePosts v-bind:posts="posts"  v-bind:userRole="userRole" v-bind:printNewPosts="printNewPosts"/>
        <div id="post" v-for="post in posts" :key="post.postId">
            <div class="title">
                <div class="user-bloc">
                    <div class="publication-informations">
                        <p class="user-complete-name">{{ post.User.firstName }}  {{ post.User.lastName }}</p>
                        <p>le {{ post.createdAt | formatDate }}</p>
                    </div>
                </div>
                <div class="div-icon">
                    <font-awesome-icon icon="trash" id="icon-trash" v-if="post.creator_Id == userId || userRole == 1" v-on:click="deletePost(post.postId)"/>
                </div>
            </div>
            <p>{{ post.content }}</p>
            <router-link :to="{name:'Post', params: {id : post.postId}}">
                <div id="bloc-image">
                    <img :src="post.imageUrl" :alt="post.content" id="image-link">
                    <font-awesome-icon icon="comments" id="icon-comment" title="Commenter le post" alt="Icône cliquable pour commenter"/>
                </div>
            </router-link>
            <Likes v-bind:post="post"/>
        </div>
    </main>
</template>

<script>
import axios from 'axios'
import VueJwtDecode from 'vue-jwt-decode'
import CreatePosts from './CreatePosts'
import Likes from './Likes'
export default {
    name: 'Posts',
    components: {
        CreatePosts,
        Likes
    },
    data(){
        return {
            posts: "",
            userRole: "",
            userId: sessionStorage.getItem('userId'),
            token: sessionStorage.getItem('usertoken'),
            imagePreview: "https://cdn.iconscout.com/icon/free/png-256/comment-28-433219.png"
        }
    },
    methods:{
        deletePost(id){
            const postId = id;
            const token = sessionStorage.getItem('usertoken');
            const url = 'http://localhost:3000/api/posts/' + postId

            axios.delete(url, {
                headers :{
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(() => {
                this.printNewPosts();
            })
            .catch(error => console.log(error));
        },
        printNewPosts(){
            const token = sessionStorage.getItem('usertoken');
            const header = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
            axios.get('http://localhost:3000/api/posts/', header)
            .then(res => {
                const data = res.data;
                console.log(data);
                this.posts = data;
            })
            .catch(error => console.log({error}));
        }
    },
    
    beforeMount() {
        const decodedToken = VueJwtDecode.decode(sessionStorage.getItem('usertoken'));
        const UserRole = decodedToken.role;
        this.userRole = UserRole;
        this.printNewPosts();
    },
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
    #post{
        width: 500px;
        padding: 2%;
        background-color: $primary-grey;
        border: 0.25px solid darken($primary-grey, 5%);
        border-radius: 5px;
        box-shadow: 0px 0px 20px 0px rgba(72, 79, 88,1);
        p{
            text-align: justify;
        }
        .title{
            display: flex;
            justify-content: space-between;
            border-bottom: 1px solid $secondary-grey;
            padding-bottom: 1%;
            .user-bloc{
                display: flex;
            }
            .div-icon {
                margin-left: -50%;
            }
            #icon-trash{
                font-size: 20px;
                color: #424242;
                &:hover{
                    transform: scale(1.2);
                    opacity: 1;
                }
            }
            .publication-informations{
                font-weight: 400;
                line-height: 0.5;
                margin-right: 185px;
                .user-complete-name{
                    width: 200px;
                    font-weight: 500;
                }
            }
        }
        #bloc-image{
            height: 260px;
            #image-link{
                width: 100%;
                height: 100%;
                border: 0.5px outset grey;
            }
            #icon-comment{
                width: 100%;
                height: 100px;
                color: #424242;
                position: relative;
                top: -200px;
                visibility: hidden;
            }
            &:hover{
                transition: 0.1s;
                transition-timing-function: ease-in;
                opacity: 0.5;
                #icon-comment{
                    visibility: initial;
                }
            }
        }
    }
}

// RESPONSIVE
@media screen and (min-width: 300px) and (max-width: 325px){
main{
    #post {
        width: 280px;
        margin: 10% 0 10% 0;
        }
    }
}
@media screen and (min-width: 326px) and (max-width: 400px){
main{
    #post {
        width: 300px;
        margin: 10% 0 10% 0;
        }
    }
}
@media screen and (min-width: 401px) and (max-width: 425px){
main{
    #post {
        width: 340px;
        margin: 10% 0 10% 0;
        }
    }
}
@media screen and (min-width: 426px) and (max-width: 500px){
main{
    #post {
        width: 400px;
        margin: 5% 0 5% 0;
        }
    }
}
// A PARTIR DE CETTE RESOLUTION D'ECRAN OK POUR LES BOUTONS 
@media screen and (min-width: 501px) and (max-width: 525px){
main{
    #post {
        width: 450px;
        margin: 5% 0 5% 0;
        }
    }
}
@media screen and (min-width: 526px) and (max-width: 600px){
main{
    #post {
        width: 490px;
        }
    }
}
</style>