<template>
    <div class="not-found">
        <div class=" block">
            <img  class="w-128 mx-auto" src="../assets/404.svg" alt="404">
        </div>
       
        <div class="center">
            <p>Opps... page went wrong</p>
            <router-link to="/" tag="button" class="button">
                Go back
            </router-link>
        </div>
    </div>
</template>

<style scoped>
.not-found{
    height:80vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}
.w-128{
    width:60%;
    margin:0 auto;
}
p{
    font-size:1rem;
    color:#0082fb;
    margin:.2rem 0;
}

.block{
    display: flex;
    /* background-color: red; */
}
button{
    padding:.7rem 2rem;
    background-color: #0082fb;
    border-radius: 3px;
    margin:.3rem auto;
    color:#fff;
    border:none;
}

.center{
    text-align: center;
}
</style>