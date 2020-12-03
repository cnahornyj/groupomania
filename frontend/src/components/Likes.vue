<template>
    <div class="post__likebox">
        <p>{{ numberOfLikes }} Likes</p>
        <p class="post__like" title="like" role="button" :id="post.postId" v-on:click="Likes()"><font-awesome-icon icon="heart" /></p>
    </div>
        
</template>

<script>
import axios from 'axios'
export default {
    name: 'Likes',
    props:['post'],
    data(){
        return {
            numberOfLikes: "",
            userId: parseInt(sessionStorage.getItem('userId')),
            token: sessionStorage.getItem('usertoken'),
        }
    },
    created() {
        console.log("Je me crée (Likes)")
        const post_Id = this.post.postId
        const token = this.token;
        axios.get('http://localhost:3000/api/likes/' + post_Id,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        .then(res => {
            const data = res.data;
            console.log('Les likes :', data);
            this.numberOfLikes = data.length;
            if(res.data.find(u => u.liker_Id === this.userId )){
                this.post.isLiked = true;
                document.getElementById(this.post.postId).classList = "post__like post__liked"
                console.log(this.post.isLiked)
            } else {
                this.post.isLiked = false;
            }
        })
        .catch(error => console.log(error));
    },
    updated(){
        this.verificationOnUpdate();
    },
    methods:{
        Likes(){
            const post_Id = this.post.postId
            const token = this.token;
            let body = {
                userId: this.userId
            }
            const header = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
            console.log(body);
            if (this.post.isLiked == false){
                console.log("Je suis en train de liker");
                body.likes = 1;
                console.log(body)
                // Incrémentation des likes du post par 1 et ajout d'une instance dans la table likes
                axios.put('http://localhost:3000/api/likes/' + post_Id, body, header)
                .then(res => console.log(res))
                .catch(error => console.log(error));


                //Changement de la classe du bouton like pour devenir rouge
                document.getElementById(this.post.postId).classList = "post__like post__liked"
                this.numberOfLikes = this.numberOfLikes + 1;

            } else {
                console.log("Je suis en train d'annuler mon like");
                body.likes = 0;
                console.log(body);
                // Décrémentation des likes du post par -1 et suppression de l'instance dans la table likes
                axios.put('http://localhost:3000/api/likes/' + post_Id, body, header)
                .then(res => console.log(res))
                .catch(error => console.log(error));


                // Changement de la classe du bouton like pour devenir sans couleur
                document.getElementById(this.post.postId).classList = "post__like"
                this.numberOfLikes = this.numberOfLikes - 1;
            }
            this.post.isLiked = !this.post.isLiked
        },
        verificationOnUpdate(){
            if (document.getElementById(`${this.post.postId}`).classList == "post__like post__liked"){
            this.post.isLiked = true;
        } else {
            this.post.isLiked = false;
        }
        }
    }
}

</script>

<style lang="scss" >
    .post{
        &__likebox{
            padding: 10px;
            position: relative;
        }
        &__like{
        position: absolute;
        top: 10px;
        right: 20px;
        cursor: pointer;
        transition: transform ease-in-out 200ms, opacity 200ms;
        color: rgb(167, 167, 167);
        font-size: 20px;
        opacity: 0.8;
        
        &:hover{
            transform: scale(1.2);
            opacity: 1
        }
    }
    &__liked{
        color: #FD2D01;
    }
}
    
</style>