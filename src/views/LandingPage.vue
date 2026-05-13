<template>
  <main class="landing">

    <!-- Header -->
    <section class="header">
      <img class="logo" src="..\assets\logos\clubsAtlasLogo.svg">
      <h1>ClubsAtlas</h1>
    </section>

    <!-- Hero Section -->
    <section class="hero">
      <p>MAP THE EVENTSCAPE OF UNI</p>
      <h1>Make the most of every year</h1>
      <p>University is more than lectures. ClubsAtlas helps you discover the clubs that match what you're into, stay on top of the events worth showing up for, and build a social life you'll actually remember.</p>

      <div class="cta-buttons">
        <!-- RouterLink navigates without a full page reload -->
        <RouterLink to="/signup" class="btn btn-primary">
          Sign up for free!
        </RouterLink>

        <RouterLink to="/login" class="btn btn-secondary">
          Log In
        </RouterLink>
      </div>
    </section>

    <!-- Footer -->
    <section class="footer">
      <a>Info</a>
      <p>-</p>
      <a>Privacy</a>
      <p>-</p>
      <a>Terms</a>
    </section>

  </main>
</template>