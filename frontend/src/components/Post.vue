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
                <div class="div-icon">
                <font-awesome-icon icon="pen" id="icon-pen" alt="Icône pour modifier le post" v-if="post.creator_Id == userId || role == 1" v-on:click='toggleModale'/>
                </div>
            </div>
            <p>{{ post.content }}</p>
            <div>
                <img :src="post.imageUrl" alt="Image du post" style="width: 100%;border: 0.5px outset grey;">
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
            role: sessionStorage.getItem('role'),
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

$secondary-grey: #424242;
#post {
    margin: 2% 0 2% 0;
}
#icon-pen{
    font-size: 20px;
    color: $secondary-grey;
    &:hover{
        transform: scale(1.2);
        opacity: 1;
    }
}
        
</style>