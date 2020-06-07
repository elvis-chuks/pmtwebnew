<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;700&display=swap');
#app {
  font-family: 'Poppins', sans-serif;
  background-color:#F7F7F7;
}
button{
  font-family: 'Poppins', sans-serif;
}

*{
  margin:0px;
  padding:0px;
  box-sizing: border-box;
  outline: none;
  -moz-outline-style: none; 
  outline-style: none;
}
select {
      -moz-appearance: none;
      -webkit-appearance: none;
  }
  
  select::-ms-expand {
      display: none;
  }
  
  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
      -webkit-animation: autofill 0s forwards;
      animation: autofill 0s forwards;
  }
  
  @keyframes autofill {
      100% {
          background: transparent;
          color: inherit;
      }
  }
  
  @-webkit-keyframes autofill {
      100% {
          background: transparent;
          color: inherit;
      }
  }
</style>
