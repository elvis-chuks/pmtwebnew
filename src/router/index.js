import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/routes/home'
import Trips from '@/routes/trips'
import Seats from '@/routes/seatselect'
import Details from '@/routes/details'
import Overview from '@/routes/overview'
import Terminals from '@/routes/terminals'
import Contact from '@/routes/contact'
import About from '@/routes/about'
import Fares from '@/routes/fares'
import Verify from '@/routes/verify'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: Home
    },
    {
      path: '/availabletrips',
      name: 'Trips',
      component: Trips
    },
    {
      path: '/selectseats',
      name: 'seats',
      component: Seats
    },
    {
      path: '/passengerdetails',
      name: 'details',
      component: Details
    },
    {
      path: '/reviewandpay',
      name: 'overview',
      component: Overview
    },
    {
      path: '/terminals',
      name: 'Terminals',
      component: Terminals
    },
    {
      path: '/contactus',
      name: 'Contact',
      component: Contact
    },
    {
      path: '/aboutus',
      name: 'About',
      component: About
    },
    {
      path: '/fares',
      name: 'Fares',
      component: Fares
    },
    {
      path: '/verifybooking',
      name: 'Verify',
      component: Verify
    }

  ]
})

