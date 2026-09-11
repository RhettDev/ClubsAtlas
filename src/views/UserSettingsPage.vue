<template>
  <main id="userSettings" class="body">
    <HeaderStudent @click="onHeaderMenuClick"></HeaderStudent>
    <div class="hero desktopView">
      <section id="emptyLeft" class="bLeft">
        <!-- Empty -->
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
        </div>
        <div class="fieldButtonContainer" id="changeEmail">
          <FormField
            v-model="changeEmail"
            label="Change Email"
            placeholder="example@emai.com"
            variant="halfWidth"
          >
          </FormField>
        </div>
        <div class="buttonContainer" id="resetPassword">
          <p class="fieldLabel">Send Password Reset Email</p>
          <BaseButton>Reset Password</BaseButton>
        </div>
        <div class="buttonContainer" id="signOut">
          <p class="fieldLabel">Sign Out of Your Account</p>
          <RouterLink to="/">
            <BaseButton>Sign Out</BaseButton>
          </RouterLink>
        </div>

        <!-- Preferences -->
        <div id="PageTitle" class="pageHeader">
          <h1 class="title">Prefernces</h1>
          <hr class="fgHR" />
        </div>

        <div class="buttonContainer" id="language">
          <p class="fieldLabel">Language</p>
          <DropDown v-model="language" :options="languageList"></DropDown>
        </div>
        <div class="buttonContainer" id="timeFormat">
          <p class="fieldLabel">Preferred Time Format</p>
          <DropDown v-model="timeFormat" :options="timeOptions"></DropDown>
        </div>
      </section>
      <section id="emptyRight" class="bRight">
        <!-- Empty -->
      </section>
    </div>
  </main>
  <FooterBar></FooterBar>
</template>

<script setup>
import FooterBar from '@/components/FooterBar.vue'
import HeaderStudent from '@/components/HeaderStudent.vue'
import FormField from '@/components/FormField.vue'
import BaseButton from '@/components/BaseButton.vue'
import DropDown from '@/components/DropDown.vue'

const languageList = [
  'English',
  'Mandarin Chinese (Simplified)',
  'Spanish',
  'Hindi',
  'Arabic',
  'French',
  'Portuguese (Brazilian + European)',
  'Russian',
  'Bengali',
  'Japanese',
  'German',
  'Korean',
  'Italian',
  'Turkish',
  'Vietnamese',
  'Indonesian',
  'Thai',
  'Polish',
  'Dutch',
  'Ukrainian',
]
const timeOptions = ['AM/PM', '24-Hour']
</script>

<style scope>
.hero {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  text-align: center;
  /* align-items: start; */
  flex: 1;
}

.body {
  display: flex;
  width: 100%;
}

.bLeft {
  flex: 0.5;
  box-shadow: 2px 0px var(--color-background-2);
}

.bRight {
  flex: 0.5;
  box-shadow: -2px 0px var(--color-background-2);
}
</style>
