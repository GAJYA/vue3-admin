<template>
  <abc />
  <foo msg="foo" />
</template>

<script lang="tsx" setup>
import foo from './foo'
const abc = <h1>abc</h1>
</script>
