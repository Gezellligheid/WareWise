<script setup lang="ts">
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  PinInput,
  PinInputGroup,
  PinInputInput,
} from "@/components/ui/pin-input";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ref } from "vue";

const insertedCode = ref<string[]>([]);
const pinIsFilledIn = () => {
  console.log("pin is filled in");
};
</script>

<template>
  <main class="p-8 min-h-screen flex justify-center items-center">
    <Card class="w-80">
      <CardHeader>
        <CardTitle>Join a team</CardTitle>
        <CardDescription
          >Enter the team name that you want to join and code that you received
          from the teamowner.</CardDescription
        >
      </CardHeader>
      <CardContent>
        <Label for="team-name" class="">Teamname</Label>
        <Input id="team-name" placeholder="Enter the team name" class="mb-4" />
        <Label for="pin-input" class="">Secret pin</Label>
        <div class="flex justify-center">
          <PinInput
            class="w-full"
            id="pin-input"
            v-model="insertedCode"
            placeholder="○"
            @complete="pinIsFilledIn"
          >
            <PinInputGroup class="justify-between w-full">
              <template v-for="(id, index) in 5" :key="id">
                <PinInputInput class="rounded-md border" :index="index" />
                <template v-if="index !== 4">
                  <div class="w-4"></div>
                </template>
              </template>
            </PinInputGroup>
          </PinInput>
        </div>
      </CardContent>
      <CardFooter>
        <Button class="w-full">Join team</Button>
      </CardFooter>
    </Card>
  </main>
</template>
