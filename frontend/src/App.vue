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

@import '../src/assets/style.scss';

* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
	font-family: Montserrat, Avenir, Helvetica, Arial, sans-serif;
}

#app {
    background: url("assets/fond.jpg") no-repeat center fixed; 
    -webkit-background-size: cover;
    background-size: cover;
}

</style>

