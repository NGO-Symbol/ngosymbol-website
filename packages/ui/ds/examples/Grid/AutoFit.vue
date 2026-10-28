<template>
  <SymGrid min="200"><SymCard v-for="n in 5" :key="n"><SymText size="sm" muted>0{{ n }}</SymText><SymHeading :level="3" size="title">Комірка {{ n }}</SymHeading></SymCard></SymGrid>
</template>
