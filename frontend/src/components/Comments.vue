<template>
    <div class="commentaires">
        <CreateComment v-bind:comments="comments" v-bind:printComments="printComments"/>
        <h2 class="commentaires__title"> Les Commentaires </h2>
        <div class="comments" id="comment" v-for='comment in comments' :key='comment.commentId'>
            <div class="comments__title">
                <p class="comments__user">{{ comment.User.firstName }}  {{ comment.User.lastName }}</p>
                <div class="comments__optionToggle" title="toggle-options" v-on:click="optionToggle(comment)" v-if="comment.commentor_Id == userId || userRole == 1"><font-awesome-icon icon="ellipsis-h" /></div>
                <div class="comments__option" v-if="comment.option">
                    <div class="comments__button comments__button--delete" title="Supprimer le commentaire" v-if="comment.commentor_Id == userId || userRole == 1" v-on:click="deleteComment(comment.commentId)">
                        Supprimer 
                        <font-awesome-icon icon="trash" />
                    </div>
                    <div class="comments__button comments__button--modify" title="Modifier le commentaire" v-if="(comment.commentor_Id == userId || userRole == 1) && comment.modify == false" v-on:click="modifyPrompt(comment), optionToggle(comment)" >
                        Modifier
                        <font-awesome-icon icon="pen" />
                    </div>
                </div>
                
            </div>
            <p class="comments__content" v-if="comment.modify == false">{{ comment.content }} </p>
            <form class="comments__form" method="POST" v-on:submit.prevent="modifyComm(comment.commentId, comment)" v-if="comment.modify == true">
                <div class="modale__button" role="button" title="Annuler" v-on:click="modifyPrompt(comment)">X</div>
                <input type="text" class="comment__input"  v-model="comment.content">
            </form>
            
        </div>
    </div>
</template>

<script>
import CreateComment from './CreateComment'
import axios from 'axios'
import VueJwtDecode from 'vue-jwt-decode'
export default {
    name: 'Comments',
    components:{
        CreateComment
    },
    data(){
        return {
            comments: "",
            userRole: VueJwtDecode.decode(sessionStorage.getItem('usertoken')).role,
            userId: sessionStorage.getItem('userId'),
        }
    },
    methods:{
        optionToggle(comment){
            comment.option = !comment.option
        },
        modifyPrompt(comment){
            comment.modify = !comment.modify;
        },
        modifyComm(id, comment){
            const commentId = id;
            const token = sessionStorage.getItem('usertoken');
            const body = {
                content: comment.content
            }
            const header = {
                headers :{
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
            axios.post('http://localhost:3000/api/comments/' + commentId, body, header )
            .then(res => {
                console.log(res);
                comment.modify = !comment.modify;
            })
            .catch(error => console.log(error));
        },
        printComments(){
            const hashUrl = window.location.hash;
            const post_Id = hashUrl.split('/')[2];
            const token = sessionStorage.getItem('usertoken');
            axios.get('http://localhost:3000/api/comments/' + post_Id, 
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(res => {
                let data = res.data;
                console.log("les commentaires", data);
                for (let i = 0; i<data.length; i++){
                    data[i].modify = false;
                    data[i].option = false;
                }
                this.comments = data;
            })
            .catch(error => console.log({error}));
        },
        deleteComment(id){
            const commentId = id;
            const token = sessionStorage.getItem('usertoken');
            const header = {
                headers :{
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
            axios.delete('http://localhost:3000/api/comments/' + commentId, header )
            .then(() => {
                    this.printComments();
                })
            .catch(error => console.log(error));
        }
    },
    beforeMount() {
            this.printComments()
        }
    }

</script>

<style lang="scss">
    .commentaires {
        padding: 10px;

        
        &__title{
            margin-bottom: 18px;
        }
    }

    .comments{
        padding: 10px;
        background-color: rgba(206, 206, 206, 0);
        border-bottom: 1px solid rgba(238, 238, 238, 1);
        &:hover{
            background-color: rgba(238, 238, 238, 1);
        }
        &__title{
            display: flex;
            margin-bottom: 16px;
            position: relative;
        }
        &__user{
            font-weight: 600;
            margin-right: 20px;
        }
        &__date{
            color: rgba(88, 88, 88, 0.651);
        }
        &__content{
            margin-bottom: 15px;
        }
        

        &__form{
            position: relative;
        }

        &__option{
            padding: 10px 5px;
            position: absolute;
            top: 0px;
            right: 40px;
            border-radius: 5px;
            background-color: white;
            box-shadow: 0px 0px 5px   rgb(129, 129, 129);
            display: flex;
        }

        &__button{
            display: block;
            padding: 5px 10px;
            border-radius: inherit;
            cursor: pointer;
            font-size: 13px;
            margin: 0 5px;
            &--delete{
                color: red;
                
            }
            &--modify{
                color:#004367;
            }

            &:hover{
                background-color: rgba(238, 238, 238, 1);
            }
        }

        &__optionToggle{
            position: absolute;
            top: 0px;
            right: 5px;
            font-size: 16px;
            padding: 2px 6px;
            border-radius: 5px;
            cursor: pointer;

            &:hover{
                background-color: rgb(201, 201, 201);
            }
        }
    }
</style>