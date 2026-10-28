<template>
  <SymEmptyState tone="lilac" :orbit="false" :level="3" title="Нічого не знайдено" text="Спробуйте змінити або скинути фільтри.">
    <template #actions>
      <SymButton variant="text" icon="arrow-right">Скинути фільтри</SymButton>
    </template>
  </SymEmptyState>
</template>
