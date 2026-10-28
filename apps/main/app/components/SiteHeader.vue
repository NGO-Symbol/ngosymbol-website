<template>
  <header class="site-header container">
    <NuxtLink class="wordmark" to="/" aria-label="ГО Символ — головна">
      <SymbolMark />
      <span>СИМВОЛ</span>
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
