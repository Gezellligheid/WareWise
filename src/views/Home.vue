<script lang="ts" setup>
import TopNavBar from "@/components/navigation/TopNavBar.vue";
import MobileOverlay from "@/components/util/MobileOverlay.vue";
import { isDeviceMobile } from "@/util/mobileUtils";
import { ref } from "vue";

const isOnMobile = ref<boolean>(isDeviceMobile());
</script>

<template>
  <TopNavBar> </TopNavBar>
  <MobileOverlay v-if="isOnMobile" />
</template>
