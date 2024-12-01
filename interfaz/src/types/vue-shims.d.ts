import { ComponentCustomProperties } from "vue";

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $markdownToHtml: (markdown: string) => string;
  }
}
