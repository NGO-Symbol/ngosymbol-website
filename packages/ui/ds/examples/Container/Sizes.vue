<script setup lang="ts">
const list = ['page', 'narrow', 'prose'] as const
</script>

<template>
  <SymStack gap="s">
    <SymContainer v-for="s in list" :key="s" :size="s" style="background: var(--sym-rule-soft); padding-block: 12px; text-align: center">
      <SymText size="sm">size="{{ s }}"</SymText>
    </SymContainer>
  </SymStack>
</template>
