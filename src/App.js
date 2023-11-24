import React, { useEffect, useState } from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from 'react-router-dom'
import Login from './Components/Login/Login'
import Dashboard from './Screen/Dashboard/Dashboard'
import AllUser from './Screen/Users/All/AllUser'
import PremiumUser from './Screen/Users/Premium/PremiumUsers'
import BusinessUser from './Screen/Users/Business/BusinessUsers'
import ReportedUser from './Screen/Users/Reported/ReportedUsers'
import BasicUser from './Screen/Users/Basic/BaiscUser'
import ForgetPassword from './Components/Login/ForgetPassword'

import AllVideos from './Screen/Videos/AllVideos/AllVideos'
import ReportedVideos from './Screen/Videos/ReportedVideos/ReportedVideos'
import BlockedVideos from './Screen/Videos/BlockedVideos/BlockedVideos'

import Success from './Screen/BankTransaction/Success/Success'
import Failure from './Screen/BankTransaction/Failure/Failure'

import AllTransaction from './Screen/DiamondTransaction/All/AllTransactions'
import VideoTransaction from './Screen/DiamondTransaction/Video/VideoTransactions'
import LiveTransaction from './Screen/DiamondTransaction/Live/LiveTransactions'
import AllRoseTransaction from './Screen/DiamondTransaction/Comments/AllRoseTransaction'
import AllMessageTransaction from './Screen/DiamondTransaction/Messages/AllMessageTransaction'

import AllPromotion from './Screen/Promotions/All/AllPromotions'
import LivePromotion from './Screen/Promotions/Live/LivePromotions'
import AccomplishedPromotions from './Screen/Promotions/Accomplished/AccoumplishedPromotions'
import ReportedPromotion from './Screen/Promotions/Reported/ReportedPromotions'
import FailurePromotion from './Screen/Promotions/Failure/FailurePromotions'

import VerificationRequest from './Screen/VerificationRequest/VerificationRequest'
import Countries from './Screen/Countries/Countries'
import Cities from './Screen/Cities/Cities'
import Gifts from './Screen/Gifts/GiftsScreen'
import WithdrawelRequest from './Screen/Withdrawel/WithdrawelRequest'
import PushNotification from './Screen/PushNotification/PushNotification'
import DiamondRate from './Screen/DiamondRate/DiamondRate'
import Hobbies from './Screen/Hobbies/Hobbies'
import Occupation from './Screen/Occupations/Occupations'
import Languages from './Screen/Languages/Languages'
import Avatar from './Screen/Avatar/AvatarScreen'
import PrivacyPolicy from './Screen/PrivacyPolicy/PrivacyPolicy'
import TermsAndConditions from './Screen/TermsAndConditions/TermsAndConditions'
import NewReports from './Screen/GenerateReports/NewReports/NewReports'
import AllReports from './Screen/GenerateReports/AllReports/AllReports'
import RecentReports from './Screen/GenerateReports/RecentReports/RecentReports'
import NotFound from './NotFound'
import BlockedUser from './Screen/Users/Blocked/BlockedUsers'
import LogOut from './Components/Login/LogOut'
import useAuth from './useAuth'
import { SERVER_API_URL, SERVER_DOMAIN } from './constants/constants'
import Profile from './Screen/Profile/Profile'
import Employee from './Screen/Employee/Employee'
import My_transaction from './Screen/Profile/My_transaction'
import Employees_transaction from './Screen/Profile/Employees_transaction'
import AdminProfile from './Screen/AdminProfile/AdminProfile'
import AssistantManager from './Screen/AssistantManager/AssistantManager'
import Manager from './Screen/Manager/Manager'

import axios from 'axios'



function App() {
  const { isAuthenticated, user } = useAuth()


  const registerAdmin = async () => {
    try {
      const url = `${SERVER_API_URL}/admin/auth/signup`
      const data = {
        first_name: 'Dream',
        last_name: 'Users',
        email: 'dream@gmail.com',
        password: 'dream@gmail.com',
        role: 'superadmin',
      }

      const result = await axios.post(url, data)


      console.log(result)

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    // registerAdmin()

  }, [])




  return (
    <BrowserRouter>

      <Routes>
        <Route path='/' Component={Login} />
        <Route path='/forget_password' Component={ForgetPassword} />


        <Route
          path='/dashboard'
          Component={({ ...props }) => {
            return (
              <>
                {isAuthenticated ? <Dashboard {...props} /> : <Navigate to={'/'} />}
              </>
            )
          }} />






        <Route
          path='/users/all_users'
          Component={({ ...props }) => {
            return (
              <>
                {isAuthenticated ? <AllUser {...props} /> : <Navigate to={'/'} />}
              </>
            )
          }} />
        <Route
          path='/users/basic_users'
          Component={({ ...props }) => {
            return (
              <>
                {isAuthenticated ? <BasicUser {...props} /> : <Navigate to={'/'} />}
              </>
            )
          }} />
        <Route
          path='/users/premium_users'
          Component={({ ...props }) => {
            return (
              <>
                {isAuthenticated ? <PremiumUser {...props} /> : <Navigate to={'/'} />}
              </>
            )
          }} />
        <Route
          path='/users/business_users'
          Component={({ ...props }) => {
            return (
              <>
                {isAuthenticated ? <BusinessUser {...props} /> : <Navigate to={'/'} />}
              </>
            )
          }} />
        <Route
          path='/users/reported_users'
          Component={({ ...props }) => {
            return (
              <>
                {isAuthenticated ? <ReportedUser {...props} /> : <Navigate to={'/'} />}
              </>
            )
          }} />
        <Route
          path='/users/blocked_users'
          Component={({ ...props }) => {
            return (
              <>
                {isAuthenticated ? <BlockedUser {...props} /> : <Navigate to={'/'} />}
              </>
            )
          }} />




        <Route
          path='/videos/all_videos'
          Component={({ ...props }) => {
            return (
              <>
                {isAuthenticated ? <AllVideos {...props} /> : <Navigate to={'/'} />}
              </>
            )
          }} />
        <Route
          path='/videos/reported_videos'
          Component={({ ...props }) => {
            return (
              <>
                {isAuthenticated ? <ReportedVideos {...props} /> : <Navigate to={'/'} />}
              </>
            )
          }} />
        <Route
          path='/videos/blocked_videos'
          Component={({ ...props }) => {
            return (
              <>
                {isAuthenticated ? <BlockedVideos {...props} /> : <Navigate to={'/'} />}
              </>
            )
          }} />


        <Route
          path='/bank_transactions/success'
          Component={({ ...props }) => {
            return (
              <>
                {isAuthenticated ? <Success {...props} /> : <Navigate to={'/'} />}
              </>
            )
          }} />
        <Route
          path='/bank_transactions/failure'
          Component={({ ...props }) => {
            return (
              <>
                {isAuthenticated ? <Failure {...props} /> : <Navigate to={'/'} />}
              </>
            )
          }} />


        <Route
          path='/diamond_transactions/all_transaction'
          Component={({ ...props }) => {
            return (
              <>
                {isAuthenticated ? <AllTransaction {...props} /> : <Navigate to={'/'} />}
              </>
            )
          }} />
        <Route
          path='/diamond_transactions/video_transaction'
          Component={({ ...props }) => {
            return (
              <>
                {isAuthenticated ? <VideoTransaction {...props} /> : <Navigate to={'/'} />}
              </>
            )
          }} />
        <Route
          path='/diamond_transactions/live_transaction'
          Component={({ ...props }) => {
            return (
              <>
                {isAuthenticated ? <LiveTransaction {...props} /> : <Navigate to={'/'} />}
              </>
            )
          }} />
        <Route
          path='/diamond_transactions/comment_transaction'
          Component={({ ...props }) => {
            return (
              <>
                {isAuthenticated ? <AllRoseTransaction {...props} /> : <Navigate to={'/'} />}
              </>
            )
          }} />

        <Route
          path='/diamond_transactions/messages_transaction'
          Component={({ ...props }) => {
            return (
              <>
                {isAuthenticated ? <AllMessageTransaction {...props} /> : <Navigate to={'/'} />}
              </>
            )
          }} />


        {/* <Route
          path='/promotions/all_promotions'
          Component={({ ...props }) => {
            return (
              <>
                {isAuthenticated ? <AllPromotion {...props} /> : <Navigate to={'/'} />}
              </>
            )
          }} /> */}
        <Route
          path='/promotions/live_promotions'
          Component={({ ...props }) => {
            return (
              <>
                {isAuthenticated ? <LivePromotion {...props} /> : <Navigate to={'/'} />}
              </>
            )
          }} />
        <Route
          path='/promotions/accomplished_promotions'
          Component={({ ...props }) => {
            return (
              <>
                {isAuthenticated ? <AccomplishedPromotions {...props} /> : <Navigate to={'/'} />}
              </>
            )
          }} />
        <Route
          path='/promotions/reported_promotions'
          Component={({ ...props }) => {
            return (
              <>
                {isAuthenticated ? <ReportedPromotion {...props} /> : <Navigate to={'/'} />}
              </>
            )
          }} />
        <Route
          path='/promotions/failure_promotions'
          Component={({ ...props }) => {
            return (
              <>
                {isAuthenticated ? <FailurePromotion {...props} /> : <Navigate to={'/'} />}
              </>
            )
          }} />


        <Route
          path='/verification_request'
          Component={({ ...props }) => {
            return (
              <>
                {isAuthenticated ? <VerificationRequest {...props} /> : <Navigate to={'/'} />}
              </>
            )
          }} />
        <Route
          path='/countries'
          Component={({ ...props }) => {
            return (
              <>
                {isAuthenticated ? <Countries {...props} /> : <Navigate to={'/'} />}
              </>
            )
          }} />
        <Route
          path='/cities'
          Component={({ ...props }) => {
            return (
              <>
                {isAuthenticated ? <Cities {...props} /> : <Navigate to={'/'} />}
              </>
            )
          }} />
        <Route
          path='/gifts'
          Component={({ ...props }) => {
            return (
              <>
                {isAuthenticated ? <Gifts {...props} /> : <Navigate to={'/'} />}
              </>
            )
          }} />
        <Route
          path='/withdrawel_request'
          Component={({ ...props }) => {
            return (
              <>
                {isAuthenticated ? <WithdrawelRequest {...props} /> : <Navigate to={'/'} />}
              </>
            )
          }} />
        <Route
          path='/push_notification'
          Component={({ ...props }) => {
            return (
              <>
                {isAuthenticated ? <PushNotification {...props} /> : <Navigate to={'/'} />}
              </>
            )
          }} />
        <Route
          path='/diamond_rate'
          Component={({ ...props }) => {
            return (
              <>
                {isAuthenticated ? <DiamondRate {...props} /> : <Navigate to={'/'} />}
              </>
            )
          }} />

        <Route
          path='/avatar'
          Component={({ ...props }) => {
            return (
              <>
                {isAuthenticated ? <Avatar {...props} /> : <Navigate to={'/'} />}
              </>
            )
          }} />



        <Route
          path='/hobbies'
          Component={({ ...props }) => {
            return (
              <>
                {isAuthenticated ? <Hobbies {...props} /> : <Navigate to={'/'} />}
              </>
            )
          }} />
        <Route
          path='/occupations'
          Component={({ ...props }) => {
            return (
              <>
                {isAuthenticated ? <Occupation {...props} /> : <Navigate to={'/'} />}
              </>
            )
          }} />
        <Route
          path='/languages'
          Component={({ ...props }) => {
            return (
              <>
                {isAuthenticated ? <Languages {...props} /> : <Navigate to={'/'} />}
              </>
            )
          }} />

        <Route
          path='/employee'
          Component={({ ...props }) => {
            return (
              <>
                {isAuthenticated ? <Employee {...props} /> : <Navigate to={'/'} />}
              </>
            )
          }} />
           <Route
          path='/adminProfile'
          Component={({ ...props }) => {
            return (
              <>
                {isAuthenticated ? <AdminProfile {...props} /> : <Navigate to={'/'} />}
              </>
            )
          }} />
            <Route
          path='/managerProfile'
          Component={({ ...props }) => {
            return (
              <>
                {isAuthenticated ? <Manager {...props} /> : <Navigate to={'/'} />}
              </>
            )
          }} />
            <Route
          path='/assistantManagerProfile'
          Component={({ ...props }) => {
            return (
              <>
                {isAuthenticated ? <AssistantManager {...props} /> : <Navigate to={'/'} />}
              </>
            )
          }} />



        <Route
          path='/privacy_policy'
          Component={({ ...props }) => {
            return (
              <>
                {isAuthenticated ? <PrivacyPolicy {...props} /> : <Navigate to={'/'} />}
              </>
            )
          }} />
        <Route
          path='/terms_and_conditions'
          Component={({ ...props }) => {
            return (
              <>
                {isAuthenticated ? <TermsAndConditions {...props} /> : <Navigate to={'/'} />}
              </>
            )
          }} />


        <Route
          path='/generate_reports/new_reports'
          Component={({ ...props }) => {
            return (
              <>
                {isAuthenticated ? <NewReports {...props} /> : <Navigate to={'/'} />}
              </>
            )
          }} />
        <Route
          path='/generate_reports/all_reports'
          Component={({ ...props }) => {
            return (
              <>
                {isAuthenticated ? <AllReports {...props} /> : <Navigate to={'/'} />}
              </>
            )
          }} />
        <Route
          path='/generate_reports/recent_reports'
          Component={({ ...props }) => {
            return (
              <>
                {isAuthenticated ? <RecentReports {...props} /> : <Navigate to={'/'} />}
              </>
            )
          }} />

        <Route
          path='/profile'
          Component={({ ...props }) => {
            return (
              <>
                {isAuthenticated ? <Profile {...props} /> : <Navigate to={'/'} />}
              </>
            )
          }} />
        <Route
          path='/profile/superadmin_my_transaction'
          Component={({ ...props }) => {
            return (
              <>
                {isAuthenticated ? <My_transaction {...props} /> : <Navigate to={'/'} />}
              </>
            )
          }} />
        <Route
          path='/profile/superadmmin_employees_transaction'
          Component={({ ...props }) => {
            return (
              <>
                {isAuthenticated ? <Employees_transaction {...props} /> : <Navigate to={'/'} />}
              </>
            )
          }} />



        <Route
          path='*' element={NotFound} />
        <Route
          path='/logout' Component={LogOut} />






      </Routes>

    </BrowserRouter>
  )
}

export default App