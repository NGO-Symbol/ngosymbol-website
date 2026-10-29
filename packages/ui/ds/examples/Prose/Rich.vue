<template>
  <SymProse>
    <p>Приклад змісту з таблицею, кодом і підписаним зображенням.</p>
    <figure>
      <svg viewBox="0 0 640 320" width="640" height="320" role="img" aria-label="Приклад зображення: абстрактна фігура на тлі кольору"><rect width="640" height="320" fill="currentColor" opacity=".12" /><circle cx="320" cy="160" r="90" fill="none" stroke="currentColor" stroke-width="28" /></svg>
      <figcaption>Підпис до зображення-приклада. Автор: приклад.</figcaption>
    </figure>
    <table>
      <thead><tr><th>Напрям</th><th>Формат</th><th>Статус</th></tr></thead>
      <tbody>
        <tr><td>Приклад А</td><td>Виставка</td><td>Заплановано</td></tr>
        <tr><td>Приклад Б</td><td>Майстерня</td><td>Триває</td></tr>
      </tbody>
    </table>
    <p>Скорочення в рядку: <code>--sym-fg</code>. Блок коду:</p>
    <pre><code>.card { color: var(--sym-fg); }</code></pre>
    <hr>
    <p>Текст після горизонтальної лінії.</p>
  </SymProse>
</template>
