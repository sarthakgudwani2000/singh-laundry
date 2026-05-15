import { useState } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { createContact } from "@/lib/api";

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.message) {
      toast.error("Please complete full name, phone number, and comments.");
      return;
    }
    try {
      setLoading(true);
      await createContact({
        name: form.name,
        email: form.email || undefined,
        phone: form.phone,
        subject: form.subject || "Website contact",
        message: form.message,
      });
      toast.success("Thanks! We received your message and will be in touch soon.");
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch (err) {
      toast.error(
        err?.message || "Something went wrong. Please try again or call us.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="surface-card p-6 md:p-7 space-y-4"
      data-testid="contact-form"
    >
      <div>
        <Label htmlFor="name">Full name *</Label>
        <Input
          id="name"
          name="name"
          value={form.name}
          onChange={onChange}
          placeholder="Your full name"
          className="mt-2"
          data-testid="contact-name"
        />
      </div>
      <div>
        <Label htmlFor="phone">Phone number *</Label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          value={form.phone}
          onChange={onChange}
          placeholder="973-626-3896"
          className="mt-2"
          data-testid="contact-phone"
        />
      </div>
      <div>
        <Label htmlFor="email">Email address</Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={form.email}
          onChange={onChange}
          placeholder="you@example.com"
          className="mt-2"
          data-testid="contact-email"
        />
      </div>
      <div>
        <Label htmlFor="message">Comments *</Label>
        <Textarea
          id="message"
          name="message"
          rows={6}
          value={form.message}
          onChange={onChange}
          placeholder="How can we help?"
          className="mt-2"
          data-testid="contact-message"
        />
      </div>
      <input type="hidden" name="subject" value={form.subject} readOnly aria-hidden />
      <button
        type="submit"
        disabled={loading}
        className="w-full sm:w-auto min-w-[200px] rounded-full btn-primary py-3 px-8 transition-colors disabled:opacity-60"
        data-testid="contact-submit"
      >
        {loading ? <Loader2 className="h-4 w-4 animate-spin inline mr-2" /> : null}
        {loading ? "Sending..." : "Submit"}
      </button>
    </form>
  );
}
