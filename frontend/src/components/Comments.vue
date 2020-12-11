<template>
    <div id="commentaires">
        <CreateComment v-bind:comments="comments" v-bind:printComments="printComments"/>
        <div id="comments-list" v-for='comment in comments' :key='comment.commentId'>
            <p id="comment-user">{{ comment.User.firstName }}  {{ comment.User.lastName }}</p>
            <div title="toggle-options" id="toggle-options" v-on:click="optionToggle(comment)" v-if="comment.commentor_Id == userId || userRole == 1"><font-awesome-icon icon="ellipsis-h"/></div>
            <div v-if="comment.option" id="scrolling-menu">
                <div class="option" title="Supprimer le commentaire" v-if="comment.commentor_Id == userId || userRole == 1" v-on:click="deleteComment(comment.commentId)">
                    Supprimer 
                </div>
                <div class="option" title="Modifier le commentaire" v-if="(comment.commentor_Id == userId || userRole == 1) && comment.modify == false" v-on:click="modifyPrompt(comment), optionToggle(comment)" >
                    Modifier
                </div>
            </div>
            <p v-if="comment.modify == false">{{ comment.content }} </p>
            <form method="POST" v-on:submit.prevent="modifyComm(comment.commentId, comment)" v-if="comment.modify == true" id="modify-comment-form">
                <div role="button" id="modify-comment-btn-close" title="Annuler" v-on:click="modifyPrompt(comment)">X</div>
                <input type="text" v-model="comment.content" id="modify-comment-input">
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
#modify-comment-form{
    background-color: transparent;
    width: 414px;
    margin: -3% 0 0 -1%;
    border: none;
    box-shadow: none;
    #modify-comment-btn-close {
        float: right;
        font-weight: bold;
        margin: 5px -19px 0 0;
    }
    #modify-comment-input{
        margin: 0 0 0 -6%;
        width: 113%;
    }
}
</style>