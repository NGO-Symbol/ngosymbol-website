<template>
  <SymStack gap="xl">
    <SymSplit ratio="5:7"><template #start><SymHeading :level="3" size="headline">Заголовок</SymHeading></template><template #end><SymText>Вступний абзац праворуч від заголовка. Звузьте ширину сцени, і колонки складуться одна під одну.</SymText></template></SymSplit>
    <SymSplit ratio="aside" sticky><template #start><SymEyebrow>Факти</SymEyebrow></template><template #end><SymText>Основний текст поруч із вузькою колонкою-підписом.</SymText></template></SymSplit>
    <SymSplit reverse align="center"><template #start><SymText>Текст. На телефоні зображення над ним (reverse).</SymText></template><template #end><SymOrbit size="md" /></template></SymSplit>
  </SymStack>
</template>
