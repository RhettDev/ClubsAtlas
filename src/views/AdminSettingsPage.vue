<!-- 
  File Name: AdminSettingsPage.vue
  Author: Rhett Bauchop - 20722517
  Page URL:  clubsatlas.app/admin/settings
  Purpose: This file holds all HTML, CSS and Javascript for the clubs admin settings page,
           listing proposed settings and website theme changer.
-->

<!-- HTML -->
<template>
  <main id="adminMain">
    <!-- v--if to ensure club details have loaded before header is rendered. Holds Mobile Admin navigation-->
    <HeaderClubs v-if="clubDetails" @click="onHeaderMenuClick" :club="clubDetails" />
    
    <!-- Desktop Navigation -->
    <div class="hero ">
      <section id="sideBar" class="desktopView bLeft">
        <AdminNavigation />
      </section>

      <!-- Body: List of settings and preferences -->
      <section id="settings" class="bCenterAdmin">
        <!-- Account Settings -->
        <div id="PageTitle" class="pageHeader">
          <h1 class="title">Account Settings</h1>
          <hr class="fgHR" />
        </div>
        <div class="fieldButtonContainer" id="changeEmail">
          <FormField
            v-model="changeEmail"
            label="Account Email"
            placeholder="club@domain.com"
            variant="halfWidth"
          >
          </FormField>
        </div>
        <!-- Password reset process from LoginPage.vue could be replicated here -->
        <div class="buttonLabelContainer" id="resetPassword">
          <p class="fieldLabel">Send Password Reset Email</p>
          <BaseButton>Reset Password</BaseButton>
        </div>
        <div class="buttonLabelContainer" id="signOut">
          <p class="fieldLabel">Sign Out of Your Account</p>
          <RouterLink to="/">
            <BaseButton @click="signOut">Sign Out</BaseButton> <!-- Calls Supabase to remove authentication details from profile-->
          </RouterLink>
        </div>

        <!-- Preferences -->
        <div id="PageTitle" class="pageHeader">
          <h1 class="title">Prefernces</h1>
          <hr class="fgHR" />
        </div>
        <div id="themeContainer" class="buttonLabelContainer">
          <label class="fieldLabel">App Theme</label>
          <form>
            <!-- Radio used for basic implementation -->
            <label class="fieldLabel">
              <input type="radio" name="theme" value="light" class="checkboxCustom" v-model="selectedTheme" @change="setLightMode"> Light Mode
            </label>
            <label class="fieldLabel">
              <input type="radio" name="theme" value="dark" class="checkboxCustom" v-model="selectedTheme" @change="setDarkMode"> Dark Mode
            </label>
          </form>
        </div>
        <hr class="fg" />
        <!-- Explanation that demo does not push or save data. But holds space for future implementation -->
        <div class="buttonRow vertCentered">
          <BaseButton @click="saveCheck = true">Save</BaseButton>
          <p v-if="saveCheck" id="saveMessage">Being a demo, your edits are not actually saved</p> 
        </div>
      </section>

      <section class="bRightAdmin desktopView">
        <!-- Empty: placeholder for whitespace, keeping body centered -->
      </section>
    </div>

    <FooterBar></FooterBar>
  </main>
</template>

<!-- JAVASCRIPT -->
<script setup>
import BaseButton from '@/components/BaseButton.vue'
import FooterBar from '@/components/FooterBar.vue'
import HeaderClubs from '@/components/HeaderClubs.vue'
import FormField from '@/components/FormField.vue'
import AdminNavigation from '@/components/AdminNavigation.vue'

import { useClubData } from '@/composables/useClubData'
import { supabase } from '../../backend/supabase'
import { setDarkMode, setLightMode } from '@/composables/miscFunctions'
import { ref } from 'vue'

const { clubDetails } = useClubData()
const selectedTheme = ref(document.documentElement.dataset.theme || 'dark')
const saveCheck = ref(false)

async function signOut(){
  const { error } = await supabase.auth.signOut({ scope: 'local' })
  console.error(error)
}
</script>
