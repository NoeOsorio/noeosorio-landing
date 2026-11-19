import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import { APP, COPY, GITHUB_URL } from "./content";
import type { Lang } from "./content";
import { mountLayers } from "./layersModel";
import { isValidEmail, joinWaitlist } from "./waitlist";
import "./essay.css";

const STORAGE_KEY = "essay-lang";
const LANGS: Lang[] = ["es", "en"];

function initialLang(): Lang {
  try {
    const q = new URLSearchParams(window.location.search).get("lang");
    if (q === "es" || q === "en") return q;
  } catch {
    /* ignore */
  }
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === "es" || saved === "en") return saved;
  } catch {
    /* ignore */
  }
  return "es";
}

function setMeta(selector: string, attr: string, value: string) {
  document.querySelector(selector)?.setAttribute(attr, value);
}

type Status = "idle" | "sending" | "done" | "invalid" | "failed";

export default function EssayPage() {
  const [lang, setLang] = useState<Lang>(initialLang);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const trackRef = useRef<HTMLDivElement>(null);
  const t = COPY[lang];

  // The 3D model is built once; captions are plain React text that the model only fades in and out.
  useEffect(() => {
    if (!trackRef.current) return;
    return mountLayers(trackRef.current, APP);
  }, []);

  useEffect(() => {
    const prev = {
      title: document.title,
      lang: document.documentElement.lang,
      desc: document.querySelector('meta[name="description"]')?.getAttribute("content") ?? "",
    };
    return () => {
      document.title = prev.title;
      document.documentElement.lang = prev.lang;
      setMeta('meta[name="description"]', "content", prev.desc);
    };
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = t.seoTitle;
    setMeta('meta[name="description"]', "content", t.seoDescription);
    setMeta('meta[property="og:title"]', "content", t.seoTitle);
    setMeta('meta[property="og:description"]', "content", t.seoDescription);
    setMeta('meta[name="twitter:title"]', "content", t.seoTitle);
    setMeta('meta[name="twitter:description"]', "content", t.seoDescription);
  }, [lang, t]);

  const chooseLang = (next: Lang) => {
    setLang(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (status === "sending") return;
    if (!isValidEmail(email)) {
      setStatus("invalid");
      return;
    }
    setStatus("sending");
    try {
      await joinWaitlist(email, lang);
      setStatus("done");
    } catch {
      setStatus("failed");
    }
  };

  const w = t.waitlist;
  const message = status === "invalid" ? w.invalid : status === "failed" ? w.failed : "";

  return (
    <div className="essay-page">
      <header className="ep-bar">
        <a className="ep-brand" href="/">
          <img src="/logo.png" alt="" width={30} height={30} />
          Noé Osorio
        </a>
        <div className="ep-lang">
          {LANGS.map((l) => (
            <button key={l} type="button" aria-pressed={lang === l} lang={l} onClick={() => chooseLang(l)}>
              {COPY[l].langName}
            </button>
          ))}
        </div>
      </header>

      <main>
        <div className="ly-track" ref={trackRef}>
          <div className="ly-stage">
            <div className="ly-light a" aria-hidden="true" />
            <div className="ly-light b" aria-hidden="true" />
            <div className="ly-captions">
              {t.captions.map((c, i) => (
                <div className="ly-cap" key={i}>
                  <h2>{c.title}</h2>
                  <p>{c.text}</p>
                </div>
              ))}
            </div>
            <div className="ly-scene" aria-hidden="true">
              <div className="ly-rig" />
            </div>
          </div>
        </div>

        <section className="ep-details">
          <h2>{t.detailsTitle}</h2>
          <ul>
            {t.details.map((d) => (
              <li key={d.title}>
                <h3>{d.title}</h3>
                <p>{d.text}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="ep-wait">
          <div className="ep-panel">
            <h2>{w.title}</h2>
            <p className="lead">{w.text}</p>
            {status === "done" ? (
              <p className="ep-msg good" role="status">
                {w.done}
              </p>
            ) : (
              <>
                <form className="ep-form" onSubmit={submit} noValidate>
                  <label className="sr-only" htmlFor="essay-email">
                    {w.emailLabel}
                  </label>
                  <input
                    id="essay-email"
                    type="email"
                    name="email"
                    autoComplete="email"
                    placeholder={w.placeholder}
                    aria-label={w.emailLabel}
                    aria-invalid={status === "invalid"}
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (status === "invalid" || status === "failed") setStatus("idle");
                    }}
                  />
                  <button type="submit" disabled={status === "sending"}>
                    {status === "sending" ? w.sending : w.button}
                  </button>
                </form>
                {message && (
                  <p className="ep-msg bad" role="alert">
                    {message}
                  </p>
                )}
              </>
            )}
            <div className="ep-links">
              <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
                {t.github}
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M3.5 12.5l9-9M6.5 3.5h6v6" />
                </svg>
              </a>
              <p>{t.stack}</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="ep-foot">
        <span>{t.footer}</span>
        <a href="/">{t.backToSite}</a>
      </footer>
    </div>
  );
}
