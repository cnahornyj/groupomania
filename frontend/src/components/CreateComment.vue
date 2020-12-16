<template>
    <div id="create-comment">
        <form method="POST" v-on:submit.prevent='submit()'>
            <div>
                <input id="comment" type="text" aria-label="Commentaire" v-model="comment" placeholder="Ecrivez un commentaire...">
                <span v-if="(!$v.comment.required && $v.comment.$dirty) && submited" class="error-message">Veuillez écrire un commentaire avant de valider</span>
            </div>
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