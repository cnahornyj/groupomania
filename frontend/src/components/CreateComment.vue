<template>
    <div class="comment">
        <h2 class="comment__title">
            Ajoutez un commentaire :
        </h2>
        <form method="POST" class="comment__form" v-on:submit.prevent='submit()'>
            <div class="comment__formbox" >
                <label for="comment-create" class="comment__label">Votre commentaire :</label>
                <input type="text" id="comment-create" class="comment__input" v-model="comment" placeholder="Entrez votre commentaire">
                <span class="form__error" v-if="(!$v.comment.required && $v.comment.$dirty) && submited" >Veuillez entrer un commentaire avant de valider</span>
            </div>
            <button class="comment__button" title='Valider' type="submit">VALIDER</button>
        </form>

    </div>
</template>

<script>
import axios from 'axios'
import { required } from 'vuelidate/lib/validators'
export default {
    name: 'CreateComment',
    props: ['comments', 'printComments'],
    data(){
        return{
            comment: "",
            submited: false
        }
    },
    validations:{
        comment:{
            required
        }
    },
    methods:{
        submit(){
            this.submited = true;
            this.$v.$touch();
            if(!this.$v.$invalid){
                const hashUrl = window.location.hash;
                const post_Id = hashUrl.split('/')[2];
                const token = sessionStorage.getItem('usertoken');
                const userId = sessionStorage.getItem('userId');
                const body = {
                    userId: userId,
                    content: this.comment
                };
                const header = {
                    headers : {
                        'Content-Type': 'application/json',
                        'Authorization' : `Bearer ${token}`
                    }
                };
                axios.post('http://localhost:3000/api/comments/create/' + post_Id, body, header )
                .then(res => {
                    console.log(res);
                    this.printComments();
                    this.submited = !this.submited;
                    this.comment = "";
                })
                .catch(error => console.log({error}));
            }
        }
    }
}
</script>

<style lang="scss" >
    .comment{
        padding: 10px;
        &__title{
            margin-bottom: 18px;
        }
        &__form{
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: flex-end;
        }
        &__formbox{
            width: 100%;
            margin-bottom: 18px;
            position: relative;
            padding-bottom: 40px;
        }
        &__label{
            display: block;
            margin-bottom: 10px;
        }
        &__input{
            width: 100%;
            height: 50px;
            border-radius: 10px;
            border: 1px solid black;
            padding-left: 16px;
            font-size: 16px;
        }
        &__button{
            background-color: #004367;
            border-radius: 10px;
            padding: 12px 30px;
            border: none;
            color: white;
            font-size: 16px;
            cursor: pointer;
            &:hover{
                opacity: 0.9;
            }
        }
    }
</style>