import { useEffect, useRef, useState } from "react";
import { HiClipboardCopy, HiMail } from "react-icons/hi";
import { siteLinks } from "../../data/siteLinks";

export const ProjectsCTA = () => {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(siteLinks.email);
      setCopied(true);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section className="py-32 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
              Want to <span className="text-lime-300">talk</span>?
            </h2>
            <p className="text-xl text-zinc-400 leading-relaxed">
              I read every email. Ideas, questions about my projects, or just saying hi.
            </p>
          </div>

          <div className="p-8 bg-zinc-800/50 rounded-xl border border-zinc-700/50 hover:border-lime-300/30 transition-colors">
            <div className="p-4 bg-lime-300/10 text-lime-300 rounded-xl w-fit mb-6">
              <HiMail className="w-6 h-6" aria-hidden="true" />
            </div>
            <h3 className="text-2xl font-semibold text-white mb-8 break-all">{siteLinks.email}</h3>
            <button
              type="button"
              onClick={copyEmail}
              className="inline-flex items-center gap-2 text-lime-300 hover:text-lime-400 transition-colors"
            >
              <HiClipboardCopy className="w-5 h-5" aria-hidden="true" />
              {copied ? "Copied" : "Copy email"}
            </button>
            <span className="sr-only" role="status" aria-live="polite">
              {copied ? "Email copied to clipboard" : ""}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
