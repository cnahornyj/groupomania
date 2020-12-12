<template>
    <main>
        <div id="posts">
            <CreatePosts v-bind:posts="posts"  v-bind:userRole="userRole" v-bind:printNewPosts="printNewPosts"/>
            <div id="post" v-for="post in posts" :key="post.postId">
                <div class="title">
                    <img class="photo-user" src="../assets/alex.jpg" alt="Photo de profil de l'utilisateur"/>
                    <div class="publication-informations">
                        <p class="user-complete-name">{{ post.User.firstName }}  {{ post.User.lastName }}</p>
                        <p>le {{ post.createdAt | formatDate }}</p> <!-- Format exemple: 20 décembre 2020 -->
                    </div>
                    <div>
                    <font-awesome-icon icon="trash" style="font-size: 20px; color:grey;" id="iconTrash" v-if="post.creator_Id == userId || userRole == 1" v-on:click="deletePost(post.postId)"/>
                    </div>
                </div>
                <p class="post-content">{{ post.content }}</p>
                <router-link :to="{name:'Post', params: {id : post.postId}}" class="">
                    <img :src="post.imageUrl" :alt="post.content" id="imageLink">
                </router-link>
                <Likes v-bind:post="post"/>
            </div>
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
            token: sessionStorage.getItem('usertoken')
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
    #title{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: baseline;
        margin-bottom: 5%;
        padding-bottom: 3%;
        border-bottom: 1px solid whitesmoke;
    }
    #iconTrash{
        color: #424242 !important;
        &:hover{
            transform: scale(1.2);
            opacity: 1;
        }
    }
    #imageLink{
        width: 100%;
        height: 100%;
        border: 0.5px outset grey;
        &:hover{
            filter: grayscale(60%);
        }
    }
</style>