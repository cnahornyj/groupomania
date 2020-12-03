<template>
    <div class="createPost">
        <h2 class="createPost__title">Partagez un post !</h2>
        <form method="POST" class="createPost__form" v-on:submit.prevent="create()" id="formElem">
            <div class="createPost__formbox">
                <label for="title" class="createPost__formlabel">Titre de votre post</label>
                <input type="text" name="title" id="title" value="" v-model="content" class="createPost__forminput" placeholder="Ecrivez votre titre ici">
            </div>

            <div class="createPost__formbox--small">
                <label for="file" title="Choisir une image" role="button" class="createPost__formlabel createPost__formlabel--file"><font-awesome-icon icon="images" /></label>
                <input type="file" name="image" id="file" @change="onFileSelected" hidden>
                <button type="submit" title="Valider" class="createPost__formsubmit"><font-awesome-icon icon="paper-plane" /></button>
            </div>  

        </form>
        <span v-if="selectedFile">Image sélectionnée : {{ selectedFile.name }}</span><br>
        <span class="createPost__error" v-if="(!$v.content.required && $v.content.$dirty) && submited" >Veuillez ajouter un titre </span><br>
        <span class="createPost__error" v-if="(!$v.selectedFile.required && $v.selectedFile.$dirty) && submited" >Veuillez ajouter une image </span>
    </div>
</template>

<script>
import axios from 'axios'
import { required } from 'vuelidate/lib/validators'
export default {
    name: 'CreatePosts',
    props:['posts', 'userRole', 'printNewPosts'],
    data(){
        return{
            content: '',
            selectedFile: null,
            submited: false
        }
    },
    validations: {
        content: {
            required
        },
        selectedFile: {
            required
        }
    },
    methods:{
        onFileSelected(event){
            this.selectedFile = event.target.files[0];
            console.log(this.selectedFile);
        },
        create(){
            this.submited = true;
            this.$v.$touch();
            if (!this.$v.$invalid){
                const userId = parseInt(sessionStorage.getItem('userId'));
                const token = sessionStorage.getItem('usertoken');
                let fd = new FormData();
                fd.append('userId', userId);
                fd.append('content', this.content);
                fd.append('image', this.selectedFile, this.selectedFile.name);
                axios.post('http://localhost:3000/api/posts/create', fd, 
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${token}`
                    }
                })
                .then(() => {
                    this.printNewPosts();
                    this.submited = !this.submited;
                    this.content = "";
                    this.selectedFile = null;
                })
                .catch(error => console.log(error));
            }
        }
    }
}
</script>

<style lang="scss">
    .createPost {
        margin: auto;
        margin-top: 154px;
        width: 100%;

        &__form{
            display: flex;

            @media (max-width: 556px){
                flex-direction: column;
            }
        }

        &__title{
            font-size: 26px;
            margin-bottom: 54px;
        }

        &__formbox{
            display: flex;
            flex-direction: column;
            flex: 4;
            position: relative;

            &--small{
                display: flex;
                flex: 1;
                justify-content: space-around;
                align-items: flex-end;

                @media (max-width: 556px){
                    justify-content: flex-end;
                    margin-top: 5px;
                }
            }
        }

        &__formlabel{
            display: block;
            font-size: 20px;
            font-weight: 400;
            margin-bottom: 12px;
            

            &--file{
                text-decoration: underline;
                cursor: pointer;
                margin-bottom: 0;
                text-align: center;
                padding: 15px;
                margin-right: 5px;
                border: 1px solid #545454;
                border-radius: 10px;
                font-size: 20px;
            }
        }

        &__forminput{
            display: block;
            width: 95%;
            height: 56px;
            border-radius: 10px;
            border: 1px solid #545454;
            padding-left: 21px;
            font-size: 20px;
            color: #AFAFAF;

            @media (max-width: 556px){
                width: 100%;
            }
        }

        &__formsubmit{
            width: 56px;
            height: 56px;
            background-color: #004367;
            color: white;
            border: none;
            border-radius: 10px;
            cursor: pointer;
            font-size: 20px;
        }

        &__error{
            color: rgb(209, 0, 0);
            font-size: 15px;

            @media (max-width: 556px){
                padding-top: -130px;
            }
        }
    }


</style>