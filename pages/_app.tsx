// src/pages/_app.tsx
import { useEffect } from 'react';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
 useEffect(() => {
   if ('serviceWorker' in navigator) {
     navigator.serviceWorker.register('/sw.js');
   }
 }, []);

 return <Component {...pageProps} />;
}