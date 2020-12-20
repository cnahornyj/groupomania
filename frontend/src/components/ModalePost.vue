<template>
    <div class="modale" v-if="revele">
        <div class="overlay" v-on:click="toggleModale"></div>
        <div class="card">
            <div v-on:click='toggleModale' class="btn-close-modal"><font-awesome-icon icon="times"/></div>
            <form method="POST" v-on:submit.prevent="modifyPost()">
                <div class="group">
                    <input type="text" placeholder="Changez le nom du post" v-model="post.content">
                </div>
                <div class="group">
                    <input type="file" class="file" @change="onFileSelected">
                </div>
                <button type="submit">MODIFIER</button>
                <div v-show="success">
                    <div id="response">
                        <p>{{ message }}</p>
                    </div>
                </div>
            </form> 
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'ModalePost',
    props: ['revele', 'toggleModale', 'post', 'printPost', 'isLiked'],
    data(){
        return{
            userId: sessionStorage.getItem("userId"),
            success:"",
            message:"",
            selectedFile: null
        }
    },
    methods:{
        onFileSelected(event){
            this.selectedFile = event.target.files[0];
            console.log(this.selectedFile);
        },
        modifyPost(){
            if (this.post.content === ""){
                this.success = true;
                this.message = "Veuillez renseigner un titre !"
                document.getElementById('response').classList = 'error-message'
            } else {
                const token = sessionStorage.getItem('usertoken');
                let fd = new FormData();
                fd.append('userId', this.userId);
                fd.append('content', this.post.content);
                if (this.selectedFile != null){
                    fd.append('image', this.selectedFile, this.selectedFile.name);
                }
                axios.post('http://localhost:3000/api/posts/' + this.post.postId, fd,
                {
                    headers:{ 
                        'Content-type': 'multipart/form-data',
                        'Authorization': `Bearer ${token}`
                    }
                })
                .then(res => {
                    console.log(res);
                    this.success = true;
                    this.message = "Votre Post a bien été modifié";
                    document.getElementById('response').classList = 'success'
                    this.printPost();
                    this.toggleModale();
                    this.success = !this.success;
                })
                .catch(error => console.log(error));
            }
        }
    }
}
</script>

<style lang="scss">
// A MODIFIER NE FONCTIONNE PAS /!\
.success{
    background-color: rgba(10, 173, 4, 0.2);
    margin-top: 20px;
    padding: 10px 20px;
    border: 1px solid rgba(0, 0, 0, 0.219);
    border-radius: 10px;
    color:rgb(32, 104, 29);
}
</style>