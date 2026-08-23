"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronLeft } from "lucide-react";
import {
  createDraftOrder,
  getDraftOrder,
  setOrderItems,
  type OrderItemInput,
} from "@/app/actions/orders";
import {
  BINDING_OPTIONS,
  PAPER_OPTIONS,
  formatPaise,
  type BindingType,
  type OrderPricingResult,
  type PaperGsm,
  type PrintType,
  type Sides,
} from "@/lib/pricing";
import { DRAFT_ORDER_STORAGE_KEY } from "@/lib/constants";
import FileDropzone, { type UploadItem } from "./FileDropzone";
import RazorpayCheckoutButton from "./RazorpayCheckoutButton";

type Step = "details" | "files" | "settings" | "review";

interface DetailsState {
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  shippingAddressLine1: string;
  shippingAddressLine2: string;
  shippingCity: string;
  shippingState: string;
  shippingPincode: string;
}

const EMPTY_DETAILS: DetailsState = {
  customerName: "",
  customerPhone: "",
  customerEmail: "",
  shippingAddressLine1: "",
  shippingAddressLine2: "",
  shippingCity: "",
  shippingState: "",
  shippingPincode: "",
};

export default function UploadFlow() {
  const [step, setStep] = useState<Step>("details");
  const [details, setDetails] = useState(EMPTY_DETAILS);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [orderNumber, setOrderNumber] = useState<string | null>(null);
  const [fileItems, setFileItems] = useState<UploadItem[]>([]);
  const [printType, setPrintType] = useState<PrintType>("bw");
  const [paperGsm, setPaperGsm] = useState<PaperGsm>(75);
  const [binding, setBinding] = useState<BindingType>("none");
  const [sides, setSides] = useState<Sides>("double");
  const [copies, setCopies] = useState(1);
  const [pricing, setPricing] = useState<OrderPricingResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [resuming, setResuming] = useState(true);

  // A page reload mid-flow used to permanently orphan the draft order
  // already inserted by createDraftOrder (and any files already uploaded to
  // it) — resume it from localStorage instead of silently abandoning it.
  useEffect(() => {
    const saved = window.localStorage.getItem(DRAFT_ORDER_STORAGE_KEY);
    if (!saved) {
      setResuming(false);
      return;
    }
    (async () => {
      try {
        const { id } = JSON.parse(saved) as { id: string; orderNumber: string };
        const draft = await getDraftOrder(id);
        if (draft && draft.status === "draft") {
          setOrderId(draft.id);
          setOrderNumber(draft.orderNumber);
          if (draft.files.length > 0) {
            setFileItems(
              draft.files.map((f) => ({
                localId: f.id,
                fileId: f.id,
                name: f.originalName,
                size: f.byteSize,
                status: f.status === "uploaded" ? "uploaded" : "failed",
                error: null,
                // Page counts aren't persisted per-file (only the aggregate
                // ends up on order_items once settings are submitted), so a
                // resumed file needs its page count re-entered.
                pageCount: null,
                pageCountSource: "manual",
              }))
            );
          }
          setStep("files");
        } else {
          window.localStorage.removeItem(DRAFT_ORDER_STORAGE_KEY);
        }
      } catch {
        window.localStorage.removeItem(DRAFT_ORDER_STORAGE_KEY);
      } finally {
        setResuming(false);
      }
    })();
  }, []);

  const uploadedCount = fileItems.filter((f) => f.status === "uploaded").length;
  const allReady = fileItems.length > 0 &&
    fileItems.every((f) => f.status === "uploaded" && f.pageCount !== null);
  const totalPages = useMemo(
    () => fileItems.reduce((sum, f) => sum + (f.pageCount ?? 0), 0),
    [fileItems]
  );

  async function handleDetailsSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const result = await createDraftOrder(details);
      setOrderId(result.id);
      setOrderNumber(result.orderNumber);
      window.localStorage.setItem(
        DRAFT_ORDER_STORAGE_KEY,
        JSON.stringify({ id: result.id, orderNumber: result.orderNumber })
      );
      setStep("files");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleSettingsSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!orderId) return;
    setError(null);
    setSubmitting(true);
    try {
      const anyManual = fileItems.some((f) => f.pageCountSource === "manual");
      const item: OrderItemInput = {
        printType,
        paperGsm,
        sides,
        binding,
        copies,
        pageCount: totalPages,
        pageCountSource: anyManual ? "manual" : "pdf_extracted",
      };
      const result = await setOrderItems(orderId, [item]);
      setPricing(result);
      setStep("review");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not price this order");
    } finally {
      setSubmitting(false);
    }
  }

  const availableGsm = PAPER_OPTIONS.filter(
    (p) => printType !== "color" || p.gsm !== 65
  );

  if (resuming) {
    return (
      <div className="rounded-2xl border border-border bg-surface shadow-card p-6 md:p-8 text-center text-muted">
        Checking for an order in progress…
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-border bg-surface shadow-card p-6 md:p-8">
      <StepIndicator step={step} />

      {error && (
        <p role="alert" className="mt-4 text-sm text-danger font-medium">
          {error}
        </p>
      )}

      {step === "details" && (
        <form onSubmit={handleDetailsSubmit} className="mt-6 space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Full Name">
              <input
                required
                value={details.customerName}
                onChange={(e) => setDetails({ ...details, customerName: e.target.value })}
                className="input"
              />
            </Field>
            <Field label="Mobile Number">
              <input
                required
                inputMode="numeric"
                value={details.customerPhone}
                onChange={(e) =>
                  setDetails({
                    ...details,
                    customerPhone: e.target.value.replace(/\D/g, "").slice(0, 10),
                  })
                }
                className="input"
              />
            </Field>
          </div>
          <Field label="Email (optional)">
            <input
              type="email"
              value={details.customerEmail}
              onChange={(e) => setDetails({ ...details, customerEmail: e.target.value })}
              className="input"
            />
          </Field>
          <Field label="Delivery Address">
            <input
              required
              value={details.shippingAddressLine1}
              onChange={(e) =>
                setDetails({ ...details, shippingAddressLine1: e.target.value })
              }
              placeholder="House / street / hostel / PG"
              className="input"
            />
          </Field>
          <Field label="Landmark (optional)">
            <input
              value={details.shippingAddressLine2}
              onChange={(e) =>
                setDetails({ ...details, shippingAddressLine2: e.target.value })
              }
              className="input"
            />
          </Field>
          <div className="grid sm:grid-cols-3 gap-4">
            <Field label="City">
              <input
                required
                value={details.shippingCity}
                onChange={(e) => setDetails({ ...details, shippingCity: e.target.value })}
                className="input"
              />
            </Field>
            <Field label="State">
              <input
                required
                value={details.shippingState}
                onChange={(e) => setDetails({ ...details, shippingState: e.target.value })}
                className="input"
              />
            </Field>
            <Field label="Pincode">
              <input
                required
                inputMode="numeric"
                value={details.shippingPincode}
                onChange={(e) =>
                  setDetails({
                    ...details,
                    shippingPincode: e.target.value.replace(/\D/g, "").slice(0, 6),
                  })
                }
                className="input"
              />
            </Field>
          </div>
          <button type="submit" disabled={submitting} className="btn-primary w-full">
            {submitting ? "Please wait…" : "Continue to Upload"}
          </button>
        </form>
      )}

      {step === "files" && orderId && (
        <div className="mt-6">
          <FileDropzone orderId={orderId} items={fileItems} onChange={setFileItems} />
          <div className="mt-6 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setStep("details")}
              className="text-sm font-bold text-muted hover:text-foreground flex items-center gap-1"
            >
              <ChevronLeft size={16} /> Back
            </button>
            <button
              type="button"
              disabled={!allReady}
              onClick={() => setStep("settings")}
              className="btn-primary px-8 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Continue ({uploadedCount} file{uploadedCount === 1 ? "" : "s"})
            </button>
          </div>
        </div>
      )}

      {step === "settings" && (
        <form onSubmit={handleSettingsSubmit} className="mt-6 space-y-4">
          <p className="text-sm text-muted">
            {totalPages} total page{totalPages === 1 ? "" : "s"} across{" "}
            {fileItems.length} file{fileItems.length === 1 ? "" : "s"}
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Print Type">
              <select
                value={printType}
                onChange={(e) => {
                  const val = e.target.value as PrintType;
                  setPrintType(val);
                  if (val === "color" && paperGsm === 65) setPaperGsm(75);
                }}
                className="input"
              >
                <option value="bw">Black &amp; White</option>
                <option value="color">Color</option>
              </select>
            </Field>
            <Field label="Paper GSM">
              <select
                value={paperGsm}
                onChange={(e) => setPaperGsm(Number(e.target.value) as PaperGsm)}
                className="input"
              >
                {availableGsm.map((p) => (
                  <option key={p.gsm} value={p.gsm}>
                    {p.label}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Binding">
              <select
                value={binding}
                onChange={(e) => setBinding(e.target.value as BindingType)}
                className="input"
              >
                {BINDING_OPTIONS.map((b) => (
                  <option key={b.value} value={b.value}>
                    {b.label}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Copies">
              <input
                type="number"
                min={1}
                value={copies}
                onChange={(e) => setCopies(Math.max(1, parseInt(e.target.value, 10) || 1))}
                className="input"
              />
            </Field>
          </div>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={sides === "double"}
              onChange={(e) => setSides(e.target.checked ? "double" : "single")}
              className="w-4 h-4 accent-primary"
            />
            <span className="text-sm font-bold text-foreground">Two-Sided Printing</span>
          </label>
          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={() => setStep("files")}
              className="text-sm font-bold text-muted hover:text-foreground flex items-center gap-1"
            >
              <ChevronLeft size={16} /> Back
            </button>
            <button type="submit" disabled={submitting} className="btn-primary px-8">
              {submitting ? "Calculating…" : "See Price & Pay"}
            </button>
          </div>
        </form>
      )}

      {step === "review" && pricing && orderId && orderNumber && (
        <div className="mt-6 space-y-5">
          <div className="rounded-xl bg-surface-muted px-5 py-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted">Order</span>
              <span className="font-bold text-foreground">{orderNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted">Printing Subtotal</span>
              <span className="font-bold text-foreground">
                {formatPaise(pricing.subtotalPaise)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted">
                Shipping to {pricing.shipping.zoneName} ({pricing.shipping.etaMinDays}–
                {pricing.shipping.etaMaxDays} days)
              </span>
              <span className="font-bold text-foreground">
                {formatPaise(pricing.shipping.shippingPaise)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted">Handling Fee</span>
              <span className="font-bold text-foreground">
                {formatPaise(pricing.handlingPaise)}
              </span>
            </div>
            <div className="border-t border-border pt-2 flex justify-between items-baseline">
              <span className="font-bold text-foreground">Total</span>
              <span className="text-xl font-black text-primary">
                {formatPaise(pricing.totalPaise)}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => setStep("settings")}
              className="text-sm font-bold text-muted hover:text-foreground flex items-center gap-1"
            >
              <ChevronLeft size={16} /> Back
            </button>
          </div>

          <RazorpayCheckoutButton orderId={orderId} totalPaise={pricing.totalPaise} />
        </div>
      )}
    </div>
  );
}

function StepIndicator({ step }: { step: Step }) {
  const steps: { key: Step; label: string }[] = [
    { key: "details", label: "Details" },
    { key: "files", label: "Upload" },
    { key: "settings", label: "Print Settings" },
    { key: "review", label: "Pay" },
  ];
  const currentIndex = steps.findIndex((s) => s.key === step);

  return (
    <div className="flex items-center gap-2">
      {steps.map((s, i) => (
        <div key={s.key} className="flex items-center gap-2 flex-1">
          <div
            className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
              i <= currentIndex
                ? "bg-primary text-primary-foreground"
                : "bg-surface-muted text-muted"
            }`}
          >
            {i + 1}
          </div>
          <span
            className={`text-xs font-bold hidden sm:inline ${
              i <= currentIndex ? "text-foreground" : "text-muted"
            }`}
          >
            {s.label}
          </span>
          {i < steps.length - 1 && (
            <div
              className={`flex-1 h-0.5 ${i < currentIndex ? "bg-primary" : "bg-border"}`}
            />
          )}
        </div>
      ))}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-sm font-bold text-foreground mb-1.5">{label}</span>
      {children}
    </label>
  );
}
