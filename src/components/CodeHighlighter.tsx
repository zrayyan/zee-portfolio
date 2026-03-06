"use client";

import { useEffect } from "react";

export default function CodeHighlighter() {
  useEffect(() => {
    // Load highlight.js CSS and script from CDN and run highlightAll()
    const cssId = 'hljs-css';
    if (!document.getElementById(cssId)) {
      const link = document.createElement('link');
      link.id = cssId;
      link.rel = 'stylesheet';
      link.href = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/styles/github-dark.min.css';
      document.head.appendChild(link);
    }

    const scriptId = 'hljs-script';
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/highlight.min.js';
      script.onload = () => {
        try {
          // @ts-ignore
          if (window.hljs) window.hljs.highlightAll();
        } catch (e) {
          // ignore
        }
      };
      document.body.appendChild(script);
    } else {
      // already loaded
      try {
        // @ts-ignore
        if ((window as any).hljs) (window as any).hljs.highlightAll();
      } catch (e) {}
    }
  }, []);

  return null;
}
