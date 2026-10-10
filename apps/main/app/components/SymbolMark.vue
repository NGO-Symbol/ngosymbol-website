<template>
  <span class="symbol-mark" aria-hidden="true"><span /></span>
</template>

<style scoped>
.symbol-mark {
  width: 2.5rem;
  aspect-ratio: 1;
  display: inline-grid;
  place-items: center;
  border-radius: 50%;
  background: var(--symbol-violet);
  position: relative;
  overflow: hidden;
}

.symbol-mark::before {
  content: '';
  position: absolute;
  width: 56%;
  height: 56%;
  border: .36rem solid var(--symbol-apricot);
  border-right-color: transparent;
  border-radius: 50%;
  transform: rotate(-28deg);
}

.symbol-mark span {
  width: .5rem;
  height: .5rem;
  background: var(--symbol-apricot);
  position: absolute;
  left: 55%;
  top: 50%;
  transform: rotate(45deg);
}
</style>
