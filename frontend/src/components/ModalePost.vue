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
                    this.message = "Votre post a bien été modifié";
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
/*
.success{
    background-color: rgba(10, 173, 4, 0.2);
    margin-top: 20px;
    padding: 10px 20px;
    border: 1px solid rgba(0, 0, 0, 0.219);
    border-radius: 10px;
    color:rgb(32, 104, 29);
}*/
// Palette de couleurs
$primary-blue: #122442;
$text-danger: #d1515a;
$primary-grey: #aeaeaee0;
$secondary-grey: #424242;
$primary-white: whitesmoke;

.modale{
    position: fixed;
    top:0;
    right:0;
    bottom:0;
    left:0;
    z-index: 2;
    padding: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    .overlay{
        position: fixed;
        top:0;
        right:0;
        bottom:0;
        left:0;
        width: 100%;
        height: 100%;
        background-color: #00000050;
    }
    .card{
        position: relative;
        background-color: whitesmoke;
        max-width: 800px;
        border-radius: 10px;
        padding: 25px;
        .btn-close-modal{
            position: absolute;
            top: 15px;
            right: 15px;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: $text-danger;
            height: 25px;
            width: 25px;
            cursor: pointer;
            border-radius: 5px;
            color: white;
                &:hover{
                    background: darken($text-danger, 5%);
                }
            }
        form {
            background-color: #f7f7f7;
            padding: 0;
            border: none;
            box-shadow: none;
            .group{
            margin: 6% 0 6% 0;
                input{
                    padding: 2% !important;
                }
                .file{
                    height: 50px !important;
                    margin-left: -10px !important;
                    border: none !important;
                }
            }  
        }
    }
}
</style>