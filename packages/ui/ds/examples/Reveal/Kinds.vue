<template>
  <SymStack gap="2xl">
    <SymText>Прокрутіть вниз: кожен блок з’являється один раз, коли досягає екрана.</SymText>
    <div style="height: 70vh" />
    <SymReveal kind="rise"><SymCard><SymHeading :level="3" size="title-lg">rise</SymHeading><SymText size="sm" muted>Підіймається на 24 px і проявляється.</SymText></SymCard></SymReveal>
    <SymReveal kind="fade"><SymCard tone="lilac"><SymHeading :level="3" size="title-lg">fade</SymHeading><SymText size="sm" muted>Лише проявляється.</SymText></SymCard></SymReveal>
    <SymReveal kind="wipe"><SymCard tone="violet"><SymHeading :level="3" size="title-lg">wipe</SymHeading><SymText size="sm">Відкривається зверху вниз: для зображень.</SymText></SymCard></SymReveal>
  </SymStack>
</template>
