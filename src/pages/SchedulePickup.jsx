import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import {
  useGsapFloatAccents,
  useGsapScrollReveal,
} from "@/hooks/useGsapPageAnimations";
import { toast } from "sonner";
import { Loader2, CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createBooking } from "@/lib/api";
import { BRAND, PRICING, PICKUP_WINDOWS, SERVICE_TYPES } from "@/lib/brand";

const tomorrowIso = () => {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().slice(0, 10);
};

export default function SchedulePickup() {
  const { hash } = useLocation();
  const pageRef = useRef(null);
  const reduceMotion = useReducedMotion() === true;
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zip_code: "",
    pickup_date: tomorrowIso(),
    pickup_window: PICKUP_WINDOWS[1],
    service_type: "wash_fold",
    weight_estimate: "",
    special_instructions: "",
  });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  useGsapScrollReveal(pageRef, reduceMotion, { extraDeps: [done] });
  useGsapFloatAccents(pageRef, reduceMotion, [done]);

  useEffect(() => {
    if (hash === "#pickup-form") {
      document
        .getElementById("pickup-form")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [hash, done]);

  const change = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    const required = [
      "name",
      "email",
      "phone",
      "address",
      "city",
      "zip_code",
      "pickup_date",
      "pickup_window",
      "service_type",
    ];
    for (const k of required) {
      if (!form[k]) {
        toast.error(`Please complete: ${k.replace(/_/g, " ")}`);
        return;
      }
    }
    try {
      setLoading(true);
      await createBooking(form);
      setDone(true);
      toast.success(
        "We received your pickup request. You should get a confirmation email shortly.",
      );
    } catch (err) {
      toast.error(
        err?.message || "Couldn't submit your pickup. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  if (done) {
    return (
      <motion.section
        ref={pageRef}
        className="section container-pad"
        data-testid="schedule-success"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          className="max-w-xl mx-auto text-center rounded-[2rem] border border-slate-200/90 bg-white/90 backdrop-blur-sm p-10 md:p-14 shadow-xl shadow-slate-900/10 ring-1 ring-white/60"
          data-reveal-scale
        >
          <span
            className="mx-auto inline-flex text-blue-700 will-change-transform"
            data-reveal-spin
          >
            <CheckCircle2 className="h-14 w-14" />
          </span>
          <h1 className="h2 mt-6">You're all set!</h1>
          <p className="mt-4 text-slate-600 text-lg">
            You asked for <strong>{form.pickup_date}</strong> between{" "}
            <strong>{form.pickup_window}</strong>. We&apos;ll confirm your pickup
            at <strong>{form.email}</strong> when we process your request.
          </p>
          <p className="mt-2 text-sm text-slate-500">
            Questions? Call {BRAND.phoneBergen}.
          </p>
          <button
            type="button"
            className="btn-primary mt-8"
            onClick={() => {
              setDone(false);
              setForm((prev) => ({ ...prev, pickup_date: tomorrowIso() }));
            }}
            data-testid="schedule-another"
          >
            Schedule another
          </button>
        </div>
      </motion.section>
    );
  }

  return (
    <motion.section
      ref={pageRef}
      className="section container-pad"
      data-testid="schedule-pickup-page"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="max-w-3xl mx-auto">
        <div data-reveal-blur>
          <p className="overline mb-4">Bergen Laundry Service</p>
          <h1 className="h1">Schedule a pickup.</h1>
          <span
            className="mt-4 block h-1.5 w-24 rounded-full bg-gradient-to-r from-blue-600 to-sky-400"
            data-reveal-line
            aria-hidden
          />
          <p className="mt-5 text-slate-600 text-lg max-w-xl">
            Takes about a minute. We&apos;ll confirm by email and arrive during
            your chosen window. {PRICING.minOrderLbs} lb minimum on wash &amp;
            fold; {PRICING.ccFeeNote.toLowerCase()}.
          </p>
        </div>

        <form
          id="pickup-form"
          onSubmit={submit}
          className="mt-8 surface-card p-6 md:p-8 space-y-5"
          data-testid="schedule-form"
          data-reveal-scale
        >
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <Label>Full name</Label>
              <Input
                name="name"
                value={form.name}
                onChange={change}
                className="mt-2"
                data-testid="sch-name"
              />
            </div>
            <div>
              <Label>Email</Label>
              <Input
                type="email"
                name="email"
                value={form.email}
                onChange={change}
                className="mt-2"
                data-testid="sch-email"
              />
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <Label>Phone</Label>
              <Input
                name="phone"
                value={form.phone}
                onChange={change}
                className="mt-2"
                data-testid="sch-phone"
              />
            </div>
            <div>
              <Label>ZIP code</Label>
              <Input
                name="zip_code"
                value={form.zip_code}
                onChange={change}
                className="mt-2"
                data-testid="sch-zip"
              />
            </div>
          </div>
          <div>
            <Label>Pickup address</Label>
            <Input
              name="address"
              value={form.address}
              onChange={change}
              placeholder="Street, apt, etc."
              className="mt-2"
              data-testid="sch-address"
            />
          </div>
          <div>
            <Label>City</Label>
            <Input
              name="city"
              value={form.city}
              onChange={change}
              className="mt-2"
              data-testid="sch-city"
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <Label>Pickup date</Label>
              <Input
                type="date"
                name="pickup_date"
                value={form.pickup_date}
                onChange={change}
                className="mt-2"
                data-testid="sch-date"
              />
            </div>
            <div>
              <Label>Time window</Label>
              <Select
                value={form.pickup_window}
                onValueChange={(v) =>
                  setForm((f) => ({ ...f, pickup_window: v }))
                }
              >
                <SelectTrigger className="mt-2" data-testid="sch-window">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {PICKUP_WINDOWS.map((w) => (
                    <SelectItem key={w} value={w}>
                      {w}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <Label>Service type</Label>
              <Select
                value={form.service_type}
                onValueChange={(v) =>
                  setForm((f) => ({ ...f, service_type: v }))
                }
              >
                <SelectTrigger className="mt-2" data-testid="sch-service">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {SERVICE_TYPES.map((s) => (
                    <SelectItem key={s.value} value={s.value}>
                      {s.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Estimated weight (optional)</Label>
              <Input
                name="weight_estimate"
                value={form.weight_estimate}
                onChange={change}
                placeholder="e.g. 15 lbs"
                className="mt-2"
                data-testid="sch-weight"
              />
            </div>
          </div>

          <div>
            <Label>Special instructions (optional)</Label>
            <Textarea
              name="special_instructions"
              value={form.special_instructions}
              onChange={change}
              rows={4}
              className="mt-2"
              data-testid="sch-notes"
            />
          </div>

          <div className="rounded-2xl bg-blue-50 border border-blue-100 p-4 text-sm text-blue-900">
            First-order customers get <strong>{PRICING.firstOrderAmount} off</strong>{" "}
            with code{" "}
            <span className="font-mono font-bold">{PRICING.firstOrderCode}</span>.
          </div>

          <motion.button
            type="submit"
            disabled={loading}
            className="btn-primary w-full disabled:opacity-60"
            data-testid="sch-submit"
            whileHover={{ y: loading ? 0 : -2 }}
            whileTap={{ scale: loading ? 1 : 0.98 }}
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            {loading ? "Scheduling..." : "Confirm my pickup"}
          </motion.button>
        </form>
      </div>
    </motion.section>
  );
}
