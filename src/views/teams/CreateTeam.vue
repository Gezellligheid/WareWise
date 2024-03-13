<script setup lang="ts">
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ref } from "vue";
</script>

<template>
  <main class="p-8 min-h-screen flex justify-center items-center">
    <Card class="w-80">
      <CardHeader>
        <CardTitle>Welcome to WareWise</CardTitle>
        <CardDescription class="max-w-96">
          Cool! Welcome to WareWise! <br />
          Let's create a team to get started.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Label for="team-name" class="">Teamname</Label>
        <Input id="team-name" placeholder="Enter your team name" class="mb-4" />
      </CardContent>
      <CardFooter>
        <Button class="w-full">Join team</Button>
      </CardFooter>
    </Card>
  </main>
</template>
