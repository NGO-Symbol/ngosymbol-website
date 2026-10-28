<template>
  <SymAccordion :single="false">
    <SymAccordionItem title="Відповідь зі списком" open>
      <p>Умовний вступ до списку:</p>
      <ul>
        <li>перший пункт;</li>
        <li>другий пункт;</li>
        <li>третій пункт.</li>
      </ul>
    </SymAccordionItem>
    <SymAccordionItem title="Відповідь із посиланням">
      <p>Умовний текст із <a href="#">посиланням на сторінку</a>.</p>
    </SymAccordionItem>
    <SymAccordionItem title="Дуже довге запитання, яке займає два рядки на вузькому екрані телефону і не ламає розкладку">
      <p>Умовна коротка відповідь.</p>
    </SymAccordionItem>
  </SymAccordion>
</template>
