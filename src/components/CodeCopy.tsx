"use client";

import { useEffect } from "react";

export default function CodeCopy() {
  useEffect(() => {
    function addButtons() {
      const pres = Array.from(document.querySelectorAll('pre')) as HTMLPreElement[];
      pres.forEach((pre) => {
        if (pre.dataset.copyAttached) return;
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'code-copy-btn';
        btn.innerText = 'Copy';
        btn.style.position = 'absolute';
        btn.style.top = '0.5rem';
        btn.style.right = '0.5rem';
        btn.style.padding = '0.25rem 0.5rem';
        btn.style.fontSize = '0.75rem';
        btn.style.borderRadius = '0.375rem';
        btn.style.border = 'none';
        btn.style.cursor = 'pointer';
        btn.style.background = 'rgba(0,0,0,0.45)';
        btn.style.color = '#fff';
        btn.style.backdropFilter = 'blur(4px)';

        const container = document.createElement('div');
        container.style.position = 'relative';
        pre.parentNode?.insertBefore(container, pre);
        container.appendChild(pre);
        container.appendChild(btn);

        pre.dataset.copyAttached = 'true';

        btn.addEventListener('click', async () => {
          const code = pre.innerText;
          try {
            await navigator.clipboard.writeText(code);
            const old = btn.innerText;
            btn.innerText = 'Copied!';
            setTimeout(() => (btn.innerText = old), 1500);
          } catch (e) {
            // fallback
            const ta = document.createElement('textarea');
            ta.value = code;
            document.body.appendChild(ta);
            ta.select();
            try {
              document.execCommand('copy');
              const old = btn.innerText;
              btn.innerText = 'Copied!';
              setTimeout(() => (btn.innerText = old), 1500);
            } finally {
              document.body.removeChild(ta);
            }
          }
        });
      });
    }

    // initial
    addButtons();

    // observe for new nodes (e.g., after client-side highlight)
    const observer = new MutationObserver(() => addButtons());
    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);

  return null;
}
