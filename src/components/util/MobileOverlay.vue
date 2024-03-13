<script lang="ts" setup>
import { Button } from "@/components/ui/button";
</script>
<template>
  <div class="pointer-events-none relative z-10 w-[100dvw] h-[100dvh] p-4">
    <Button
      class="absolute right-4 shadow-xl rounded-full size-16 pointer-events-auto bottom-4"
      size="icon"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="36"
        height="36"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="lucide lucide-scan-barcode"
      >
        <path d="M3 7V5a2 2 0 0 1 2-2h2" />
        <path d="M17 3h2a2 2 0 0 1 2 2v2" />
        <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
        <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
        <path d="M8 7v10" />
        <path d="M12 7v10" />
        <path d="M17 7v10" />
      </svg>
    </Button>
  </div>
</template>
