<template>
    <div>
        <MainNav class="navy"/>
        <main>
            <section class="loader-modal" v-show="loading">
                <div class="loader" id="loader"></div>
            </section>
            <section class="trips-cont">
                <section class="trips">
                    <p class="large-title">Available Trips</p>
                    <section class="trip-cards" v-show="trips.length!=0">
                        <tripCard 
                        v-for="trip in trips"
                        :key="trip.busQueueID"
                        :tripData="trip"
                        class="trip-cardy"/>    
                    </section>
                </section>
                <section class="trip-details">
                    <div class="trip-header">
                        <p>Trip Details</p>
                    </div>
                    <div class="trip-route">
                        <p class="small-text">From</p>
                        <p class="medium-text">{{tripDetails.from}}</p>
                        <p class="small-text">To</p>
                        <p class="medium-text">{{tripDetails.to}}</p>
                    </div>
                    <hr>
                    <div class="bus-details">
                        <p class="small-text">Bus Details</p>
                        <p class="medium-text">Air conditioned</p>
                    </div>
                    <div class="price-tag">
                        <!-- <p class="small-text">Price</p> -->
                        <!-- <p class="medium-text" v-show="trips.length!=0">₦ {{trips[0].price}}</p> -->
                    </div>
                </section>
            </section>
        </main>
        <Footer/>
    </div>
</template>

<script>
import MainNav from '@/components/mainnav'
import Footer from '@/components/footer'
import tripCard from '@/components/tripcard'
export default {
    name : "Trips",
    components:{
        MainNav,
        Footer,
        tripCard,
    },
    data(){
        return{
            loading:false,
            tripDetails:{},
            base_url:this.$store.getters.getUrl,
            trips:[]
        }
    },
    mounted(){
        this.tripDetails = this.$store.getters.getTrips;
        if(Object.entries(this.tripDetails).length == 0){
            this.tripDetails = JSON.parse(localStorage.getItem('tripData'))
        }else{
            localStorage.setItem('tripData',JSON.stringify(this.tripDetails))
        }

        this.getTrips();
    },
    methods:{
        getTrips(){
            this.loading = true;
            fetch(this.base_url+'/v2/gettrips',{
                headers:{
                    departureDate:this.tripDetails.date,
                    routeID:this.tripDetails.routeid,
                }
            })
            .then(resp => resp.json())
            .then(data => {
                this.loading = false;
                if(data.status == 'found'){
                    // console.log(data.trips)
                    var cleanedTrips = data.trips.filter(trip => trip.price > 100)
                    cleanedTrips.forEach(trip => {
                        this.trips.push(trip)
                    })
                    console.log(this.trips)
                }
            })
        }
    }
}
</script>

<style scoped>
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
.small-text{
    font-size:13px;
    color:grey;
}
hr{
    color:grey;
    height:1px;
}
.trip-route{
    margin-top:20px;
    margin-bottom:20px;
}
.bus-details{
    margin-top:20px;
    margin-bottom:20px;
}
.trips-cont{
   width:90%;
   margin:auto;
   margin-top:30px;
   display:flex;
}
.trips{
    flex:3;
}
.trip-details{
    flex:1;
    background: white;
    height:52vh;
    margin-bottom:10px;
    border-radius: 10px;
    padding:20px;
    /* box-shadow: 1px 3px 3px 1px rgba(1, 2, 3, 0.3); */
    margin-top:55px;
}
.trip-cards{
    margin-top:30px;
}
@keyframes righty {
    0%{
        opacity:0;
        transform: translateX(-30px);
    }
    100%{
        opacity:1;
        transform: translateX(0px);
    }
}
@media (max-width: 1024px) {
    .trips-cont{
        flex-direction: column;
        
    }
}
</style>