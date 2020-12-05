<template>
    <div>
        <h2>Partagez un post !</h2>
        <form method="POST" v-on:submit.prevent="create()" id="formElem">
            <div>
                <label for="title">Titre de votre post</label>
                <input type="text" name="title" id="title" value="" v-model="content" class="createPost__forminput" placeholder="Ecrivez votre titre ici">
            </div>

            <div>
                <label for="file" title="Choisir une image" role="button"><font-awesome-icon icon="images" /></label>
                <input type="file" name="image" id="file" @change="onFileSelected" hidden>
                <button type="submit" title="Valider"><font-awesome-icon icon="paper-plane" /></button>
            </div>  

        </form>
        <span v-if="selectedFile">Image sélectionnée : {{ selectedFile.name }}</span><br>
        <span v-if="(!$v.content.required && $v.content.$dirty) && submited" >Veuillez ajouter un titre </span><br>
        <span v-if="(!$v.selectedFile.required && $v.selectedFile.$dirty) && submited" >Veuillez ajouter une image </span>
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

</style>