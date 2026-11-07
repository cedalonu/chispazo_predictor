import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    base: '/chispazo_predictor/',
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'resolve-react-is',
        resolveId(id) {
          if (id === 'react-is' || id.endsWith('/react-is')) {
            return '\0react-is-shim';
          }
        },
        load(id) {
          if (id === '\0react-is-shim') {
            return `
              export const typeOf = () => {};
              export const isValidElementType = () => true;
              export const isAsyncMode = () => false;
              export const isContextConsumer = () => false;
              export const isContextProvider = () => false;
              export const isElement = () => false;
              export const isForwardRef = () => false;
              export const isFragment = () => false;
              export const isLazy = () => false;
              export const isMemo = () => false;
              export const isPortal = () => false;
              export const isProfiler = () => false;
              export const isStrictMode = () => false;
              export const isSuspense = () => false;
              export const ForwardRef = 'react.forward_ref';
              export const Memo = 'react.memo';
              export const Fragment = 'react.fragment';
              export default {
                typeOf,
                isValidElementType,
                isAsyncMode,
                isContextConsumer,
                isContextProvider,
                isElement,
                isForwardRef,
                isFragment,
                isLazy,
                isMemo,
                isPortal,
                isProfiler,
                isStrictMode,
                isSuspense,
                ForwardRef,
                Memo,
                Fragment
              };
            `;
          }
        }
      }
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
    build: {
      // build config
    },
  };
});
