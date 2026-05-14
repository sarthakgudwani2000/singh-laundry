import axios from "axios";

const BACKEND_URL = (import.meta.env.VITE_BACKEND_URL || "").replace(
  /\/$/,
  "",
);

export const API = BACKEND_URL ? `${BACKEND_URL}/api` : "";

export const api = axios.create({
  ...(API ? { baseURL: API } : {}),
  headers: { "Content-Type": "application/json" },
});

function rejectWithApiError(err) {
  const d = err.response?.data;
  if (d && typeof d.message === "string") {
    const parts = [d.message];
    if (d.errors && typeof d.errors === "object") {
      for (const v of Object.values(d.errors)) {
        if (v) parts.push(String(v));
      }
    }
    return Promise.reject(new Error(parts.join(" ")));
  }
  if (err?.message) return Promise.reject(err);
  return Promise.reject(new Error("Request failed."));
}

export const createBooking = (data) => {
  if (!API) {
    return Promise.reject(
      new Error(
        "Server address is not configured. Set VITE_BACKEND_URL and rebuild.",
      ),
    );
  }
  return api
    .post("/bookings", {
      name: data.name,
      email: data.email,
      phone: data.phone,
      address: data.address,
      city: data.city,
      zip_code: data.zip_code,
      pickup_date: data.pickup_date,
      pickup_window: data.pickup_window,
      service_type: data.service_type,
      ...(data.weight_estimate
        ? { weight_estimate: data.weight_estimate }
        : {}),
      ...(data.special_instructions
        ? { special_instructions: data.special_instructions }
        : {}),
    })
    .catch(rejectWithApiError);
};

export const createContact = (data) => {
  if (!API) {
    return Promise.reject(
      new Error(
        "Server address is not configured. Set VITE_BACKEND_URL and rebuild.",
      ),
    );
  }
  return api
    .post("/contact", {
      name: data.name,
      phone: data.phone,
      email: data.email || undefined,
      subject: data.subject || "Website contact",
      message: data.message,
    })
    .catch(rejectWithApiError);
};
