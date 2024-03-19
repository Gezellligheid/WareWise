<script lang="ts" setup>
import {
  Sheet,
  SheetContent,
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
import { Menu, ChevronsUpDown, Check } from "lucide-vue-next";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { ref } from "vue";
import { isDeviceMobile } from "@/util/mobileUtils";

// TODO: implement database action
// TODO: Make selectedTeam stored in local storage and update it on change -> Util?
const availableTeams = ref<string[]>(["Bellegems Friethuisje", "KFC"]);
const selectedTeam = ref<string>("Bellegems Friethuisje");

const isMobile = ref<boolean>(isDeviceMobile());

const changeTeam = (team: string) => {
  selectedTeam.value = team;
};
</script>

<template>
  <nav class="border-b p-2">
    <Sheet>
      <SheetTrigger>
        <Button size="icon" variant="ghost" class="!size-8" color="primary">
          <Menu :size="20" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" class="w-full">
        <SheetHeader class="mb-4">
          <SheetTitle class="text-left">WareWise</SheetTitle>
        </SheetHeader>

        <Popover class="relative">
          <PopoverTrigger as-child>
            <Button
              class="md:w-[200px] w-full justify-between"
              size="sm"
              variant="outline"
            >
              {{ selectedTeam }}
              <ChevronsUpDown :size="16" />
            </Button>
          </PopoverTrigger>
          <PopoverContent class="w-full md:w-[200px] p-0">
            <!-- implement command palet -->
            <Command>
              <CommandList>
                <CommandInput placeholder="Search team"></CommandInput>
                <CommandEmpty>No teams found</CommandEmpty>
                <CommandGroup heading="Teams">
                  <CommandItem
                    class="justify-between"
                    v-for="team in availableTeams"
                    :key="team"
                    :value="team"
                    @click="changeTeam(team)"
                  >
                    {{ team }}
                    <Check :size="14" v-if="selectedTeam == team"></Check>
                  </CommandItem>
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </SheetContent>
    </Sheet>
  </nav>
</template>
