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
import { Menu, ChevronsUpDown, Check } from "lucide-vue-next";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { ref } from "vue";
import router from "@/middleware/router";

// TODO: implement database action
// TODO: Make selectedTeam stored in local storage and update it on change -> Util?
const availableTeams = ref<string[]>(["Bellegems Friethuisje", "KFC"]);
const selectedTeam = ref<string>("Bellegems Friethuisje");

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
              {{ selectedTeam }}
              <ChevronsUpDown :size="16" />
            </Button>
          </PopoverTrigger>
          <PopoverContent class="w-[200px] p-0">
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
