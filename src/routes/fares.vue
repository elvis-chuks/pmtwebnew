<template>
    <div class="main">
        <MainNav/>
        <main>
            <section class="intro">
                <div class="intro-text">
                    <h1>Route Fares</h1>
                    <p>Check for the cost of your travel before booking.</p>
                    <div class="fares" v-for="fare in fares" :key="fare.busclassid">
                        <div class="economy" v-if="fare.busclassid == 2">
                            <h3>Economy</h3>
                            <p>Fare : {{fare.price}}</p>
                            </div>
                        <div class="executive" v-else>
                            <h3>Executive</h3>
                            <p>Fare : {{fare.price}}</p>
                        </div>
                    </div>
                </div>
                <div class="intro-form">
                    <div class="form">
                        <h1>Select trip route</h1>
                        <hr>
                        <select name="depot" id="depot" class="form-control" @change="getZroute()">
                            <option value="" selected disabled>Select originating depot</option>
                            <option 
                            v-for="depot in depots"
                            :key="depot.depotid"
                            :id="depot.depotcode"
                            :value="depot.depotcode"
                            :name="depot.name"
                            >{{depot.name}}</option>
                        </select>
                        <select name="destination" id="destination" class="form-control">
                            <option value="" selected disabled>Select destinating depot</option>
                            <option 
                            v-for="dest in destinations"
                            :key="dest.routeid"
                            :value="dest.routeid"
                            :id="dest.routeid"
                            >{{dest.routename}}</option>
                        </select>
                        <button class="search" @click="showFares()">Search</button>
                        <section class="loader-modal" v-show="loading">
                            <div class="loader" id="loader"></div>
                        </section>
                    </div>
                </div>
            </section>
        </main>
    </div>
</template>

<script>
import MainNav from '@/components/mainnav'
export default {
    name:"Fares",
    components:{
        MainNav
    },
    mounted(){
        this.getDepot();
    },
    data(){
        return {
            loading : false,
            depots:[],
            destinations:[],
            fares:[],
            base_url:this.$store.getters.getUrl,
        }
    },
    methods:{
        getDepot(){
            this.loading = true;
            fetch(this.base_url+'/v2/home')
            .then(resp => resp.json())
            .then(data => {
                this.loading = false;
                if(data.status == 'found'){
                    this.depots = data.depot
                }
            })
            .catch(error => {
                console.error(error)
            })
        },
        getZroute(){
            this.loading = true;
            fetch(this.base_url+'/v2/zroute',{
                headers:{
                    depotCode:document.getElementById('depot').value,
                    depotName:document.getElementById('depot').value,
                }
            })
            .then(resp => resp.json())
            .then(data => {
                this.loading = false;
                if(data.status == 'found'){
                    this.destinations = data.routes;
                }
            })
        },
        showFares(){
            this.loading = true;
            fetch(this.base_url+'/v3/getfares',{
                headers:{
                    routeid:document.getElementById('destination').value,
                }
            })
            .then(resp => resp.json())
            .then(data => {
                this.loading = false;
                if(data.status == 'done'){
                    this.fares = data.fares;
                }
            })

        },
    }
}
</script>
<style>
.loader-modal{
    width:90%;
    margin:auto;
    display: flex;
    justify-content: center;
    margin-top:20px;
}
.loader{
	border: 3px solid #f3f3f3;
	border-top:3px solid #3498db;
	border-radius:50%;
	width:20px;
	height:20px;
	animation: spin 2s linear infinite;
}
@keyframes spin {
    0% { transform: rotate(0deg);}
    100% {transform:rotate(360deg)}
}
.main{
    background-image:url('../assets/background.jpg');
    height:100vh;
}
.form h1{
    color:indigo;
}
.form-control{
    width:100%;
    margin-top:10px;
    height:35px;
    border-radius:10px;
}
.search{
    width:100%;
    margin-top:10px;
    height:35px;
    border:none;
    border-radius:10px;
    background: #2F0054;
    color:white;
}
hr{
    margin-bottom:20px;
}
main{
    width:90%;
    margin:auto;
}
.intro-text{
    color:white;
    flex:1;
    margin:10px;
}
.intro-form{
    flex:1;
    margin:10px;
}
.intro-form select,button{
    display:block;
}
.form{
    background:white;
    padding:50px;
    border-radius:15px;
    width:80%;
    margin-left:50px;
}
.intro{
    display:flex;
    min-height:60vh;
    align-items: center;
}
@media(max-width:528px){
    .intro{
        flex-direction: column;
    }
    .form{
        margin-left:0px;
        width:100%;
    }
}
</style>