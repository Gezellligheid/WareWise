<script lang="ts" setup>
import { onBeforeMount, onMounted, ref } from "vue";
import firebase, {
  getUser,
  isUserLoggedIn,
  loginWithGoogle,
} from "../middleware/firebase";

const login = () => {
  loginWithGoogle();
};

const user = ref();
const isLoading = ref(false);

onBeforeMount(async () => {
  isLoading.value = true;
  try {
    user.value = await getUser();
  } catch (error) {
    // console.error(error);
  }
  isLoading.value = false;
});
</script>

<template>
  <div class="p-8 min-h-screen grid lg:grid-cols-2 w-full">
    <div class="flex items-center justify-center">
      <div class="lg:min-w-80 lg:max-w-[50%]">
        <div class="flex justify-center mb-12">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="w-12 h-12"
          >
            <path
              d="M3.375 3C2.339 3 1.5 3.84 1.5 4.875v.75c0 1.036.84 1.875 1.875 1.875h17.25c1.035 0 1.875-.84 1.875-1.875v-.75C22.5 3.839 21.66 3 20.625 3H3.375Z"
            />
            <path
              fill-rule="evenodd"
              d="m3.087 9 .54 9.176A3 3 0 0 0 6.62 21h10.757a3 3 0 0 0 2.995-2.824L20.913 9H3.087Zm6.163 3.75A.75.75 0 0 1 10 12h4a.75.75 0 0 1 0 1.5h-4a.75.75 0 0 1-.75-.75Z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <h1 class="text-4xl font-bold text-center">Welcome back</h1>
        <p class="text-black/40 mt-2 font-medium text-center">
          Sign in to use WareWise
        </p>
        <!-- horizontal lien -->
        <div class="flex items-center -mx-8 mt-16 mb-16">
          <div class="flex-1 h-px bg-black/10"></div>
          <p class="mx-4 text-black/40 text-sm font-medium">Login</p>
          <div class="flex-1 h-px bg-black/10"></div>
        </div>
        <div class="max-w-[100%] mx-auto">
          <button
            @click="login"
            class="bg-black text-white w-full rounded-full py-4 font-semibold text-left px-6"
          >
            <div v-if="isLoading" class="flex justify-center my-1.5">
              <svg
                class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            </div>
            <div v-else class="flex items-center space-x-4">
              <svg
                v-if="!user"
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                viewBox="0 0 24 24"
                width="24"
                class="w-6 fill-white h-6"
              >
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
                <path d="M1 1h22v22H1z" fill="none" />
              </svg>

              <div v-else>
                <img :src="user.photoURL" class="w-8 rounded-full h-8" alt="" />
              </div>
              <p v-if="!user">Continue with Google</p>
              <p v-else="!user" class="truncate">
                Welcome back {{ user.displayName }}
              </p>
            </div>
          </button>
          <div v-if="user" class="flex justify-center mt-4">
            <button class="w-fit mx-auto font-bold hover:underline">
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
    <aside class="bg-black/5 rounded-3xl overflow-hidden hidden lg:block">
      <!-- random image -->

      <img
        class="w-full h-full object-cover"
        src="https://source.unsplash.com/random/1800x1200"
        alt="Random Unsplash Image"
      />
    </aside>
  </div>
</template>
