import { useContext } from "../../core/context/runtime.js";
import { extractMainMessage } from "../../utils/filter_error_message.js";
import { marked } from "marked";
import { readFile, writeFile, ensureFile, remove } from "../../utils/fs.js";
import PathBox from "../../assets/path/path_react.js";
import config_json from "../../assets/config.json" with { type: "json" };

export async function BuildDocPage() {
  const { operation_state } = useContext();
  const { nizam_Instructions_path, nizam_doc_html } = PathBox();

  const list_of_ids: String[] = [];
  const list_of_names: String[] = [];
  const mdContent = await readFile(nizam_Instructions_path, "utf-8");

  try {
    const html = mdContent
      .split("\n")
      .map((line) => {
        if (/^##\s+[^#]/.test(line)) {
          const section_name = line.replace(/^##\s+/, " ");
          const section_id = line
            .replace(/^##\s+/, "")
            .replaceAll(" ", "_")
            .replace(/[^a-zA-Z0-9_]+/g, "")
            .toLowerCase();
          list_of_names.push(section_name);
          list_of_ids.push(section_id);
          return `<h2 id="${section_id}">${section_name}</h2>`;
        }
        return line;
      })
      .join("\n");

    const tokens = marked.lexer(html);
    tokens.forEach((token) => {
      if (token.type === "blockquote") {
        const text = token.text.trim();

        let innerHtml = marked.parser(
          marked.lexer(
            text
              .replace(/\[!(TIP|NOTE|IMPORTANT|WARNING|CAUTION)\]/i, "")
              .trim(),
          ),
        );

        if (/^\[!TIP\]/i.test(text)) {
          token.type = "html";
          token.text = `<div class="alert alert-tip"> <span class="icon"><svg class="octicon octicon-light-bulb " viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path d="M8 1.5c-2.363 0-4 1.69-4 3.75 0 .984.424 1.625.984 2.304l.214.253c.223.264.47.556.673.848.284.411.537.896.621 1.49a.75.75 0 0 1-1.484.211c-.04-.282-.163-.547-.37-.847a8.456 8.456 0 0 0-.542-.68c-.084-.1-.173-.205-.268-.32C3.201 7.75 2.5 6.766 2.5 5.25 2.5 2.31 4.863 0 8 0s5.5 2.31 5.5 5.25c0 1.516-.701 2.5-1.328 3.259-.095.115-.184.22-.268.319-.207.245-.383.453-.541.681-.208.3-.33.565-.37.847a.751.751 0 0 1-1.485-.212c.084-.593.337-1.078.621-1.489.203-.292.45-.584.673-.848.075-.088.147-.173.213-.253.561-.679.985-1.32.985-2.304 0-2.06-1.637-3.75-4-3.75ZM5.75 12h4.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1 0-1.5ZM6 15.25a.75.75 0 0 1 .75-.75h2.5a.75.75 0 0 1 0 1.5h-2.5a.75.75 0 0 1-.75-.75Z"></path></svg> Tip</span> ${innerHtml}</div>`;
        } else if (/^\[!NOTE\]/i.test(text)) {
          token.type = "html";
          token.text = `<div class="alert alert-note"> <span class="icon"> <svg class="octicon octicon-info " viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8Zm8-6.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13ZM6.5 7.75A.75.75 0 0 1 7.25 7h1a.75.75 0 0 1 .75.75v2.75h.25a.75.75 0 0 1 0 1.5h-2a.75.75 0 0 1 0-1.5h.25v-2h-.25a.75.75 0 0 1-.75-.75ZM8 6a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"></path></svg> Note</span> ${innerHtml}</div>`;
        } else if (/^\[!IMPORTANT\]/i.test(text)) {
          token.type = "html";
          token.text = `<div class="alert alert-important"> <span class="icon"><svg class="octicon octicon-report " viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path d="M0 1.75C0 .784.784 0 1.75 0h12.5C15.216 0 16 .784 16 1.75v9.5A1.75 1.75 0 0 1 14.25 13H8.06l-2.573 2.573A1.458 1.458 0 0 1 3 14.543V13H1.75A1.75 1.75 0 0 1 0 11.25Zm1.75-.25a.25.25 0 0 0-.25.25v9.5c0 .138.112.25.25.25h2a.75.75 0 0 1 .75.75v2.19l2.72-2.72a.749.749 0 0 1 .53-.22h6.5a.25.25 0 0 0 .25-.25v-9.5a.25.25 0 0 0-.25-.25Zm7 2.25v2.5a.75.75 0 0 1-1.5 0v-2.5a.75.75 0 0 1 1.5 0ZM9 9a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"></path></svg> Important</span> ${innerHtml}</div>`;
        } else if (/^\[!WARNING\]/i.test(text)) {
          token.type = "html";
          token.text = `<div class="alert alert-warning"> <span class="icon"><svg class="octicon octicon-alert " viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path d="M6.457 1.047c.659-1.234 2.427-1.234 3.086 0l6.082 11.378A1.75 1.75 0 0 1 14.082 15H1.918a1.75 1.75 0 0 1-1.543-2.575Zm1.763.707a.25.25 0 0 0-.44 0L1.698 13.132a.25.25 0 0 0 .22.368h12.164a.25.25 0 0 0 .22-.368Zm.53 3.996v2.5a.75.75 0 0 1-1.5 0v-2.5a.75.75 0 0 1 1.5 0ZM9 11a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"></path></svg> Warning</span> ${innerHtml}</div>`;
        } else if (/^\[!CAUTION\]/i.test(text)) {
          token.type = "html";
          token.text = `<div class="alert alert-caution"> <span class="icon"><svg class="octicon octicon-stop " viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path d="M4.47.22A.749.749 0 0 1 5 0h6c.199 0 .389.079.53.22l4.25 4.25c.141.14.22.331.22.53v6a.749.749 0 0 1-.22.53l-4.25 4.25A.749.749 0 0 1 11 16H5a.749.749 0 0 1-.53-.22L.22 11.53A.749.749 0 0 1 0 11V5c0-.199.079-.389.22-.53Zm.84 1.28L1.5 5.31v5.38l3.81 3.81h5.38l3.81-3.81V5.31L10.69 1.5ZM8 4a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 8 4Zm0 8a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"></path></svg> Caution</span> ${innerHtml}</div>`;
        }
      }
    });
    const htmlBody = marked.parser(tokens);

    const fullHTML = `
<!doctype html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>nizam - documentation</title>
  <link rel="icon" type="image/svg+xml" href="./favicon.svg" />
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/github-markdown-css@5.8.1/github-markdown-dark.css" />
  <style>
    /* -----------------
==> main
--------------------*/
    :root {
      --color-bg: #0e0e0e;
      --color-main: #2b3e4c;
      --color-main-light: rgba(43, 62, 76, 0.738);
      --color-white-f: #ffffff20;
      --color-white-s: #ffffffb3;
      --color-white-t: #ffffff15;
    }

    body {
      background-color: var(--color-bg);
      padding: 0;
      margin: 0;
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      overflow: hidden;
      font-family: sans-serif;
    }

    ::-webkit-scrollbar {
      width: 12px;
    }

    ::-webkit-scrollbar-track {
      border-left: 2px dashed var(--color-white-f);
    }

    ::-webkit-scrollbar-thumb {
      cursor: pointer;
      background-color: var(--color-white-f);
      border: 1px dotted var(--color-white-f);
    }

    ::-webkit-scrollbar-thumb:hover {
      opacity: 80%;
    }

    .shadow-one {
      width: 20rem;
      height: 20rem;
      background-color: var(--color-main);
      position: absolute;
      bottom: 0;
      right: 0;
      z-index: 1;
      border-radius: 50%;
      filter: blur(100px);
      opacity: 60%;
    }

    .shadow-two {
      width: 20rem;
      height: 20rem;
      background-color: var(--color-main);
      position: absolute;
      top: 0;
      left: 10%;
      z-index: 1;
      border-radius: 50%;
      filter: blur(100px);
      opacity: 60%;
    }

    .bg-noise {
      position: absolute;
      inset: -200%;
      z-index: 2;
      width: 400%;
      height: 400%;
      background-image: url(./assets/images/layer.png);
      animation: diagonal-move 0.9s linear infinite;
      opacity: 6%;
      will-change: transform;
      overflow: hidden;
    }

    .owner-box {
      width: 3rem;
      height: 3rem;
      border: 1px solid var(--color-white-f);
      background-color: var(--color-bg);
      border-radius: 4px;
      position: absolute;
      z-index: 100;
      bottom: 15px;
      right: 15px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      padding: 8px;
      box-sizing: border-box;
      transition: 0.1s all;
    }

    .owner-box:hover {
      opacity: 80%;
    }

    main {
      width: 97.5vw;
      height: 97.5vh;
      overflow: hidden;
      display: flex;
      color: wheat;
      border: 2px dashed var(--color-white-f);
      position: relative;
      z-index: 3;
    }

    .main-left,
    .main-right {
      height: 100%;
    }

    /* -----------------
==> main-left
--------------------*/
    .main-left {
      width: 25%;
      border-right: 2px dashed var(--color-white-f);
    }

    .main-left .main-left-logo {
      border-bottom: 2px dashed var(--color-white-f);
      padding: 15px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .main-left-logo img {
      width: 5rem;
      opacity: 90%;
    }

    .main-left-logo span {
      margin-top: 0.1rem;
      color: var(--color-white-s);
      font-size: 0.85rem;
      opacity: 80%;
    }

    .main-left .ids-list {
      height: 100%;
      position: relative;
    }

    .ids-list-shadow-top,
    .ids-list-shadow-bottom {
      width: 100%;
      height: 10rem;
      position: absolute;
      left: 0;
      opacity: 50%;
      pointer-events: none;
    }

    .ids-list-shadow-top {
      top: 0;
      background: linear-gradient(to bottom,
          var(--color-white-f),
          rgba(255, 255, 255, 0));
    }

    .ids-list-shadow-bottom {
      bottom: 5%;
      background: linear-gradient(to top,
          var(--color-white-f),
          rgba(255, 255, 255, 0));
    }

    .main-left .ids-list .list-contant {
      height: 100%;
      padding: 0px 0px 10px 0;
      overflow: auto;
    }

    .main-left .ids-list span:before {
      content: "= >";
      font-size: 0.8rem;
      color: var(--color-white-f);
      margin-right: 8px;
      font-weight: 700;
    }

    .main-left .ids-list span {
      display: block;
      margin-top: 0.3rem;
      margin-bottom: 0.6rem;
      padding: 0.8rem 0;
      font-size: 1rem;
      font-family: sans-serif;
      color: var(--color-white-s);
      cursor: pointer;
      text-transform: capitalize;
      transition: 0.2s all;
      border-top: 2px dashed var(--color-white-t);
      border-bottom: 2px dashed var(--color-white-t);
    }

    .main-left .ids-list span:last-child {
      margin-bottom: 4rem;
    }

    .main-left .ids-list span:hover,
    .main-left .ids-list span.active {
      background-color: var(--color-white-f);
    }

    /* -----------------
==> main-right
--------------------*/
    .main-right {
      width: 75%;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .main-right-shadow-top,
    .main-right-shadow-bottom {
      width: 100%;
      height: 8rem;
      position: absolute;
      opacity: 60%;
      pointer-events: none;
    }

    .main-right-shadow-top {
      top: 0;
      background: linear-gradient(to bottom,
          var(--color-white-f),
          rgba(255, 255, 255, 0));
    }

    .main-right-shadow-bottom {
      bottom: 0;
      background: linear-gradient(to top,
          var(--color-white-f),
          rgba(255, 255, 255, 0));
    }

    .main-right .main-right-box {
      width: 100%;
      height: 100%;
      overflow: auto;
      padding: 4px;
      background-color: var(--color-white-f);
    }

    .markdown-body {
      box-sizing: border-box;
      padding: 30px;
    }

    /* Make images scale */
    .markdown-body img {
      max-width: 100%;
      height: auto;
    }

    /* Make tables scrollable on small devices */
    .markdown-body table {
      display: block;
      width: 100%;
      overflow-x: auto;
    }

    /* Responsive font size */
    .markdown-body {
      font-size: clamp(14px, 2vw, 18px);
    }

    /* Copy button */
    .copy-btn {
      color: #9198a1;
      padding: 6px 10px;
      border-radius: 4px;
      background-color: #212830;
      border: 1px solid #3d444d;
      text-transform: uppercase;
      font-weight: bold;
    }

    .copy-btn:hover {
      background: #444c567f;
    }

    /* Alerts */
    .alert {
      padding: 0px 15px;
      border-left: 3.2px solid;
      font-family: sans-serif;
      font-size: 1rem;
    }

    .alert .icon {
      font-size: 0.85em;
      flex-shrink: 0;
    }

    .alert-note {
      border-color: #4493f8;
      color: #f0f6fc;
    }

    .alert-tip {
      border-color: #3fb950;
      color: #f0f6fc;
    }

    .alert-important {
      border-color: #ab7df8;
      color: #f0f6fc;
    }

    .alert-warning {
      border-color: #d29922;
      color: #f0f6fc;
    }

    .alert-caution {
      border-color: #f85149;
      color: #f0f6fc;
    }

    .alert-note .icon {
      color: #4493f8;
    }

    .alert-tip .icon {
      color: #3fb950;
    }

    .alert-important .icon {
      color: #ab7df8;
    }

    .alert-warning .icon {
      color: #d29922;
    }

    .alert-caution .icon {
      color: #f85149;
    }

    /* -----------------
==> key frames
--------------------*/
    @keyframes diagonal-move {
      0% {
        transform: translate(20%, -20%);
      }

      50% {
        transform: translate(-20%, 20%);
      }

      100% {
        transform: translate(20%, -20%);
      }
    }

    /* -----------------
==> Media Queries
--------------------*/
    /* sm */
    @media (max-width: 576px) {
      .main-left {
        display: none;
      }

      .main-right {
        width: 100%;
      }

      .markdown-body {
        padding: 15px;
      }
    }

    /* md */
    @media (min-width: 577px) and (max-width: 768px) {
      ::-webkit-scrollbar {
        width: 8px;
      }

      .main-left-logo img {
        width: 3.5rem;
      }

      .markdown-body {
        padding: 15px;
      }
    }

    /* lg */
    @media (min-width: 769px) and (max-width: 992px) {
      ::-webkit-scrollbar {
        width: 10px;
      }

      .main-left-logo img {
        width: 4rem;
      }
    }

    /* xl */
    @media (min-width: 993px) {}
  </style>
</head>

<body>
  <main>
    <div class="main-left">
      <div class="main-left-logo">
        <img src="./assets/images/logo.png" alt="nizam logo" />
        <span>v${config_json.app_info.version}</span>
      </div>
      <div class="ids-list">
        <div class="ids-list-shadow-top"></div>
        <div class="ids-list-shadow-bottom"></div>
        <div class="list-contant">
          ${list_of_ids
            .map(
              (name, i) =>
                `<span class="id_clicker" onclick="goToId('${name}')">${list_of_names[i]}</span>`,
            )
            .join("")}
        </div>
      </div>
    </div>
    <div class="main-right">
      <div class="main-right-shadow-top"></div>
      <div class="main-right-shadow-bottom"></div>
      <div class="main-right-box">
        <article class="markdown-body">${htmlBody}</article>
      </div>
    </div>
  </main>
  <div>
    <div class="bg-noise"></div>
    <div class="shadow-one"></div>
    <div class="shadow-two"></div>
  </div>
   <a href="https://ahmedabdalalim.pages.dev/" target="_blank" class="owner-box">
    <img src="https://raw.githubusercontent.com/ahmed-abd-alalim/ahmed-abd-alalim/main/assets/3A.png" alt="3A"
      width="100%" />
  </a>
  
  <!-- Clipboard.js library -->
  <script src="https://cdn.jsdelivr.net/npm/clipboard@2.0.11/dist/clipboard.min.js"></script>
  <script>
    document.addEventListener("DOMContentLoaded", () => {
      document.querySelectorAll("pre > code").forEach((codeBlock) => {
        const button = document.createElement("button");
        button.innerText = "Copy";
        button.className = "copy-btn";
        codeBlock.parentNode.style.position = "relative";
        button.style.position = "absolute";
        button.style.top = "10px";
        button.style.right = "10px";
        button.style.fontSize = "12px";
        button.style.cursor = "pointer";
        codeBlock.parentNode.appendChild(button);

        new ClipboardJS(button, {
          target: () => codeBlock,
        });

        button.addEventListener("click", () => {
          button.innerText = "Copied!";
          setTimeout(() => (button.innerText = "Copy"), 1000);
        });
      });
    });
    function goToId(id) {
      const container = document.querySelector(".main-right-box");
      const el = document.getElementById(id);
      el.classList.toggle("active");

      if (!el) return;

      container.scrollTo({
        top: el.offsetTop - container.offsetTop - 25,
        behavior: "smooth",
      });
    }

    document.querySelector(".list-contant").addEventListener("click", function (e) {
      const item = e.target.closest(".id_clicker");
      if (!item) return;
      this.querySelectorAll(".active").forEach(el => el.classList.remove("active"));
      item.classList.add("active");
    });
  </script>
</body>

</html>
`;

    await ensureFile(nizam_doc_html);
    await writeFile(nizam_doc_html, fullHTML, "utf-8");
    await remove(nizam_Instructions_path);

    operation_state.build_nizam_doc_html.status = "success";
  } catch (err) {
    operation_state.build_nizam_doc_html.status = "fatal";
    operation_state.build_nizam_doc_html.error_message =
      extractMainMessage(err);
  }
}
