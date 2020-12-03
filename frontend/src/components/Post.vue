<template>
    <div class="posts">
        <h1 class="post__h1"> Un seul Post </h1>
        <div class="post" id="post" v-for="post in post" :key="post.postId">
            <div class="post__title">
                <p class="post__user">{{ post.User.firstName }}  {{ post.User.lastName }}</p>
                <p class="post__desc">{{ post.content }}</p>
                <button 
                v-if="post.creator_Id == userId || userRole == 1"
                v-on:click='toggleModale'
                class="home__button">
                    Modifier mon post
                </button>
            </div>

            <div class="post__image">
                <img :src="post.imageUrl" alt="" class="post__img">
            </div>
           
            <Likes v-bind:post="post"/>
            <Comments/>
            <ModalePost v-bind:revele="revele" v-bind:post="post" v-bind:toggleModale="toggleModale" v-bind:printPost="printPost"/>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import Comments from './Comments'
import Likes from './Likes'
import ModalePost from './ModalePost'
import VueJwtDecode from 'vue-jwt-decode'
export default {
    name: 'Post',
    components:{
        Comments,
        Likes,
        ModalePost,
        
    },
    data(){
        return {
            post: "",
            revele: false,
            userRole: VueJwtDecode.decode(sessionStorage.getItem('usertoken')).role,
            userId: sessionStorage.getItem('userId')
        }
    },
    methods: {
        toggleModale(){
            this.revele = !this.revele;
        },
        printPost(){
            const hashUrl = window.location.hash;
            const post_Id = hashUrl.split('/')[2];
            const token = sessionStorage.getItem('usertoken');
            axios.get('http://localhost:3000/api/posts/' + post_Id, 
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(res => {
                const data = res.data;
                this.post = data;
            })
            .catch(error => console.log({error}));
        },
    },
    beforeMount() {
        this.printPost()
        }
    }

</script>

<style lang="scss">


    .post{
        margin-bottom: 30px;
        background-color: white;

        border-radius: 10px;
        box-shadow: 0px 0px 10px hsla(0, 0%, 0%, 0.26);

        &__h1{
            margin: 140px 0 45px;;
        }

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
        &__image{
            width: 100%;
        }
        &__img{
            width: 100%;
            position: relative;
            z-index: 0;
            
        }
        &__commsAndLike{
            margin-bottom: 20px;
            padding: 10px;
        }
    }
</style>