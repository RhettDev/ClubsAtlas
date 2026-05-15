<template>
  <section class="footer">
    <div class="footerGroup fLeft"></div>
    <div class="footerGroup fCenter" id="links">
      <p>Terms - Privacy -</p>
      <a href="mailto:rhett.bauchop@gmail.com">Contact</a>
    </div>
    <div class="footerCopy fRight">
      <span>@2026 ClubsAtlas · Rhett Bauchop</span>
    </div>
  </section>
</template>

<style scoped>
/* FOOTER CLASSES */
.footer {
  display: flex;
  width: 100%;
  background-color: var(--ca-bg-blue-1);
  color: var(--ca-text-dark-1);
  font-size: small;
  justify-content: space-between;
  align-items: center;
}

.footerGroup {
  display: flex;
  color: var(--ca-text-dark-1);
  font-size: small;
  justify-content: center;
  align-items: center;
}

.footer a, p{
  color: var(--ca-text-dark-1);
}

.footerCopy {
  display: flex;
  justify-content: end;
  opacity: 0.6;
  margin: 4px;
  color: var(--ca-text-dark-1);
  font-size: small;
  align-items: center;
}

.fLeft,
.fRight {
  flex: 1;
}

.fCenter {
  flex: 2;
}

@media screen and (max-width: 688px) {
  .footer {
    flex-direction: column;
  }
}
</style>
