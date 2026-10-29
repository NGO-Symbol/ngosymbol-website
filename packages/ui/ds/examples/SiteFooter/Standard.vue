<template>
  <SymSiteFooter>
    <template #brand>
      <SymWordmark href="#" />
      <p>Громадська організація «Символ». Короткий опис організації тут: одне речення, без обіцянок і цифр, яких ще немає.</p>
    </template>
    <template #nav>
      <h2>Сторінки</h2>
      <ul role="list">
        <li><a href="#">Про нас</a></li>
        <li><a href="#">Проєкти</a></li>
        <li><a href="#">Події</a></li>
      </ul>
    </template>
    <template #contact>
      <h2>Контакти</h2>
      <ul role="list">
        <li><a href="mailto:hello@example.org">hello@example.org</a></li>
        <li><a href="https://www.instagram.com/">Інстаграм</a></li>
      </ul>
    </template>
    <template #legal>
      <p>© ГО «Символ»</p>
      <ul role="list"><li><a href="#">Конфіденційність</a></li><li><a href="#">Доступність</a></li></ul>
    </template>
  </SymSiteFooter>
</template>
