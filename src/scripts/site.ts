import { animate, inView } from "motion";

export function initSite() {
  const root = document.documentElement;
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  const systemTheme = matchMedia("(prefers-color-scheme: dark)");
  const read = (key: string) => {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  };
  const save = (key: string, value: string) => {
    try {
      localStorage.setItem(key, value);
    } catch {
      /* Preferences still work for this page when storage is unavailable. */
    }
  };
  const notify = () =>
    document.dispatchEvent(new Event("codeview:preferences"));

  const sync = () => {
    const dark = root.dataset.theme === "dark";
    const paused = root.dataset.motion === "paused";
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", dark ? "#090D24" : "#F7F8FC");
    document.querySelectorAll("[data-theme-toggle]").forEach((button) => {
      button.setAttribute(
        "aria-label",
        `Switch to ${dark ? "light" : "dark"} theme`,
      );
      button.setAttribute("aria-pressed", String(dark));
    });
    document
      .querySelectorAll<HTMLButtonElement>("[data-motion-toggle]")
      .forEach((button) => {
        button.setAttribute("aria-pressed", String(paused));
        button.disabled = reduced.matches;
        button.querySelector("[data-motion-label]")!.textContent =
          reduced.matches
            ? "Reduced motion"
            : paused
              ? "Resume motion"
              : "Pause motion";
      });
    notify();
  };
  document.querySelectorAll("[data-theme-toggle]").forEach((button) =>
    button.addEventListener("click", () => {
      root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
      save("codeview-theme", root.dataset.theme);
      sync();
    }),
  );
  document.querySelectorAll("[data-motion-toggle]").forEach((button) =>
    button.addEventListener("click", () => {
      if (reduced.matches) return;
      root.dataset.motion =
        root.dataset.motion === "paused" ? "running" : "paused";
      save("codeview-motion", root.dataset.motion);
      document
        .getAnimations()
        .forEach((animation) =>
          root.dataset.motion === "paused"
            ? animation.pause()
            : animation.play(),
        );
      sync();
    }),
  );
  systemTheme.addEventListener("change", () => {
    if (!["light", "dark"].includes(read("codeview-theme") || "")) {
      root.dataset.theme = systemTheme.matches ? "dark" : "light";
      sync();
    }
  });
  reduced.addEventListener("change", () => {
    root.dataset.motion =
      reduced.matches || read("codeview-motion") === "paused"
        ? "paused"
        : "running";
    if (reduced.matches)
      document.getAnimations().forEach((animation) => {
        if (animation.effect?.getTiming().iterations === Infinity)
          animation.pause();
        else animation.finish();
      });
    sync();
  });

  const menu = document.querySelector<HTMLButtonElement>("[data-menu-toggle]");
  const header = document.querySelector(".header");
  const closeMenu = () => {
    header?.classList.remove("is-open");
    menu?.setAttribute("aria-expanded", "false");
    menu?.setAttribute("aria-label", "Open navigation");
  };
  menu?.addEventListener("click", () => {
    const open = menu.getAttribute("aria-expanded") !== "true";
    header?.classList.toggle("is-open", open);
    menu.setAttribute("aria-expanded", String(open));
    menu.setAttribute(
      "aria-label",
      open ? "Close navigation" : "Open navigation",
    );
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && header?.classList.contains("is-open")) {
      closeMenu();
      menu?.focus();
    }
  });
  document
    .querySelectorAll(".mobile-nav a")
    .forEach((link) => link.addEventListener("click", closeMenu));
  matchMedia("(min-width: 761px)").addEventListener("change", (event) => {
    if (event.matches) closeMenu();
  });

  const captions: Record<string, string> = {
    experience:
      "Can people find what they need and get in touch easily? That’s often the first thing to fix.",
    workflow:
      "What does your team do by hand every day? There’s usually a simpler way.",
    systems:
      "Are your tools talking to each other? Connecting them saves time and prevents mistakes.",
  };
  document
    .querySelectorAll<HTMLElement>("[data-connections]")
    .forEach((diagram) => {
      diagram
        .querySelectorAll<HTMLButtonElement>("[data-connection]")
        .forEach((button) =>
          button.addEventListener("click", () => {
            const choice = button.dataset.connection!;
            if (!captions[choice]) return;
            diagram.dataset.active = choice;
            diagram
              .querySelectorAll("[data-connection]")
              .forEach((item) =>
                item.setAttribute("aria-pressed", String(item === button)),
              );
            const caption = diagram.querySelector<HTMLElement>(
              "[data-connection-caption]",
            )!;
            caption.textContent = captions[choice];
            if (root.dataset.motion !== "paused")
              animate(
                caption,
                { opacity: [0.5, 1], y: [4, 0] },
                { duration: 0.35 },
              );
          }),
        );
    });

  root.dataset.js = "ready";
  sync();
  initFields(root);
  inView(".journey", (element) => {
    if (root.dataset.motion !== "paused")
      (element as HTMLElement).dataset.journeyState = "playing";
  }, { amount: 0.7 });
  inView("[data-connections]", (element) => {
    if (root.dataset.motion !== "paused")
      (element as HTMLElement).dataset.connectionsState = "playing";
  }, { amount: 0.5 });
  if (root.dataset.motion !== "paused") {
    animate(
      ".hero h1",
      { y: [18, 0], opacity: [0.65, 1], filter: ["blur(3px)", "blur(0px)"] },
      { duration: 1.05, ease: [0.16, 1, 0.3, 1] },
    );
    inView(
      "[data-reveal]",
      (element) => {
        if (root.dataset.motion === "paused") return;
        animate(
          element,
          { y: [20, 0], opacity: [0.65, 1] },
          { duration: 0.85, ease: [0.16, 1, 0.3, 1] },
        );
      },
      { margin: "0px 0px -60px 0px" },
    );
  }
}

function initFields(root: HTMLElement) {
  document
    .querySelectorAll<HTMLCanvasElement>("[data-flow-field]")
    .forEach((canvas) => {
      const context = canvas.getContext("2d");
      if (!context) return;
      const ctx = context;
      const host = canvas.parentElement!;
      const region = host.parentElement!;
      let width = 0,
        height = 0,
        frame = 0,
        lastFrame = 0,
        visible = false,
        elapsed = 0;
      let pointerX = 0,
        pointerY = 0,
        targetX = 0,
        targetY = 0;
      let color = "",
        bright = "";
      const allowed = () =>
        visible && !document.hidden && root.dataset.motion !== "paused";
      const palette = () => {
        const style = getComputedStyle(root);
        color = style.getPropertyValue("--field-rgb").trim();
        bright = style.getPropertyValue("--field-bright-rgb").trim();
      };
      const point = (t: number, strand: number) => {
        const q = strand / 35;
        const angle = -2.8 + t * 5.6;
        return [
          width * (0.69 + (0.26 + q * 0.16) * Math.cos(angle)) +
            Math.sin(t * 7 + elapsed * 0.00011 + q * 2) * width * 0.035 +
            pointerX * width * 0.018 * Math.sin(t * Math.PI),
          height * (0.51 + (0.5 - q * 0.18) * Math.sin(angle)) +
            Math.cos(t * 5 + elapsed * 0.00009 + q) * height * 0.025 +
            pointerY * height * 0.018,
        ];
      };
      const draw = () => {
        ctx.clearRect(0, 0, width, height);
        const glow = ctx.createRadialGradient(
          width * 0.87,
          height * 0.43,
          0,
          width * 0.87,
          height * 0.43,
          width * 0.62,
        );
        glow.addColorStop(0, `rgba(${color}, .14)`);
        glow.addColorStop(1, `rgba(${color}, 0)`);
        ctx.fillStyle = glow;
        ctx.fillRect(0, 0, width, height);
        for (let strand = 0; strand < 36; strand++) {
          ctx.beginPath();
          for (let i = 0; i <= 100; i++) {
            const [x, y] = point(i / 100, strand);
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.strokeStyle = `rgba(${strand % 6 === 0 ? bright : color}, ${strand % 6 === 0 ? 0.65 : 0.3})`;
          ctx.lineWidth = strand % 6 === 0 ? 1.1 : 0.65;
          ctx.stroke();
        }
        for (let i = 0; i < 9; i++) {
          const t = (elapsed * 0.000018 + i / 9) % 1;
          const [x, y] = point(t, i * 4);
          ctx.beginPath();
          ctx.arc(x, y, 1.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${bright}, .7)`;
          ctx.fill();
        }
        host.classList.add("is-ready");
      };
      const tick = (now: number) => {
        frame = 0;
        if (!allowed()) {
          lastFrame = 0;
          return;
        }
        if (now - lastFrame >= 32) {
          elapsed += lastFrame ? Math.min(now - lastFrame, 60) : 32;
          lastFrame = now;
          pointerX += (targetX - pointerX) * 0.06;
          pointerY += (targetY - pointerY) * 0.06;
          draw();
        }
        frame = requestAnimationFrame(tick);
      };
      const update = () => {
        palette();
        if (!allowed()) {
          cancelAnimationFrame(frame);
          frame = 0;
          lastFrame = 0;
          draw();
        } else if (!frame) frame = requestAnimationFrame(tick);
      };
      const resize = () => {
        width = host.clientWidth;
        height = host.clientHeight;
        const ratio = Math.min(devicePixelRatio || 1, 1.5);
        canvas.width = Math.round(width * ratio);
        canvas.height = Math.round(height * ratio);
        ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
        update();
      };
      new ResizeObserver(resize).observe(host);
      new IntersectionObserver(
        (entries) => {
          visible = entries[0].isIntersecting;
          update();
        },
        { rootMargin: "50px" },
      ).observe(host);
      document.addEventListener("visibilitychange", update);
      document.addEventListener("codeview:preferences", update);
      region.addEventListener("pointermove", (event) => {
        if (event.pointerType !== "mouse" || root.dataset.motion === "paused")
          return;
        const bounds = region.getBoundingClientRect();
        targetX = (event.clientX - bounds.left) / bounds.width - 0.5;
        targetY = (event.clientY - bounds.top) / bounds.height - 0.5;
      });
      region.addEventListener("pointerleave", () => {
        targetX = targetY = 0;
      });
      palette();
      resize();
    });
}
