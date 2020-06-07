<template>
    <div>
    <section @click="selectSeats()" class="trip-card">
        <div class="first-part">
            <div class="time-co">
                <div class="time">
                    <img src="../assets/clock.svg" alt="clock">
                    <p>{{getTime}}</p>
                </div>
            </div>
            <div class="bus-class" v-if="tripData.busClassID == 3">
                <p class="class-text">A/C</p>
            </div>
            <div class="economy" v-else>
                <p class="class-text">Economy</p>
            </div>
            <div class="booked-seats">
                <img src="../assets/blackseat.png" alt="blackseat">
                <p @click="selectSeats()" class="book-btn">Book Seats</p>
            </div>
        </div>
        <div class="bus-co">
            <div class="items">
                <img src="../assets/bus1.jpg" alt="bus">
                <p class="canceled">{{tripData.freeSeats}} seats available</p>
                <p class="price">₦ {{tripData.price}}</p>
            </div>
        </div>
    </section>
    
    </div>
</template>

<script>
export default {
    name : "tripCard",
    props:{
        tripData:{
            type:Object
        }
    },
    data(){
        return{
            tripTime:"",
            tripOrder:"",
        }
    },
    methods:{
        selectSeats(){
            // send stuff to the store and navigate to the seats page
            this.tripData.tripTime = this.getTime;
            this.tripData.tripOrder = this.tripOrder;
            this.$store.commit("updateTrip",this.tripData)
            this.$store.commit("updateSeats",[])
            // console.log(this.$store.getters.getTrips)
            this.$router.push({name:'seats'})
        },
    },
    computed:{
        getTime(){
        switch(this.tripData.busOrderID){
            case "1":
                this.tripTime = "6:00 am"
                this.tripOrder = "First Bus"
                return this.tripTime
                break
            case "2":
                this.tripTime = "6:30 am"
                this.tripOrder = "Second Bus"
                return this.tripTime
                break
            case "3":
                this.tripTime = "7:00 am"
                this.tripOrder = "Third Bus"
                return this.tripTime
                break
            case "4":
                this.tripTime = "7:30 am"
                this.tripOrder = "Fourth Bus"
                return this.tripTime
                break
            case "5":
                this.tripTime = "8:00 am"
                this.tripOrder = "Fifth Bus"
                return this.tripTime
                break
            case "6":
                this.tripTime = "8:30 am"
                this.tripOrder = "Sixth Bus"
                return this.tripTime
                break
            case "7":
                this.tripTime = "9:00 am"
                this.tripOrder = "Seventh Bus"
                return this.tripTime
                break
            case "8":
                this.tripTime = "9:30 am"
                this.tripOrder = "Eight Bus"
                return this.tripTime
                break
            default:
                this.tripTime = "6:00 am"
                this.tripOrder = "Ninth Bus"
                return this.tripTime
                break

        
    }
        }
    }
}
</script>

<style scoped>
.book-btn{
    cursor: pointer;
}
.economy{
    background:#FFB800;
    margin-bottom:20px;
    color:white;
    padding:5px;
    width:100px;
    text-align: center;
    border-radius:50px;
}
.items img,.canceled{
    margin-bottom:20px;
}
.time-co img{
    width:20px;
    margin-right:5px;
    margin-bottom:20px;
    margin-top:2px;
}
.bus-class{
    margin-bottom:20px;
    background:#000AFF;
    color:white;
    padding:5px;
    width:60px;
    text-align: center;
    border-radius:50px;
}
.booked-seats img{
    width:25px;
}
.trip-card,.time,.booked-seats{
    display: flex;
}
.trip-card{
    margin-right:50px;
    background:white;
    padding:20px;
    border-radius:10px;
    margin-bottom:10px;
    cursor:pointer;
}


.first-part{
    flex:1;
}
.bus-co{
    flex:1;
    display:flex;
    justify-content: flex-end;
}
.canceled{
    /* text-decoration:line-through; */
    color:grey;
}
.price{
    color:#f36713;
    
}


@media (max-width: 1024px) {
    .trip-card{
        margin-right: 0px;
        
    }
}
</style>