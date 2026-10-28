<template>
  <SymGrid min="320" as="ul">
    <li><SymProjectCard href="#" tone="violet" title="Проєкт на власному сайті" period="2025 — триває" status="ongoing" statusLabel="Триває" direction="Напрям" summary="Автономний проєкт має окремий сайт, тому картка веде на нього." external /></li>
    <li><SymProjectCard href="#" tone="plum" title="Проєкт без орбіти" period="2024" status="completed" direction="Напрям" summary="Орбіту можна вимкнути, коли площина має інший вміст." :orbit="false" /></li>
  </SymGrid>
</template>
