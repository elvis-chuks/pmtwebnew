<template>
    <div>
        <MainNav/>
        <main>
            <section class="intro">
                <section class="intro-text">
                    <h1>Peace Mass Transit</h1>
                    <p>PMT is A Trusted Name in Transportation for 20 Years.
                    PMT provides transportation services for inter city/states travelers in Nigeria.</p>
                </section>
                <section class="intro-img">

                </section>
            </section>
            <section class="talk">
                <div class="talk-body">
                    <div class="mission">
                        <h1>Our Mission</h1>
                        <p>Our mission is to provide an affordable and reliable transport system for our people, and our vision is to use all available resources to become the largest and most efficient road transport corporation world over. Our source of strength and strategy is founded on the guidance of the Holy Spirit, so for all our past, our present and our future achievements we say TO GOD BE THE GLORY.</p>
                    </div>
                    <div class="belief">
                        <h1>Our Belief</h1>
                        <p>Hence our belief that our growth from two buses to two thousand buses in fourteen years without any outside help is made possible by God who for His own reasons chose to use us for this miracle. We are the David of our time. Peace Group has combined staff strength of 2,750. Our presence is in about 19 states thus: Our ebullient and astute Chairman, Chief Samuel Maduka Onyishi, was recently decorated with the award of Member of Order of the Niger (MON) by the President and CIC of the Federal Republic of Nigeria which in our opinion, is in recognition of the positive impact of our company in the economic growth of our country.</p>
                    </div>
                </div>
            </section>

            <!-- <section class="partners">
                <div class="row1">
                    <div class="col">
                        <img src="" alt="">
                    </div>
                    <div class="col"></div>
                </div>
                <div class="row2"></div>
            </section> -->
        </main>
        <Footer/>
    </div>
</template>

<script>
import MainNav from '@/components/mainnav'
import Footer from '@/components/footer'
export default {
    name:"About",
    components:{
        MainNav,
        Footer,
    }
}
</script>
<style>
.talk{
    background:rgb(228, 196, 222);
    margin-bottom:50px;
}
.talk-body{
    width:90%;
    margin:auto;
    display: flex;
    padding-top:50px;
    color:indigo;
}
.mission,.belief{
    margin:10px;
    padding:20px;
    flex:1;
}
.intro{
    display: flex;
    min-height:60vh;
    align-items: center;
    width:90%;
    margin:auto;
}
.intro-text,.intro-img{
    flex:1;
}
.intro-text h1{
    font-size:44px;
    font-weight:400;
}



@media(max-width:528px){
    .intro{
        flex-direction: column;
    }
    .talk-body{
        flex-direction: column;
    }
}
</style>