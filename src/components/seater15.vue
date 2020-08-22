<template>
    <div>
        <section>
            
            <div class="seat-body">
                <p>Total Price : ₦ {{tripData.price * selectedSeats.length}}</p>
                <div class="seat-row">
                    <div class="seat">
                        
                    </div>
                    <div class="seat">
                        
                    </div>
                    <div class="seat">
                        <button id="01" @click="registerSeat('01')" disabled><img :src="blackseat" id="seat-01" alt="seat" ></button >
                        <p>01</p>
                    </div>
                    <div class="seat">
                        <button id="02" @click="registerSeat('02')"><img :src="blackseat" id="seat-02" alt="seat"></button>
                        <p>02</p>
                    </div>
                </div>
                <div class="seat-row">
                    <div class="seat">
                        <button id="03" @click="registerSeat('03')"><img :src="blackseat" id="seat-03" alt="seat"></button>
                        <p>03</p>
                    </div>
                    <div class="seat">
                        <button id="04" @click="registerSeat('04')" disabled><img :src="blackseat" id="seat-04" alt="seat" disabled></button>
                        <p>04</p>
                    </div>
                    <div class="seat">
                        <button id="05" @click="registerSeat('05')"><img :src="blackseat" id="seat-05" alt="seat"></button>
                        <p>05</p>
                    </div>
                    <div class="seat">
                        
                    </div>
                </div>
                <div class="seat-row">
                    <div class="seat">
                        <button id="06" @click="registerSeat('06')"><img :src="blackseat" id="seat-06" alt="seat"></button>
                        <p>06</p>
                    </div>
                    <div class="seat">
                        <button id="07" @click="registerSeat('07')" disabled><img :src="blackseat" id="seat-07" alt="seat" disabled></button>
                        <p>07</p>
                    </div>
                    <div class="seat">
                        <button id="08" @click="registerSeat('08')"><img :src="blackseat" id="seat-08" alt="seat"></button>
                        <p>08</p>
                    </div>
                    <div class="seat">
                        
                    </div>
                </div>
                <div class="seat-row">
                    <div class="seat">
                        <button id="09" @click="registerSeat('09')"><img :src="blackseat" id="seat-09" alt="seat"></button>
                        <p>09</p>
                    </div>
                    <div class="seat">
                        <button id="10" @click="registerSeat('10')" disabled><img :src="blackseat" id="seat-10" alt="seat" disabled></button>
                        <p>10</p>
                    </div>
                    <div class="seat">
                        <button id="11" @click="registerSeat('11')"><img :src="blackseat" id="seat-11" alt="seat"></button>
                        <p>11</p>
                    </div>
                    <div class="seat">
                        
                    </div>
                </div>
                <div class="seat-row">
                    <div class="seat">
                        <button id="12" @click="registerSeat('12')"><img :src="blackseat" id="seat-12" alt="seat"></button>
                        <p>12</p>
                    </div>
                    <div class="seat">
                        <button id="13" @click="registerSeat('13')" disabled><img :src="blackseat" id="seat-13" alt="seat" disabled ></button>
                        <p>13</p>
                    </div>
                    <div class="seat">
                        <button id="14" @click="registerSeat('14')" disabled><img :src="blackseat" id="seat-14" alt="seat" disabled></button>
                        <p>14</p>
                    </div>
                    <div class="seat">
                        <button id="15" @click="registerSeat('15')"><img :src="blackseat" id="seat-15" alt="seat"></button>
                        <p>15</p>
                    </div>
                </div>
                <hr>
                <div class="seater-footer">
                    <div class="seat">
                        <img :src="blackseat" alt="seat">
                        <p class="small-text">Empty Seat</p>
                    </div>
                    <div class="seat">
                        <img :src="greenseat" alt="seat">
                        <p class="small-text">Selected Seat</p>
                    </div>
                    <div class="seat">
                        <img :src="redseat" alt="seat">
                        <p class="small-text">Booked Seat</p>
                    </div>
                </div>
                <div class="descp">
                    <p class="small-text">Some seats have been disabled to follow current covid-19 guidelines </p>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import blackseat from '../assets/blackseat.png'
import greenseat from '../assets/greenseat.png'
import redseat from '../assets/redseat.png'
export default {
    name : "Seat15",
    props:{
        tripData:{
            type:Object
        }
    },
    data(){
        return{
            blackseat,
            greenseat,
            redseat,
            selectedSeats : [],
        }
    },
    created(){
        if(this.tripData.selectedSeats == undefined){
            this.$store.commit("updateSeats",[])
        }
    },
    mounted(){
        
        var bookedSeats = this.tripData.bookedSeats
        console.log(bookedSeats)
        var disabled_seats = ["01","04","07","10","13","14"]
        disabled_seats.forEach(seat => {
            bookedSeats.push(seat)
        })
        var cleanedSeats = []
        bookedSeats.forEach(seat => {
            if (seat.length == 1){
                seat = "0"+seat
                cleanedSeats.push(seat);
            }else{
                cleanedSeats.push(seat);
            }
        })
        
        var selectedSeats = this.tripData.selectedSeats
        // console.log(this.tripData)
        var btn_arr = document.querySelectorAll('.seat-row button')
        btn_arr.forEach(btn => {
            if(cleanedSeats.includes(btn.id)){
                btn.classList.add("booked")
                document.getElementById("seat-"+btn.id).src = this.redseat;
                btn.disabled = true;
            }else if(selectedSeats.includes(btn.id)){
                btn.classList.add("available")
                document.getElementById("seat-"+btn.id).src = this.greenseat;
            }else{
                btn.classList.add("available")
            }
            
        })
    },
    methods:{
        registerSeat(seat_no){
            var query = "seat-"+seat_no
            var btn = document.getElementById(query)
            if(btn.src == this.greenseat){

                btn.src = this.blackseat;

                const index = this.selectedSeats.indexOf(seat_no);

                if (index > -1){
                    this.selectedSeats.splice(index,1)
                }

                // push to store
                this.$store.commit("updateSeats",this.selectedSeats)

            }else{
                // push to store
                btn.src = this.greenseat;
                if(this.tripData.selectedSeats != undefined){
                    this.tripData.selectedSeats.forEach(seat => {
                        if(!this.selectedSeats.includes(seat)){
                            this.selectedSeats.push(seat)
                        }
                        
                    })
                }
                this.selectedSeats.push(seat_no)
                this.$store.commit("updateSeats",this.selectedSeats)
            }
        },
    }
}
</script>

<style scoped>

button{
    border:none;
    background:none;
}
.small-text{
    font-size:13px;
    color:grey;
}
.seat-body{
    background: white;
    width:280px;
    padding:25px;
    border-radius:15px;
}
.seat-row{
    display: flex;
}
.seater-footer{
    display: flex;
    justify-content: space-around;
    margin-top:10px;
}
.seat{
    flex:1;
    margin-top:3px;
}
.seat p{
    margin-left:5px;
}

</style>