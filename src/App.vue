<script setup>
import EasyFlow from "./EasyFlow";
import { ref } from "vue";
const data = ref({
  mediav: {
    showid: "XsgsZg",
  },
  mlist: {
    sign: "look",
  },
  uid: "234898968.541588155933378800.1673835122257.8027",
});
</script>

<template>
  <div>EasyFlow</div>
  <EasyFlow :config="data"></EasyFlow>
</template>
