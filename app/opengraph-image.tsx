import { ImageResponse } from "next/og"
import { readFile } from "node:fs/promises"
import { join } from "node:path"
import { SITE_SHORT_NAME } from "@/lib/seo"

export const alt = "Perihelion Growth | B2B Lead Generation Agency"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

// A share card that actually spells the brand out. The previous setup pushed a
// 512x512 logo through a `summary` card, so the brand name never appeared in
// the preview at all.
export default async function OpenGraphImage() {
  const logo = await readFile(
    join(process.cwd(), "public", "perihelion-logo-dark.png"),
  )
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#0b1225",
          backgroundImage:
            "radial-gradient(ellipse 90% 60% at 50% 0%, rgba(251,146,60,0.22) 0%, rgba(11,18,37,0) 70%)",
          color: "#f8fafc",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoSrc} width={96} height={96} alt="" />
          <div style={{ fontSize: 56, fontWeight: 800, letterSpacing: "-0.02em" }}>
            {SITE_SHORT_NAME}
          </div>
        </div>

        {/* Satori needs an explicit display on any element with more than one
            child, so the two-tone headline is two stacked lines. */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "48px",
            fontSize: 64,
            fontWeight: 800,
            lineHeight: 1.15,
            letterSpacing: "-0.03em",
            maxWidth: "940px",
          }}
        >
          <div>We book the sales calls.</div>
          <div style={{ color: "#fb923c" }}>You only pay when they happen.</div>
        </div>

        <div
          style={{
            marginTop: "36px",
            fontSize: 28,
            color: "#94a3b8",
            letterSpacing: "-0.01em",
          }}
        >
          B2B lead generation · Pay per qualified call held · No retainers
        </div>
      </div>
    ),
    size,
  )
}
