<template>
    <div class="relative">
      <!-- Copy Button -->
      <button
        @click="copyCode"
        class="absolute top-2 right-2 bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded text-sm"
      >
        {{ copied ? "Copied!" : "Copy" }}
      </button>
  
      <!-- Code Block -->
      <pre :class="`language-${language} rounded-lg`">
        <code ref="codeBlock"><slot /></code>
      </pre>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from "vue";
  import Prism from "prismjs";
  import "prismjs/themes/prism-tomorrow.css"; // Dark mode theme
  
  const codeBlock = ref(null);
  const copied = ref(false);
  
  const props = defineProps({
    language: { type: String, default: "javascript" }
  });
  
  // Highlight Code on Mount
  onMounted(() => {
    Prism.highlightElement(codeBlock.value);
  });
  
  // Copy Code to Clipboard
  const copyCode = () => {
    const text = codeBlock.value.textContent;
    navigator.clipboard.writeText(text);
    copied.value = true;
  
    setTimeout(() => {
      copied.value = false;
    }, 1500);
  };
  </script>
  
  <style>
  /* pre {
    @apply text-white p-4 overflow-x-auto shadow-lg transition-all duration-300;
  } */
  </style>
  