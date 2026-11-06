<template>
  <SymCluster>
    <SymPortraitArt v-for="seed in ['alla-pasichnyk', 'diana-horbenko', 'maksym-koval', 'magran-tata', 'vero-yuzepchuk', 'symbol', 'orbit', 'spiral']" :key="seed" :seed="seed" style="width: 96px" />
  </SymCluster>
</template>
