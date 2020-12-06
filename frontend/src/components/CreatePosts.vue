<template>
    <main>
        <form method="POST" v-on:submit.prevent="create()">
            <div class="group">
                <input type="text" name="title" id="title" value="" v-model="content" placeholder="Ecrivez votre titre ici">
                <span v-if="(!$v.content.required && $v.content.$dirty) && submited" class="error-message">Veuillez ajouter un titre</span><br>
            </div>
            <div class="group">
                <input type="file" name="image" class="file" @change="onFileSelected" hidden>
                <span v-if="(!$v.selectedFile.required && $v.selectedFile.$dirty) && submited" class="error-message">Veuillez ajouter une image</span>
                <span v-if="selectedFile">Image sélectionnée : {{ selectedFile.name }}</span><br>
            </div>  
            <button type="submit" title="Valider" id="btn-send-publication">Publier</button>
        </form>
    </main>
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
