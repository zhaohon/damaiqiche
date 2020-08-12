<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/pages">Pages</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style>
body{background-color: #F5F6FA;width: 100%;}
#app{width: 1400px;background-color: #ffffff;margin: 0 auto;}

@media only screen and (max-width: 1400px) {
	#app{width: 100%;}
}
</style>
