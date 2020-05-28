<template>
    <div>
        <link href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">
        <MainNav/>
        <main>
            <section class="contact-details">
                <div class="part-1">
                    <h1>Get In Touch</h1>
                    <p>For all inquiries about online booking and technical issues,
                    please call our 24 hours support team</p>
                </div>
                <div class="part-2">
                    <h3><i class="fa fa-phone"></i>Call Us</h3>
                    <p>
                        <ul>
                            <li>0700PEACEMASS</li>
                            <li>07007322362</li>
                            <li>07034157751</li>
                        </ul>
                    </p>
                </div>
                <div class="part-3">
                    <h3><i class="fa fa-envelope-open"></i>Email Us</h3>
                    <p>
                        <ul>
                            <li>contact@peacegroup.ng</li>
                            
                        </ul>
                    </p>
                </div>
                <div class="part-4">
                    <h3><i class="fa fa-location-arrow"></i>Head Office</h3>
                    <p>
                        <ul>
                            <li>No. 8 - 12 Peace Factory Road, Industrial Layout Emene, Enugu.</li>
                            
                        </ul>
                    </p>
                </div>
                <div class="part-5">
                    <h3><i class="fa fa-globe"></i>Connect with us.</h3>
                    <p>
                            <i class="fa fa-facebook"></i>
                            <i class="fa fa-twitter"></i>
                            <i class="fa fa-instagram"></i>
                    </p>
                </div>
            </section>
            <section class="contact-form">
                <div class="top">
                    <p>We would love to hear from you.</p>
                    <h1>Let's Talk</h1>
                    <hr class="dash">
                    <hr class="dash2">
                    <hr class="dash1">
                </div>

                <div class="pre-text">
                    <p class="mid">Any questions, comments or suggestions? Send us a message! We are here to help.</p>
                    <p class="small">This form is currently undergoing maintenance. Please try again later.</p>
                </div>
            </section>
        </main>
        <Footer/>
    </div>
</template>

<script>
import MainNav from '@/components/mainnav'
import Footer from '@/components/footer'
export default {
    name:"Contact",
    components:{
        MainNav,
        Footer,
    }
}
</script>

<style scoped>

main{
    display: flex;
    width:85%;
    margin:auto;
    margin-bottom:20px;
}
.contact-details,.contact-form{
    margin-top:100px;
}
.contact-details{
    margin-right:10px;
    flex:2;
    background:rgb(228, 196, 222);
    padding:50px;
    text-align: left;
    color:indigo;
}
.contact-details h1{
    font-weight: 400;
    font-size:34px;
}
ul{
    text-decoration: none;
    list-style-type: none;
}
.fa{
    margin-right:10px;
}
.contact-form{
    flex:5;
    padding:50px;
}
.contact-form h1{
    font-size:40px;
}
.dash{
    background:indigo;
    height:1px;
    width:100px;
}
hr{
    border:none;
}
.dash1{
    margin-top:4px;
    background:indigo;
    height:1px;
    width:140px;
}
.dash2{
    margin-top:4px;
    background:indigo;
    height:1px;
    width:120px;
}
.pre-text{
    margin-top:35px;
}
.mid{
    font-size:17px;
}
.small{
    opacity: .5;
    margin-top:20px;
}

.part-2,.part-3,.part-4,.part-5{
    margin-top:50px;
}
@media(max-width:528px){
    main{
        flex-direction: column;
        width:95%;
    }
}
</style>