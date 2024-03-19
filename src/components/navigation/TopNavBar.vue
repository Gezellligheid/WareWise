<script lang="ts" setup>
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "../ui/button";
import { Menu, ChevronsUpDown } from "lucide-vue-next";
</script>

<template>
  <nav class="border-b p-2">
    <Sheet>
      <SheetTrigger>
        <Button size="icon" variant="ghost" class="!size-8" color="primary">
          <Menu :size="20" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader class="mb-4">
          <SheetTitle>WareWise</SheetTitle>
        </SheetHeader>
        <Popover class="">
          <PopoverTrigger as-child>
            <Button
              class="w-[200px] justify-between"
              size="sm"
              variant="outline"
            >
              Bellegems Friethuisje <ChevronsUpDown :size="16" />
            </Button>
          </PopoverTrigger>
          <PopoverContent class="w-[200px] p-0">
            <!-- implement command palet -->
          </PopoverContent>
        </Popover>
      </SheetContent>
    </Sheet>
  </nav>
</template>
