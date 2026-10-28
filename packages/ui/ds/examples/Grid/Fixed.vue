<template>
  <SymGrid :cols="3" :phone-cols="1"><SymCard v-for="n in 6" :key="n" tone="lilac"><SymHeading :level="3" size="title">Картка {{ n }}</SymHeading><SymText size="sm" muted>Три колонки на широкому контейнері.</SymText></SymCard></SymGrid>
</template>
