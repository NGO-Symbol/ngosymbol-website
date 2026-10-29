<template>
  <SymStack>
    <SymCluster><SymButton>Головна</SymButton><SymButton variant="outline">Друга</SymButton><SymButton variant="text" icon="arrow-right">Третя</SymButton><SymButton variant="outline">Ще одна дія</SymButton></SymCluster>
    <SymCluster scroll><SymButton v-for="t in ['Усі', 'Мистецтво', 'Документалістика', 'Психічне здоров’я', 'Театр', 'Дослідження']" :key="t" variant="outline">{{ t }}</SymButton></SymCluster>
  </SymStack>
</template>
