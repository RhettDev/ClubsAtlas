<!-- 
  File Name: UserSettingsPage.vue
  Author: Rhett Bauchop - 20722517
  Page URL:  clubsatlas.app/calendar/settings
  Purpose: This file holds HTML, CSS and Javascript for rendering the students calendar..
-->

<!-- HTML -->
 <template>
  <main id="userSettings" class="body">
    <HeaderGeneric></HeaderGeneric>

    <div class="hero">
      <section id="emptyLeft" class="bLeft">
        <div>
          <RouterLink to="/calendar" class="contentRow vertCentered">
            <v-icon name="pr-chevron-left" fill="var(--color-text-1)" scale="1.5" />
            <h2 class="desktopView">Back</h2>
          </RouterLink>
        </div>
      </section>

      <section id="Content" class="bCenterAdmin">
        <!-- Account Details -->
        <div id="PageTitle" class="pageHeader">
          <h1 class="title">Account Details</h1>
          <hr class="fgHR" />
        </div>
        <div class="fieldButtonContainer" id="changeName">
          <FormField
            v-model="changeName"
            label="Change Name"
            placeholder="Current Name"
            variant="halfWidth"
          >
          </FormField>
          <!-- Half widths were chosen to not overload the page, only need no much space. -->
        </div>
        <div class="fieldButtonContainer" id="changeEmail">
          <FormField
            v-model="changeEmail"
            label="Change Email"
            placeholder="example@email.com"
            variant="halfWidth"
          >
          </FormField>
        </div>
        <div class="buttonLabelContainer" id="resetPassword">
          <p class="fieldLabel">Send Password Reset Email</p>
          <BaseButton>Reset Password</BaseButton>
        </div>
        <div class="buttonLabelContainer" id="signOut">
          <p class="fieldLabel">Sign Out of Your Account</p>
          <RouterLink to="/">
            <BaseButton @click="signOut">Sign Out</BaseButton>
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
            <!-- Radio buttons for simplicity of a custom component -->
            <label class="fieldLabel">
              <input type="radio" name="theme" value="light" class="checkboxCustom" v-model="selectedTheme" @change="setLightMode"> Light Mode
            </label>
            <label class="fieldLabel">
              <input type="radio" name="theme" value="dark" class="checkboxCustom" v-model="selectedTheme" @change="setDarkMode"> Dark Mode
            </label>
          </form>
        </div>

        <hr class="fg" />
        <!-- Explains this is a demo and no data is being saved -->
        <div class="buttonRow vertCentered">
          <BaseButton @click="saveCheck = true">Save</BaseButton>
          <p v-if="saveCheck" id="saveMessage">Being a demo, your edits are not actually saved</p> 
        </div>

      </section>
      <section id="emptyRight" class="bRightAdmin desktopView">
        <!-- Empty section resembling the Admin layout-->
      </section>
    </div>
  </main>
  <FooterBar></FooterBar>
</template>

<!-- JAVASCRIPT -->
<script setup>
import FooterBar from '@/components/FooterBar.vue'
import FormField from '@/components/FormField.vue'
import BaseButton from '@/components/BaseButton.vue'
import HeaderGeneric from '@/components/HeaderGeneric.vue'

import { RouterLink } from 'vue-router'
import { supabase } from '../../backend/supabase'
import { setDarkMode, setLightMode } from '@/composables/miscFunctions'
import { ref } from 'vue'
import { demoSessionData } from '@/composables/sessionStore'

const selectedTheme = ref(document.documentElement.dataset.theme || 'dark')
const saveCheck = ref(false)
const { isDemoSession, clearDemoSession } = demoSessionData

// Signout of Auth account or clear demo session data
async function signOut(){
  if(isDemoSession){
    clearDemoSession()
  }
  else{
    const { error } = await supabase.auth.signOut({ scope: 'local' })
    console.error(error)
  }
}
</script>