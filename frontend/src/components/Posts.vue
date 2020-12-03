<template>
    <div class="posts">
        <CreatePosts v-bind:posts="posts"  v-bind:userRole="userRole" v-bind:printNewPosts="printNewPosts"/>
        <h1 class="posts__title"> Les Posts </h1>
        <div class="post" id="post" v-for="post in posts" :key="post.postId">
            
            <div class="post__title">
                <p class="post__user">{{ post.User.firstName }}  {{ post.User.lastName }}</p>
                <p class="post__desc">{{ post.content }}</p>
                <button class="post__delete" v-if="post.creator_Id == userId || userRole == 1" v-on:click="deletePost(post.postId)">
                    Supprimer 
                    <font-awesome-icon icon="trash" />
                </button>
            </div>
            <router-link :to="{name:'Post', params: {id : post.postId}}" class="post__link">
                <div class="post__image">
                    <img :src="post.imageUrl" :alt="post.content" class="post__img">
                </div>
            </router-link>
            <Likes v-bind:post="post"/>
        </div>
    </div>
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
    .posts{
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin: auto;
        &__title{
            margin: 20px 0 34px;
            font-size: 26px;
            font-weight: 700;
        }
    }

    .post{
        &:hover{
            box-shadow: 0px 0px 30px hsla(0, 0%, 0%, 0.26);
        }
        margin-bottom: 30px;
        padding-bottom: 30px;
        background-color: white;

        border-radius: 10px;
        box-shadow: 0px 0px 10px hsla(0, 0%, 0%, 0.26);
        transition: box-shadow ease-in-out 200ms;

        &__title{
            font-size: 15px;
            margin-top: 10px;
            padding: 10px;
            position: relative;
            z-index: 1;

            p{
                margin-bottom: 10px;
            }
        }
        &__user{
            font-weight: 600;
        }
        &__desc{
            font-weight: 500;
        }
        &__date{
            color: #9A9A9A;
            font-weight: 300;
        }
        &__delete{
            position: absolute;
            top: 10px;
            right: 20px;
            z-index: 2;
            border: none;
            padding: 5px 8px;
            border-radius: 30px;
            color: white;
            background-color: #FD2D01;
            cursor: pointer;
            &:hover{
                box-shadow: 0px 0px 3px 1px rgba(0, 0, 0, 0.199);
            }
        }
        &__image{
            width: 100%;
        }
        &__img{
            width: 100%;
            position: relative;
            z-index: 0;
            
        }
        &__link{
            text-decoration: none;
        }
        &__commsAndLike{
            margin-bottom: 20px;
            padding: 10px;
            position: relative;
        }
        
    }
</style>