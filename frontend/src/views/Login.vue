<template>
    <main>
        <header>
            <img src="../assets/white-logo.png" alt=""/>
        </header>
        <div class="form">
            <form method="post" class="form__form" v-on:submit.prevent="login()">
                <div class="form__box">
                    <div class="form__littlebox">
                        <span class="form__error form__error--high" v-if="responseError && submited">Votre E-mail ou votre mot de passe est incorrect</span>
                        <label for="email" class="form__label">E-mail</label>
                        <input type="email" name="email" id="email" value="" class="form__input" v-model="email" placeholder="exemple@hotmail.com" v-on:focus="deActivate">
                        <span class="form__error" v-if="((!$v.email.required || !$v.email.email) && $v.email.$dirty) && submited">Veuillez rentrer un email valide</span>
                    </div>
                    <div class="form__littlebox">
                        <label for="password" class="form__label">Mot de passe</label>
                        <input type="password" name="password" id="password" value="" class="form__input" v-model="password" placeholder="••••••••••" v-on:focus="deActivate">
                        <span class="form__error" v-if="(!$v.password.required && $v.password.$dirty) && submited" >Veuillez rentrer un mot de passe </span>
                        <span class="form__error" v-if="(!$v.password.minLength || !$v.password.maxLength) && $v.password.$dirty">Le mot de passe doit être entre {{ $v.password.$params.minLength.min }} et {{ $v.password.$params.maxLength.max }} </span>
                    </div>
                    <div class="form__nav">
                        <router-link to="/Signup" class="form__button form__button--inactive" >S'INSCRIRE</router-link>
                        <button class="form__button" type="submit" >SE CONNECTER</button>
                    </div>
                </div>
            </form>
        </div>
    </main>
</template>

<script>
import axios from 'axios'
import { required, minLength, maxLength, email} from 'vuelidate/lib/validators'

export default {
    name: 'Login',
    data(){
        return{
            email:"",
            password:"",
            submited: false,
            responseError: false
        }
    },
    validations: {
        email: {
            required,
            email
        },
        password: {
            required,
            minLength: minLength(6),
            maxLength: maxLength(18)
        }
    },
    methods: {
        deActivate() {
            this.responseError = false
        },
        login(){
            this.submited = true;
            this.$v.$touch();
            if (!this.$v.$invalid){
                axios.post('http://localhost:3000/api/login',{
                    email: this.email,
                    password: this.password
                },
                {
                    headers:{ 'Content-type': 'application/json'}
                })
                .then(res => {
                    sessionStorage.setItem('usertoken', res.data.token);
                    sessionStorage.setItem('userId', parseInt(res.data.userId));
                    this.$store.commit("setAuthentication", true);
                    this.$router.push('/Home');
                    console.log(window.isSignedIn);
                    
                })
                .catch(error => {
                    console.log({error});
                    this.responseError = true;
                })
            }
        }
    }
}


</script>

<style lang="scss">


    main{
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        background: url("../assets/fond.jpg") no-repeat center fixed; 
        -webkit-background-size: cover;
        background-size: cover;
        header {
            background-color: #122442;
            width: 100%;
            img {
                display: block;
                margin: auto;
                width: 350px;
                padding: 2%;
            }
        }
    }
    // FORMULAIRE
    .login{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        &__form{
            width: 600px;
            height: 1000px;
            align-items: baseline;
        }
        &__box{
            margin-top: 10%;
            padding: 6%;
            background-color: #aeaeaee0;
            border: 0.25px solid #aba9a9;
            border-radius: 5px;
            box-shadow: 0px 0px 20px 0px rgba(72, 79, 88,1);
        }
        &__littlebox{
            margin: 6% 0 6% 0;
        }
        &__label{
            display: block;
            font-size: 125%;
            margin-bottom: 5px;
            color: #444c54;
            font-weight: bold;
        }
        &__input{
             display: block;
            width: 100%;
            height: 25px;
            font-size: 115%;
            border-radius: 10px;
            border: 1px solid grey;
            margin-bottom: 10px;
            padding: 4% 0 4% 2%;
            color: #AFAFAF;
        }
        &__button{
            width: 45%;
            height: 56px;    
            background-color: #122442;
            font-weight: bold;
            color: white;
            border: none;
            border-radius: 10px;
            margin: 54px 0 16px; 
            cursor: pointer;
            font-size: 20px;

            &--inactive{
                display: flex;
                justify-content: center;
                align-items: center;
                text-decoration: none;
                background-color: white;
                color: #00497A;
                border: 1px solid #00497A;
                margin-top: 0;
            }
        }
    }

    

    // IMAGE

    .image{
        max-width: 50%;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;

        &__img{
            height: auto;
        }
    }

    // SEPARATION

    .separation{
        width: 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;
        margin-bottom: 20px;
        &__line{
            width: 25%;
            height: 1px;
            background-color: #C2C2C2;
        }
        &__text{
            font-size: 20px;
            color: #707070;
        }
    }

</style>