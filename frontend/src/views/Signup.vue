<template>
    <main>
        <header>
            <img src="../assets/white-logo.png" alt=""/>
        </header>
        <div class="form">
            <form method="POST" class="form__form" v-on:submit.prevent="submitForm()">
                <div class="form__box">
                    <div class="form__littlebox">
                        <label for="firstName" class="form__label">Prénom</label>
                        <input type="text" name="firstName" id="firstName"  class="form__input" placeholder="Jean" v-model="firstName">
                        <span class="form__error" v-if="(!$v.firstName.required && $v.firstName.$dirty) && submited">Veuillez ajouter votre prénom</span>
                        <span class="form__error" v-if="!$v.firstName.alpha && $v.firstName.$dirty">Veuillez ajouter un nom valide</span>
                    </div>
                    <div class="form__littlebox">
                    <label for="lastName" class="form__label">Nom</label>
                    <input type="text" name="lastName" id="lastName"  class="form__input" placeholder="Dupont" v-model="lastName">
                    <span class="form__error" v-if="(!$v.lastName.required && $v.lastName.$dirty) && submited" >Veuillez ajouter votre nom</span>
                    <span class="form__error" v-if="(!$v.lastName.alpha && $v.lastName.$dirty) && submited" >Veuillez ajouter un prénom valide</span>
                    </div>
                    <div class="form__littlebox">
                    <label for="email" class="form__label">E-mail</label>
                    <input type="email" name="email" id="email" class="form__input" placeholder="exemple@hotmail.com" v-model="email" v-on:focus="deActivate">
                    <span class="form__error" v-if="((!$v.email.required || !$v.email.email) && $v.email.$dirty) && submited">Veuillez saisir un email valide</span>
                    <span class="form__error" v-if="responseEmailError">Cette adresse mail n'est pas disponible</span>
                    </div>
                    <div class="form__littlebox">
                    <label for="password" class="form__label">Mot de passe</label>
                    <input type="password" name="password" id="password"  class="form__input" placeholder="••••••••••" v-model="password">
                    <span class="form__error" v-if="(!$v.password.required && $v.password.$dirty) && submited" >Veuillez rentrer un mot de passe </span>
                    <span class="form__error" v-if="(!$v.password.minLength || !$v.password.maxLength) && $v.password.$dirty">Le mot de passe doit être entre {{ $v.password.$params.minLength.min }} et {{ $v.password.$params.maxLength.max }} </span>
                    </div>
                    <div class="form__nav">
                        <router-link to="/Login" class="form__button form__button--inactive" >SE CONNECTER</router-link>
                        <button class="form__button" type="submit" >S'INSCRIRE</button>
                    </div>
                </div>
            </form>
        </div>
    </main>
</template>

<script>

import axios from 'axios'
import { required, minLength, maxLength, alpha, email} from 'vuelidate/lib/validators'
export default {
    name: 'Signup',
    data(){
        return{
            firstName: "",
            lastName: "",
            email:"",
            password:"",
            submited: false,
            responseEmailError: false
        }
    },
    validations: {
        firstName: {
            required,
            alpha
        },
        lastName: {
            required,
            alpha
        },
        email: {
            required,
            email
        },
        password:{
            required,
            maxLength: maxLength(18),
            minLength: minLength(6)
        }
    },
    methods: {
        deActivate() {
            this.responseEmailError= false
        },
        submitForm() {
            this.$v.$touch();
            this.submited = true;
            console.log(!this.$v.password.minLength);
            console.log(!this.$v.password.maxLength);
            console.log(!this.$v.password.$dirty);
            if(!this.$v.$invalid) {
                axios.post('http://localhost:3000/api/signup',{
                    firstName: this.firstName,
                    lastName: this.lastName,
                    email: this.email,
                    password: this.password
                },
                {
                    headers:{ 'Content-type': 'application/json'}
                })
                .then(res => {
                    console.log(res);
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
                        window.location.href="/#/Home";
                    })
                    .catch(error => {
                        console.log({error})
                    });
                })
                .catch(error => {
                    this.responseEmailError = true;
                    console.log({error})
                });
            }
        }
    }
}
</script>

<style lang="scss">

    main{
        display: flex;
        flex-direction: column;
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
    .form{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;


        &__form{
            width: 600px;
            height: 1000px;
            align-items: baseline;

            @media (max-width: 450px) {
                width: 90vw;
            }
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
        &__nav{
            position: relative;
            display: flex;
            justify-content: space-between;

            
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

            @media (max-width: 400px) {
                font-size: 15px;
            }

            &--inactive{
                display: flex;
                justify-content: center;
                align-items: center;
                text-decoration: none;
                background-color: white;
                color: #00497A;
                border: 1px solid #00497A;
            }
        }
        &__error{
            font-size: 14px;
            bottom: 18px;
            left: 0;
            color: red;
            &--high{
                bottom: 150px;
                left: 0;
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

        @media (max-width: 1235px) {
            display: none;
        }

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