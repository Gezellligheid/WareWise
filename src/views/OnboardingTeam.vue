<script setup lang="ts">
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
</script>

<template>
  <main class="p-8 min-h-screen flex justify-center items-center">
    <Card class="w-80">
      <CardHeader>
        <CardTitle>👋 Welcome to Warewise</CardTitle>
        <CardDescription>Join or create a team to get started</CardDescription>
      </CardHeader>
      <CardContent class="flex flex-col">
        <RouterLink to="/jointeam">
          <Button class="w-full mb-4">Join a team</Button>
        </RouterLink>
        <div class="flex items-center space-x-4 mb-4">
          <div class="h-px w-full border-t"></div>
          <p class="text-border">or</p>
          <div class="h-px w-full border-t"></div>
        </div>
        <RouterLink to="/createteam">
          <Button variant="secondary" class="w-full">Create a team</Button>
        </RouterLink>
      </CardContent>
    </Card>
  </main>
</template>
