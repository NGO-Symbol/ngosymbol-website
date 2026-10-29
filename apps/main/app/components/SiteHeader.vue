<script setup lang="ts">
// Every click on the logo plays the next animation of the mark.
const markAnimations = ['mark-spin', 'mark-bounce', 'mark-flip', 'mark-wobble', 'mark-pulse']
const clicks = ref(0)
const markClass = ref('')

function animateMark() {
  markClass.value = ''
  requestAnimationFrame(() => {
    markClass.value = markAnimations[clicks.value % markAnimations.length]!
    clicks.value++
  })
}

</script>

<template>
  <header class="site-header container">
    <NuxtLink class="wordmark" to="/" aria-label="ГО «Символ» — головна" @click="animateMark">
      <SymbolLogo class="header-logo" :class="markClass" @animationend="markClass = ''" />
    </NuxtLink>
    <nav aria-label="Основна навігація">
      <NuxtLink to="/projects">Проєкти</NuxtLink>
      <NuxtLink to="/events">Події</NuxtLink>
      <NuxtLink to="/opportunities">Можливості</NuxtLink>
      <NuxtLink to="/people">Люди</NuxtLink>
      <NuxtLink to="/about">Про нас</NuxtLink>
      <NuxtLink class="nav-support" to="/support">Підтримати</NuxtLink>
      <span class="language" aria-label="Англійська версія готується">EN</span>
    </nav>
  </header>
</template>
