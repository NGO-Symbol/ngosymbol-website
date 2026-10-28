<template>
  <SymGrid min="240">
    <SymCard><SymStack gap="xs"><SymEyebrow>white</SymEyebrow><SymHeading :level="3" size="title-lg">Звичайна картка</SymHeading><SymText size="sm" muted>Текст картки.</SymText></SymStack></SymCard>
    <SymCard tone="violet" href="#"><SymStack gap="xs"><SymEyebrow>violet · посилання</SymEyebrow><SymHeading :level="3" size="title-lg">Уся картка — посилання</SymHeading><SymText size="sm">Підіймається при наведенні.</SymText></SymStack></SymCard>
    <SymCard tone="plum" :outline="false"><SymStack gap="xs"><SymEyebrow>plum</SymEyebrow><SymHeading :level="3" size="title-lg">Темна картка</SymHeading><SymText size="sm" muted>Текст і лінії інвертуються.</SymText></SymStack></SymCard>
  </SymGrid>
</template>
