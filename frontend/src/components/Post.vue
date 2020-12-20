<template>
    <main>
        <div id="post" v-for="post in post" :key="post.postId">
            <div class="title">
                <div class="user-bloc">
                    <div class="publication-informations">
                        <p class="user-complete-name">{{ post.User.firstName }}  {{ post.User.lastName }}</p>
                        <p>le {{ post.createdAt | formatDate }}</p>
                    </div>
                </div>
                <div>
                <font-awesome-icon icon="pen" style="font-size: 20px; color:grey;" v-if="post.creator_Id == userId || userRole == 1" v-on:click='toggleModale'/>
                </div>
            </div>
            <p class="post-content">{{ post.content }}</p>
            <div>
                <img :src="post.imageUrl" alt="Image relative au post" style="width: 100%;border: 0.5px outset grey;">
            </div>
            <Likes v-bind:post="post"/>
            <Comments/>
            <ModalePost v-bind:revele="revele" v-bind:post="post" v-bind:toggleModale="toggleModale" v-bind:printPost="printPost"/>
        </div>
    </main>
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
