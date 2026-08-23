import { ImageResponse } from "next/og";
import { SITE_TAGLINE } from "@/lib/siteConfig";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
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
          backgroundColor: "#1e2a5e",
          backgroundImage:
            "radial-gradient(circle at 85% 20%, rgba(43,191,166,0.35), transparent 45%)",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 40 }}>
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: "9999px",
              backgroundColor: "#2bbfa6",
              display: "flex",
            }}
          />
          <div style={{ fontSize: 40, fontWeight: 900, color: "#ffffff", display: "flex" }}>
            Cinchfile
          </div>
        </div>
        <div
          style={{
            fontSize: 64,
            fontWeight: 900,
            color: "#ffffff",
            lineHeight: 1.1,
            maxWidth: 920,
            display: "flex",
          }}
        >
          {SITE_TAGLINE}
        </div>
        <div
          style={{
            fontSize: 30,
            color: "rgba(255,255,255,0.75)",
            marginTop: 28,
            maxWidth: 820,
            display: "flex",
          }}
        >
          Upload PDFs, choose paper &amp; binding, get doorstep delivery across India.
        </div>
        <div style={{ display: "flex", gap: 20, marginTop: 48 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "12px 24px",
              borderRadius: 9999,
              backgroundColor: "rgba(255,255,255,0.1)",
              color: "#ffffff",
              fontSize: 24,
              fontWeight: 700,
            }}
          >
            B&amp;W ₹0.48/page
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "12px 24px",
              borderRadius: 9999,
              backgroundColor: "#2bbfa6",
              color: "#06251f",
              fontSize: 24,
              fontWeight: 700,
            }}
          >
            Color ₹1/page
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
