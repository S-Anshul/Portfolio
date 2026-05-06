import { useState, useEffect, useRef } from "react";

const styles = `
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Fira+Code:wght@300;400;500;600;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    /* Backgrounds - True Black Hierarchy */
    --bg:         #09090B;      /* Deepest void */
    --bg2:        #0F0F12;      /* Surface level 1 */
    --bg3:        #18181B;      /* Elevated panels */
    --card:       #141417;      /* Card background */
    --card-border:#27272A;      /* Subtle border (zinc-800) */
    
    /* Accents - Blood/Crimson (replaces Blue) */
    --blue:       #DC2626;      /* Primary red-600 */
    --blue-bright:#F87171;      /* Hover state red-400 (glow) */
    --blue-dim:   #991B1B;      /* Active/pressed red-800 */
    
    /* Text - Cool White (crisp against black) */
    --text:       #FAFAFA;      /* Near-white primary */
    --text-muted: #A1A1AA;      /* Zinc-400 secondary */
    --text-dim:   #E4E4E7;      /* Zinc-200 tertiary */
    
    /* Optional extras for this theme */
    --danger-glow: rgba(220, 38, 38, 0.15);   /* For subtle hover glows */
    --accent-secondary: #7F1D1D;              /* Deep maroon for code bg */
  }

  body { background: var(--bg); color: var(--text); font-family: 'Space Grotesk', sans-serif; }

  .portfolio {
    min-height: 100vh;
    background: var(--bg);
    overflow-x: hidden;
  }

  /* NAV */
  .nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    display: flex; align-items: center; justify-content: space-between;
    padding: 1rem 4rem;
    background: rgba(13,17,23,0.92);
    backdrop-filter: blur(20px);
    border-bottom: 1px solid var(--card-border);
  }
  .nav-logo {
    font-family: 'Fira Code', monospace;
    font-size: 1.1rem; font-weight: 700;
    color: var(--blue-bright);
    letter-spacing: -0.5px;
  }
  .nav-logo span { color: var(--text-muted); }
  .nav-links { display: flex; gap: 2rem; list-style: none; }
  .nav-links a {
    color: var(--text-dim); font-size: 0.9rem; font-weight: 500;
    text-decoration: none; transition: color 0.2s;
    letter-spacing: 0.3px;
  }
  .nav-links a:hover { color: var(--text); }
  .nav-btn {
    display: flex; align-items: center; gap: 0.5rem;
    padding: 0.5rem 1.2rem;
    background: var(--blue); color: #fff;
    border: none; border-radius: 6px;
    font-family: 'Fira Code', sans-serif; font-size: 0.85rem; font-weight: 600;
    cursor: pointer; transition: background 0.2s, transform 0.15s;
    letter-spacing: 0.3px;
  }
  .nav-btn:hover { background: var(--blue-dim); transform: translateY(-1px); }

  /* HERO */
  .hero {
    min-height: 100vh;
    display: grid; grid-template-columns: 1fr 1fr;
    align-items: center; gap: 4rem;
    padding: 8rem 4rem 4rem;
    position: relative;
    overflow: hidden;
  }
  .hero::before {
    content: '';
    position: absolute; top: -20%; right: -10%;
    width: 600px; height: 600px;
    background: radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%);
    pointer-events: none;
  }
  .hero-greeting {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.9rem; color: var(--blue-bright);
    margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;
  }
  .hero-title {
    font-size: 3.8rem; font-weight: 800; line-height: 1.1;
    margin-bottom: 0.5rem; letter-spacing: -2px;
  }
  .hero-title .name { color: var(--blue-bright); }
  .hero-subtitle {
    font-size: 1.2rem; font-weight: 600; color: var(--text-dim);
    margin-bottom: 1.5rem; letter-spacing: -0.5px;
  }
  .hero-desc {
    font-size: 0.95rem; color: var(--text-muted); line-height: 1.7;
    max-width: 380px; margin-bottom: 2rem; font-family: 'JetBrains Mono', monospace;
    font-weight: 300;
  }
  .hero-btns { display: flex; gap: 1rem; margin-bottom: 2rem; }
  .btn-primary {
    display: flex; align-items: center; gap: 0.5rem;
    padding: 0.75rem 1.5rem;
    background: var(--blue); color: #fff;
    border: none; border-radius: 8px;
    font-family: 'Syne', sans-serif; font-size: 0.9rem; font-weight: 600;
    cursor: pointer; transition: all 0.2s;
  }
  .btn-primary:hover { background: var(--blue-dim); transform: translateY(-2px); box-shadow: 0 8px 24px rgba(59,130,246,0.3); }
  .btn-secondary {
    display: flex; align-items: center; gap: 0.5rem;
    padding: 0.75rem 1.5rem;
    background: transparent; color: var(--text);
    border: 1px solid var(--card-border); border-radius: 8px;
    font-family: 'Syne', sans-serif; font-size: 0.9rem; font-weight: 600;
    cursor: pointer; transition: all 0.2s;
  }
  .btn-secondary:hover { border-color: var(--blue); color: var(--blue-bright); transform: translateY(-2px); }
  .hero-socials { display: flex; gap: 1.2rem; }
  .social-icon {
    width: 36px; height: 36px;
    display: flex; align-items: center; justify-content: center;
    color: var(--text-muted); transition: color 0.2s, transform 0.2s;
    cursor: pointer;
  }
  .social-icon:hover { color: var(--blue-bright); transform: translateY(-2px); }
  .social-icon svg { width: 20px; height: 20px; }

  /* CODE BLOCK */
  .code-block {
    background: #0d1117;
    border: 1px solid #21262d;
    border-radius: 12px;
    overflow: hidden;
    font-family: 'Fira Code', monospace;
    font-size: 0.82rem;
    position: relative;
  }
  .code-header {
    display: flex; align-items: center; gap: 0.5rem;
    padding: 0.8rem 1rem;
    background: #161b22;
    border-bottom: 1px solid #21262d;
  }
  .dot { width: 12px; height: 12px; border-radius: 50%; }
  .dot-red { background: #ff5f56; }
  .dot-yellow { background: #ffbd2e; }
  .dot-green { background: #27c93f; }
  .code-body { padding: 1.5rem; line-height: 2; }
  .c-blue { color: #79b8ff; }
  .c-green { color: #85e89d; }
  .c-orange { color: #ffab70; }
  .c-purple { color: #b392f0; }
  .c-gray { color: #6a737d; }
  .c-white { color: #e1e4e8; }

  /* SECTIONS */
  .section { padding: 5rem 4rem; }
  .section-alt { background: var(--bg2); }
  .section-title {
    display: flex; align-items: center; gap: 0.75rem;
    font-size: 1.6rem; font-weight: 700; margin-bottom: 2.5rem;
    letter-spacing: -0.5px;
  }
  .section-title svg { color: var(--blue-bright); }

  /* ABOUT */
  .about-grid { display: grid; grid-template-columns: 1fr 3fr; gap: 3rem; align-items: start; }
  .about-text {
    font-size: 0.95rem; color: var(--text-muted); line-height: 1.8;
    font-family: 'JetBrains Mono', monospace; font-weight: 300;
  }
  .about-cards { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; }
  .about-card {
    background: var(--card);
    border: 1px solid var(--card-border);
    border-radius: 10px;
    padding: 1.2rem;
    transition: border-color 0.2s, transform 0.2s;
  }
  .about-card:hover { border-color: var(--blue); transform: translateY(-3px); }
  .about-card-icon { color: var(--blue-bright); margin-bottom: 0.75rem; }
  .about-card-title { font-size: 0.95rem; font-weight: 700; margin-bottom: 0.3rem; }
  .about-card-sub { font-size: 0.8rem; color: var(--text-muted); font-family: 'JetBrains Mono', monospace; }
  .about-card-date { font-size: 0.75rem; color: var(--blue-bright); margin-top: 0.25rem; font-family: 'JetBrains Mono', monospace; }

  /* SKILLS */
  .skills-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5rem; }
  .skill-group {
    background: var(--card);
    border: 1px solid var(--card-border);
    border-radius: 12px;
    padding: 1.5rem;
    transition: border-color 0.2s;
  }
  .skill-group:hover { border-color: var(--blue); }
  .skill-group-title {
    display: flex; align-items: center; gap: 0.5rem;
    font-size: 0.85rem; font-weight: 700; color: var(--text-dim);
    margin-bottom: 1rem; padding-bottom: 0.75rem;
    border-bottom: 1px solid var(--card-border);
    letter-spacing: 0.5px; text-transform: uppercase;
  }
  .skill-tags { display: flex; flex-wrap: wrap; gap: 0.5rem; }
  .skill-tag {
    padding: 0.3rem 0.7rem;
    background: var(--bg3);
    border: 1px solid var(--card-border);
    border-radius: 5px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.78rem; color: var(--text-dim);
    transition: all 0.2s;
  }
  .skill-tag:hover { border-color: var(--blue); color: var(--blue-bright); }

  /* PROJECTS */
  .projects-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
  .project-card {
    background: var(--card);
    border: 1px solid var(--card-border);
    border-radius: 12px;
    overflow: hidden;
    transition: border-color 0.2s, transform 0.2s;
  }
  .project-card:hover { border-color: var(--blue); transform: translateY(-4px); box-shadow: 0 12px 32px rgba(59,130,246,0.1); }
  .project-img {
    width: 100%; height: 140px;
    background: linear-gradient(135deg, #0d1117, #1a1f2e);
    display: flex; align-items: center; justify-content: center;
    overflow: hidden; position: relative;
  }
  .project-img-placeholder {
    display: grid; grid-template-columns: repeat(3,1fr); gap: 4px; padding: 16px; opacity: 0.4;
  }
  .proj-thumb { background: var(--blue-dim); border-radius: 3px; height: 28px; }
  .project-body { padding: 1.25rem; }
  .project-name {
    display: flex; align-items: center; gap: 0.4rem;
    font-size: 1rem; font-weight: 700; margin-bottom: 0.5rem;
  }
  .project-name a { color: var(--text); text-decoration: none; }
  .project-name a:hover { color: var(--blue-bright); }
  .project-desc { font-size: 0.82rem; color: var(--text-muted); line-height: 1.6; margin-bottom: 1rem; font-family: 'JetBrains Mono', monospace; font-weight: 300; }
  .project-tags { display: flex; flex-wrap: wrap; gap: 0.4rem; }
  .project-tag {
    padding: 0.2rem 0.55rem;
    background: rgba(59,130,246,0.1);
    border: 1px solid rgba(59,130,246,0.25);
    border-radius: 4px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.72rem; color: var(--blue-bright);
  }

  /* EXPERIENCE */
  .exp-timeline { position: relative; padding-left: 2rem; }
  .exp-timeline::before {
    content: ''; position: absolute; left: 0; top: 8px; bottom: 8px;
    width: 2px; background: var(--card-border);
  }
  .exp-item {
    position: relative; margin-bottom: 2.5rem;
    display: grid; grid-template-columns: 140px 1fr auto;
    gap: 2rem; align-items: start;
  }
  .exp-item::before {
    content: ''; position: absolute;
    left: -2rem; top: 10px;
    width: 10px; height: 10px;
    border-radius: 50%;
    background: var(--blue); border: 2px solid var(--bg2);
    transform: translateX(-4px);
  }
  .exp-date { font-family: 'JetBrains Mono', monospace; font-size: 0.8rem; color: var(--blue-bright); padding-top: 2px; }
  .exp-content {
    background: var(--card);
    border: 1px solid var(--card-border);
    border-radius: 12px;
    padding: 1.5rem;
    transition: border-color 0.2s;
  }
  .exp-content:hover { border-color: var(--blue); }
  .exp-title { font-size: 1rem; font-weight: 700; margin-bottom: 0.2rem; }
  .exp-company { font-size: 0.85rem; color: var(--blue-bright); margin-bottom: 1rem; font-family: 'JetBrains Mono', monospace; }
  .exp-points { list-style: none; }
  .exp-points li {
    position: relative; padding-left: 1rem;
    font-size: 0.82rem; color: var(--text-muted); line-height: 1.6;
    margin-bottom: 0.5rem; font-family: 'JetBrains Mono', monospace; font-weight: 300;
  }
  .exp-points li::before { content: '▸'; position: absolute; left: 0; color: var(--blue); }
  .exp-logo {
    background: white; border-radius: 10px;
    padding: 0.75rem 1rem;
    display: flex; align-items: center; justify-content: center;
    min-width: 100px; min-height: 60px;
    font-weight: 800; font-size: 0.85rem;
  }
  .logo-brenin { color: #1a4fa0; }
  .logo-ieee { color: #006699; font-size: 1.1rem; }

  /* CONTACT */
  .contact-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; }
  .contact-card {
    background: var(--card);
    border: 1px solid var(--card-border);
    border-radius: 12px;
    padding: 1.5rem;
    display: flex; align-items: center; gap: 1rem;
    transition: border-color 0.2s, transform 0.2s;
    cursor: pointer;
  }
  .contact-card:hover { border-color: var(--blue); transform: translateY(-3px); }
  .contact-icon { color: var(--blue-bright); flex-shrink: 0; }
  .contact-label { font-size: 0.85rem; font-weight: 700; margin-bottom: 0.2rem; }
  .contact-value { font-size: 0.78rem; color: var(--text-muted); font-family: 'JetBrains Mono', monospace; }

  /* FOOTER */
  .footer {
    padding: 2rem 4rem;
    border-top: 1px solid var(--card-border);
    display: flex; align-items: center; justify-content: space-between;
    font-size: 0.82rem; color: var(--text-muted);
    font-family: 'JetBrains Mono', monospace;
  }
  .scroll-top {
    width: 36px; height: 36px;
    border: 1px solid var(--card-border);
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    color: var(--text-muted); cursor: pointer;
    transition: all 0.2s;
  }
  .scroll-top:hover { border-color: var(--blue); color: var(--blue-bright); transform: translateY(-2px); }

  @media (max-width: 900px) {
    .nav { padding: 1rem 1.5rem; }
    .nav-links { display: none; }
    .hero { grid-template-columns: 1fr; padding: 6rem 1.5rem 3rem; gap: 2rem; }
    .section { padding: 3rem 1.5rem; }
    .about-grid { grid-template-columns: 1fr; }
    .about-cards { grid-template-columns: repeat(2, 1fr); }
    .skills-grid { grid-template-columns: repeat(2, 1fr); }
    .projects-grid { grid-template-columns: 1fr; }
    .exp-item { grid-template-columns: 1fr; }
    .exp-logo { display: none; }
    .contact-grid { grid-template-columns: repeat(2, 1fr); }
    .footer { flex-direction: column; gap: 1rem; text-align: center; }
    .hero-title { font-size: 2.5rem; }
  }
`;

const CodeBlock = () => {
  const CODE_LINES = [
    {
      parts: [
        { cls: "c-blue", t: "const" },
        { cls: "c-white", t: " developer = {" },
      ],
    },
    {
      parts: [
        { cls: "c-white", t: "  " },
        { cls: "c-orange", t: "name" },
        { cls: "c-white", t: ": " },
        { cls: "c-green", t: '"Anshul"' },
        { cls: "c-white", t: "," },
      ],
    },
    {
      parts: [
        { cls: "c-white", t: "  " },
        { cls: "c-orange", t: "openTo" },
        { cls: "c-white", t: ": " },
        { cls: "c-green", t: '"Internships & SDE roles"' },
        { cls: "c-white", t: "," },
      ],
    },
    // { parts: [{ cls: "c-white", t: "  " }, { cls: "c-orange", t: "passion" }, { cls: "c-white", t: ": [" }, { cls: "c-green", t: '"Web Dev"' }, { cls: "c-white", t: ", " }, { cls: "c-green", t: '"AI"' }, { cls: "c-white", t: ", " }, { cls: "c-green", t: '"DSA"' }, { cls: "c-white", t: "]," }] },
    // { parts: [{ cls: "c-white", t: "  " }, { cls: "c-orange", t: "tech" }, { cls: "c-white", t: ": [" }, { cls: "c-green", t: '"React"' }, { cls: "c-white", t: ", " }, { cls: "c-green", t: '"Node.js"' }, { cls: "c-white", t: ", " }, { cls: "c-green", t: '"MongoDB"' }, { cls: "c-white", t: "]," }] },
    {
      parts: [
        { cls: "c-white", t: "  " },
        { cls: "c-orange", t: "currently" },
        { cls: "c-white", t: ": " },
        { cls: "c-green", t: '"Building cool things 🚀"' },
      ],
    },
    { parts: [{ cls: "c-white", t: "}" }] },
    { parts: [] },
    {
      parts: [
        { cls: "c-blue", t: "while" },
        { cls: "c-white", t: " (" },
        { cls: "c-purple", t: "learning" },
        { cls: "c-white", t: ") {" },
      ],
    },
    {
      parts: [
        { cls: "c-white", t: "  " },
        { cls: "c-purple", t: "build" },
        { cls: "c-white", t: "();" },
      ],
    },
    {
      parts: [
        { cls: "c-white", t: "  " },
        { cls: "c-purple", t: "improve" },
        { cls: "c-white", t: "();" },
      ],
    },
    {
      parts: [
        { cls: "c-white", t: "  " },
        { cls: "c-purple", t: "ship" },
        { cls: "c-white", t: "();" },
      ],
    },
    { parts: [{ cls: "c-white", t: "}" }] },
  ];

  const flatLines = CODE_LINES.map((line) => ({
    text: line.parts.map((p) => p.t).join(""),
    parts: line.parts,
  }));

  const [displayedLines, setDisplayedLines] = useState([]);
  const [curLineIdx, setCurLineIdx] = useState(0);
  const [curCharIdx, setCurCharIdx] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const t = setInterval(() => setShowCursor((s) => !s), 530);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const line = flatLines[curLineIdx];
    if (!line) return;

    if (curCharIdx < line.text.length) {
      const t = setTimeout(() => setCurCharIdx((i) => i + 1), 38);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => {
        setDisplayedLines((prev) => {
          const next = [...prev];
          next[curLineIdx] = line.text;
          return next;
        });
        if (curLineIdx + 1 < flatLines.length) {
          setCurLineIdx((i) => i + 1);
          setCurCharIdx(0);
        } else {
          const restart = setTimeout(() => {
            setDisplayedLines([]);
            setCurLineIdx(0);
            setCurCharIdx(0);
          }, 1800);
          return () => clearTimeout(restart);
        }
      }, 60);
      return () => clearTimeout(t);
    }
  }, [curLineIdx, curCharIdx]);

  const renderLine = (lineIdx, charCount) => {
    const { parts } = flatLines[lineIdx];
    let rendered = [];
    let remaining = charCount;
    for (let i = 0; i < parts.length; i++) {
      if (remaining <= 0) break;
      const slice = parts[i].t.slice(0, remaining);
      rendered.push(
        <span key={i} className={parts[i].cls}>
          {slice}
        </span>,
      );
      remaining -= parts[i].t.length;
    }
    return rendered;
  };

  return (
    <div className="code-block">
      <div className="code-header">
        <div className="dot dot-red" />
        <div className="dot dot-yellow" />
        <div className="dot dot-green" />
      </div>
      <div className="code-body" style={{ minHeight: "18rem" }}>
        {flatLines.map((line, i) => {
          const isActive = i === curLineIdx;
          const isDone = displayedLines[i] !== undefined;
          if (i > curLineIdx && !isDone) return null;
          if (line.text === "") return <div key={i}>&nbsp;</div>;
          return (
            <div key={i}>
              {isActive ? (
                <>
                  {renderLine(i, curCharIdx)}
                  <span
                    style={{
                      borderRight: "2px solid #60a5fa",
                      opacity: showCursor ? 1 : 0,
                      marginLeft: "1px",
                    }}
                  >
                    &nbsp;
                  </span>
                </>
              ) : isDone ? (
                renderLine(i, line.text.length)
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const Icon = ({ name, size = 20 }) => {
  const icons = {
    download: (
      <svg
        width={size}
        height={size}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
        />
      </svg>
    ),
    arrow: (
      <svg
        width={size}
        height={size}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17 8l4 4m0 0l-4 4m4-4H3"
        />
      </svg>
    ),
    github: (
      <svg width={size} height={size} fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
    linkedin: (
      <svg width={size} height={size} fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
    twitter: (
      <svg width={size} height={size} fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
    mail: (
      <svg
        width={size}
        height={size}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
    user: (
      <svg
        width={size}
        height={size}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
        />
      </svg>
    ),
    settings: (
      <svg
        width={size}
        height={size}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
    folder: (
      <svg
        width={size}
        height={size}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V7z"
        />
      </svg>
    ),
    code: (
      <svg
        width={size}
        height={size}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
        />
      </svg>
    ),
    briefcase: (
      <svg
        width={size}
        height={size}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
    users: (
      <svg
        width={size}
        height={size}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
    cap: (
      <svg
        width={size}
        height={size}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path d="M12 14l9-5-9-5-9 5 9 5z" />
        <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
      </svg>
    ),
    target: (
      <svg
        width={size}
        height={size}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="6" />
        <circle cx="12" cy="12" r="2" />
      </svg>
    ),
    phone: (
      <svg
        width={size}
        height={size}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 7V5z"
        />
      </svg>
    ),
    location: (
      <svg
        width={size}
        height={size}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
    link: (
      <svg
        width={size}
        height={size}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
        />
      </svg>
    ),
    up: (
      <svg
        width={size}
        height={size}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M5 10l7-7m0 0l7 7m-7-7v18"
        />
      </svg>
    ),
    wrench: (
      <svg
        width={size}
        height={size}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
    globe: (
      <svg
        width={size}
        height={size}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
        />
      </svg>
    ),
    db: (
      <svg
        width={size}
        height={size}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
      </svg>
    ),
  };
  return icons[name] || null;
};

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("home");

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const projects = [
    {
      name: "Content Based Image Search",
      desc: "Text-based image search system with semantic understanding and content-based retrieval.",
      tags: ["InstructBLIP", "FAISS", "Sentence", "Transformers"],
      link: true,
      href: "https://github.com/S-Anshul/Content-Based-Image-Search",
      img: import.meta.env.BASE_URL + "/img1.png",
    },
    {
      name: "MusicTube",
      desc: "AI-powered music streaming platform with precise search, fast retrieval and robust security.",
      tags: [
        "ReactJS",
        "NodeJS",
        "MongoDB",
        "Pinecone",
        "Redux",
        "FastAPI",
        "CLAP",
        "Transformers",
      ],
      link: true,
      href: "https://github.com/S-Anshul/MusicTube",
      img: import.meta.env.BASE_URL + "/img2.png",
    },
    {
      name: "StellarVision",
      desc: "Web application for exploring NASA's Astronomy Picture of the Day (APoD).",
      tags: ["React.JS", "TailwindCSS", "TypeScript"],
      link: true,
      href: "https://github.com/S-Anshul/StellarVision",
      img: import.meta.env.BASE_URL +"/img3.png",
    },
  ];

  return (
    <div className="portfolio">
      <style>{styles}</style>

      {/* NAV */}
      <nav className="nav">
        <div className="nav-logo">
          <span>&lt;/&gt;</span> Anshul 
        </div>
        <ul className="nav-links">
          {["About", "Skills", "Experience", "Projects", "Contact"].map((s) => (
            <li key={s}>
              <a
                href={`#${s.toLowerCase()}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo(s.toLowerCase());
                }}
              >
                {s}
              </a>
            </li>
          ))}
        </ul>
        {/* <button className="nav-btn"><Icon name="download" size={16} /> Download Resume</button> */}
      </nav>

      {/* HERO */}
      <section className="hero" id="home">
        <div>
          <div className="hero-greeting">Hey there!</div>
          {/* <h1 className="hero-title">I'm <span className="name">Anshul </span></h1> */}
          <div className="hero-subtitle">
            Full Stack Developer & <br />
            AI Enthusiast
          </div>
          <p className="hero-desc">
            I enjoys exploring how things work—whether it’s building something
            on the web or experimenting with AI tools
          </p>
          <div className="hero-btns">
            <button
              className="btn-primary"
              onClick={() => scrollTo("projects")}
            >
              View Projects <Icon name="arrow" size={16} />
            </button>
            <a
              href="https://drive.google.com/file/d/1c_UK6WORGNy--jtHgGdUN9d5otUqiSfD/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-btn"
              style={{ textDecoration: "none", color: "#fff" }}
            >
              <Icon name="link" size={16} /> View Resume
            </a>
          </div>
          <div className="hero-socials">
            {[
              {
                icon: "github",
                label: "GitHub",
                href: "https://github.com/S-Anshul",
              },
              {
                icon: "linkedin",
                label: "LinkedIn",
                href: "https://www.linkedin.com/in/anshul-hernote-95459526a/",
              },
              {
                icon: "mail",
                label: "Email",
                href: "mailto:anshul10777@gmail.com",
              },
            ].map((s) => (
              <a
                key={s.icon}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
                title={s.label}
              >
                <Icon name={s.icon} />
              </a>
            ))}
          </div>
        </div>
        <CodeBlock />
      </section>

      {/* ABOUT */}
      <section className="section section-alt" id="about">
        <div className="section-title">
          <Icon name="user" />
          <span>About Me</span>
        </div>
        <div className="about-grid">
          <p className="about-text">
            I'm Anshul, an Electronics and Communication Engineering
            student at PEC Chandigarh. I have worked on improving loco pilot
            communication for Indian Railways, as well as building a web
            platform for audio uploads and journey reporting.
          </p>
          <div className="about-cards">
            {[
              {
                icon: "cap",
                title: "B.Tech ECE",
                sub: "PEC Chandigarh",
                date: "2022 – Present",
              },
              {
                icon: "briefcase",
                title: "Intern",
                sub: "Brenin Technology",
                date: "May 2025 – Jul 2025",
              },
              {
                icon: "users",
                title: "IEEE Member",
                sub: "Implementation Team",
                date: "Aug 2023 – Present",
              },
              {
                icon: "target",
                title: "Focus",
                sub: "Full Stack + AI",
                date: "Problem Solving",
              },
            ].map((c) => (
              <div key={c.title} className="about-card">
                <div className="about-card-icon">
                  <Icon name={c.icon} size={22} />
                </div>
                <div className="about-card-title">{c.title}</div>
                <div className="about-card-sub">{c.sub}</div>
                <div className="about-card-date">{c.date}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section className="section" id="skills">
        <div className="section-title">
          <Icon name="settings" />
          <span>Skills</span>
        </div>
        <div className="skills-grid">
          {[
            {
              icon: "code",
              title: "Programming Languages",
              tags: ["C++", "JavaScript", "MySQL"],
            },
            {
              icon: "globe",
              title: "Web Development",
              tags: [
                "HTML5",
                "CSS3",
                "JavaScript",
                "ReactJS",
                "Redux",
                "NextJS",
              ],
            },
            {
              icon: "db",
              title: "Backend & Database",
              tags: ["Node.js", "Express", "MongoDB", "Pinecone"],
            },
            {
              icon: "wrench",
              title: "Tools & Technologies",
              tags: ["Git", "GitHub", "Postman", "Docker", "VS Code"],
            },
          ].map((g) => (
            <div key={g.title} className="skill-group">
              <div className="skill-group-title">
                <Icon name={g.icon} size={16} />
                {g.title}
              </div>
              <div className="skill-tags">
                {g.tags.map((t) => (
                  <span key={t} className="skill-tag">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PROJECTS */}
      <section className="section section-alt" id="projects">
        <div className="section-title">
          <Icon name="folder" />
          <span>Projects</span>
        </div>
        <div className="projects-grid">
          {projects.map((p) => (
            <div key={p.name} className="project-card">
              <div className="project-img">
                {p.img ? (
                  <img
                    src={p.img}
                    alt={p.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                      background: "#0d1117",
                    }}
                  />
                ) : (
                  <div className="project-img-placeholder">
                    {[...Array(9)].map((_, i) => (
                      <div
                        key={i}
                        className="proj-thumb"
                        style={{ opacity: 0.3 + (i % 3) * 0.2 }}
                      />
                    ))}
                  </div>
                )}
              </div>
              <div className="project-body">
                <div className="project-name">
                  <a
                    href={p.href || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {p.name}
                  </a>
                  {p.link && <Icon name="link" size={14} />}
                </div>
                <p className="project-desc">{p.desc}</p>
                <div className="project-tags">
                  {p.tags.map((t) => (
                    <span key={t} className="project-tag">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* EXPERIENCE */}
      <section className="section" id="experience">
        <div className="section-title">
          <Icon name="briefcase" />
          <span>Experience</span>
        </div>
        <div className="exp-timeline">
          <div className="exp-item">
            <div className="exp-date">
              May 2025 –<br />
              Jul 2025
            </div>
            <div className="exp-content">
              <div className="exp-title">Brenin Technology • Intern</div>
              <div className="exp-company">Software Development Intern</div>
              <ul className="exp-points">
                <li>
                  Enhanced loco pilot communication monitoring for Indian
                  Railways by extracting and transcribing human voice from large
                  audio files using Silero VAD and Google Transcription.
                </li>
                <li>
                  Implemented compliance verification through comparison of
                  transcriptions against predefined rules.
                </li>
                <li>
                  Developed a user-friendly website for audio file upload and
                  journey reporting.
                </li>
              </ul>
            </div>
            <div className="exp-logo logo-brenin">
              BRENIN
              <br />
              TECHNOLOGY
            </div>
          </div>
          <div className="exp-item">
            <div className="exp-date">
              Aug 2023 –<br />
              Present
            </div>
            <div className="exp-content">
              <div className="exp-title">IEEE • Implementation Team Member</div>
              <div className="exp-company">IEEE Student Branch</div>
              <ul className="exp-points">
                <li>
                  Organized and executed workshops to help freshers understand
                  programming languages and core computer science concepts.
                </li>
              </ul>
            </div>
            <div className="exp-logo logo-ieee">IEEE</div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="section section-alt" id="contact">
        <div className="section-title">
          <Icon name="mail" />
          <span>Contact</span>
        </div>
        <div className="contact-grid">
          {[
            { icon: "mail", label: "Email", value: "anshul10777@gmail.com" },
            { icon: "phone", label: "Phone", value: "+91-787-644-4745" },
            { icon: "location", label: "Location", value: "Chandigarh, India" },
            // { icon: "linkedin", label: "LinkedIn", value: "linkedin.com/in/anshul-hernote-95459526a" },
          ].map((c) => (
            <div key={c.label} className="contact-card">
              <div className="contact-icon">
                <Icon name={c.icon} size={22} />
              </div>
              <div>
                <div className="contact-label">{c.label}</div>
                <div className="contact-value">{c.value}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div
          className="scroll-top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <Icon name="up" size={16} />
        </div>
      </footer>
    </div>
  );
}
