<template>
    <div>
        <MainNav/>
        <main>
            <section class="seat-select">
                <div class="seat-header">
                    <p class="meduim-text">Select Seats</p>
                </div>
                <Seat15 v-if="tripData.numberOfSeat == 15" :tripData="tripData" class="bus-seats"/>
            </section>
            <section class="trip-details">
                <div class="trip-header">
                    <p>Trip Details</p>
                </div>
                <div class="trip-route">
                    <p class="small-text">From</p>
                    <p class="medium-text">{{tripData.from}}</p>
                    <p class="small-text">To</p>
                    <p class="medium-text">{{tripData.to}}</p>
                </div>
                <hr>
                <div class="bus-details">
                    <p class="small-text">Bus Details</p>
                    <p class="medium-text" v-if="tripData.busClassID == '3'">Air conditioned</p>
                    <p class="medium-text" v-else>No Air conditioner</p>
                </div>
                <div class="price-tag">
                    <div class="price-seat">
                        <p class="small-text">Price per seat</p>
                        <p class="medium-text">₦ {{tripData.price}}</p>
                    </div>
                    <!-- <div class="price-final">
                        <p class="small-text">Total Price</p>
                        <p class="medium-text" >₦ {{tripData.price * tripData.selectedSeats.length}}</p>
                    </div> -->
                </div>
                <div class="proceed">
                    <button @click="proceed()" id="proceed" class="btn-lg">Proceed</button>
                </div>
            </section>
        </main>
        <Footer/>
    </div>
</template>

<script>
import MainNav from '@/components/mainnav'
import Footer from '@/components/footer'
import Seat15 from '@/components/seater15'
export default {
    name : "Seats",
    components:{
        MainNav,
        Seat15,
        Footer,
    },
    data(){
        return{
            tripData:this.$store.getters.getTrips,
        }
    },
    methods:{
        proceed(){
            // console.log(this.$store.getters.getTrips)
            this.$router.push({name:'details'})
        },
    }
}
</script>

<style scoped>
main{
    width:90%;
    margin:auto;
    margin-top:30px;
    display:flex;
}
.proceed{
    width:100%;
    margin:auto;
}
.proceed .btn-lg{
    width:90%;
    border-radius:10px;
    padding:10px;
    border:none;
    color:white;
    background:#f36713;
    margin-left:20px;
    margin-top:15px;
}
.price-tag{
    display: flex;
}
.price-seat,.price-final{
    flex:1
}
.bus-seats{
    margin-top: 20px;
    margin-left:250px;
    
}
.seat-select{
    flex:2;
    justify-content: space-around;
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
    height:60vh;
    margin-bottom:10px;
    border-radius: 10px;
    padding:20px;
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
    main{
        flex-direction: column;
        
    }
    .bus-seats{
        margin-left:0;
        width:100%;
    }
    .trip-details{
        width:100%;
    }
    .proceed .btn-lg{
        margin-left:15px;
    }
}
</style>