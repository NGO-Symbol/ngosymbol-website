<script setup lang="ts">
const list = ['paper', 'white', 'lilac', 'violet', 'apricot', 'plum'] as const
</script>

<template>
  <div>
    <SymSection v-for="t in list" :key="t" :tone="t" space="sm">
      <SymStack gap="s" align="start">
        <SymEyebrow>{{ t }}</SymEyebrow>
        <SymHeading :level="3" size="headline">Створюємо простір для уважності</SymHeading>
        <SymText muted>Приглушений текст, посилання <SymLink href="#">у тексті</SymLink> і кнопки перефарбовуються разом із тоном.</SymText>
        <SymCluster><SymButton>Головна дія</SymButton><SymButton variant="outline">Друга</SymButton></SymCluster>
      </SymStack>
    </SymSection>
  </div>
</template>
