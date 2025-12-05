/// <reference types="nativewind/types" />

declare module "nativewind" {
  interface NativeWindConfig {
    theme?: {
      fontFamily?: {
        outfit: string[];
        outfitBold: string[];
      };
    };
  }
}
