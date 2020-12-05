<template>
	<div id="app">
        <router-view/>
    </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style lang="scss">

// Color pallet
$primary-blue: #122442;
$text-danger: #d1515a;
$primary-grey: #aeaeaee0;
$secondary-grey: #424242;
$primary-white: whitesmoke;

* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
	font-family: Montserrat, Avenir, Helvetica, Arial, sans-serif;
}

#app {
  nav {
    box-sizing: border-box;
    width: 100%;
    margin: auto;
    position: relative;
    top: 0;
    left: 0;
    display: flex;
    padding: 20px;
    justify-content: space-between;
    border-bottom: thin solid darken($primary-blue, 5%);
    background-color: $primary-blue;
    .left-nav, .right-nav {
        align-self: center;
        width: 30%;    
    }
    .right-nav {
        ul {
            justify-content: flex-end;
        }
    }
    ul {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
    }
    li {
        margin: 0 15px;
    }
    a {
        color: white;
        font-weight: 400;
        font-size: 125%;
        text-decoration: none;
        cursor: pointer;
        &:hover {
            text-decoration: underline;
        }
    }
  }
    font-family: Montserrat, Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
        main{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background: url("assets/fond.jpg") no-repeat center fixed; 
        -webkit-background-size: cover;
        background-size: cover;
        header{
            background-color: $primary-blue;
            width: 100%;
            text-align: center;
            padding: 2%;
        }
        form{
            width: 600px;
            margin: 8% 0 8% 0;
            padding: 6%;
            background-color: $primary-grey;
            border: 0.25px solid darken($primary-grey, 5%);
            border-radius: 5px;
            box-shadow: 0px 0px 20px 0px rgba(72, 79, 88,1);
            .group{
                margin: 6% 0 6% 0;
            }
            label{
                display: block;
                font-size: 125%;
                margin-bottom: 5px;
                color: $primary-blue;
                font-weight: bold;
            } 
            input{
                display: block;
                width: 100%;
                height: 25px;
                font-size: 115%;
                border-radius: 10px;
                border: 1px solid $primary-grey;
                margin-bottom: 10px;
                padding: 4% 0 4% 2%; 
            }
            .errorMessage{
                color: $text-danger;
            }
            .navigation{
                display: flex;
                justify-content: space-between;
                margin-top: 50px;                
                .link, button{
                    width: 165px;
                    border: 1px outset $primary-grey;
                    border-radius: 10px;
                    padding: 2.7%;
                    font-size: 18px;
                    text-decoration: none;
                    text-align: center;
                    font-weight: bold;
                }
                .link{
                  color: $primary-blue;
                  background-color: $primary-white;
                  &:hover{
                    background: darken($primary-white, 5%);
                  }
                }
                button {
                  background-color: $primary-blue;
                  color: $primary-white;
                  &:hover{
                    background: darken($primary-blue, 5%);
                  }
                } 
            }
        }
    }
}
</style>

