# V11 professional product enquiry

The new `/{locale}/inquiry/` route is for dental professionals requesting product information or a quotation. It is separate from `/{locale}/distributors/`, its endpoint and its draft storage. It does not represent a dental clinic treatment service.

## Local operation

With no `NEXT_PUBLIC_PROFESSIONAL_ENQUIRY_ENDPOINT`, the form validates a request, explicitly says it has **not been sent**, and allows a local plain-text download. It does not make an HTTP submission or simulate successful delivery. Privacy consent is required even for review. Existing distributor behaviour is unchanged. While a configured submission is pending, editable controls are disabled; an acknowledgement after the form has unmounted does not clear a newer tab draft.

Private contact fields and the message use `sessionStorage` key `biovent-professional-enquiry-v11`. They persist within the tab during language changes and reloads, are separate from distributor data, and are cleared when the tab is closed. A confirmed service acceptance removes the stored professional draft. Browser storage may be unavailable; the current in-memory form still works.

There is no patient data field. The message hint asks users not to include patient information.

## Product and intent links

Example:

```
/en/inquiry/?product=promx&diameter=4.2&length=13&purpose=quotation
```

`purpose=information` is the default. Only product, purpose and a validated diameter/length pair are placed in the canonical URL. Private contact information is never written to it. Query-supplied `reference` or SKU values are ignored and removed. References are derived only through `resolveVariant()` from the shared catalogue allowlist.

The diameter selector offers only documented diameters. Selecting a diameter chooses the first valid listed length and updates the length options. The complete pair can be cleared for a product-level request. Held or unlisted combinations are rejected on incoming links and before submission; the form does not guess missing references, current stock, market availability or clinical suitability. Where an allowed combination has no verified reference, it remains an honest dimension-only enquiry.

## Public configuration

Set the following non-secret variable **before export** only when a receiving service is actually ready:

```
NEXT_PUBLIC_PROFESSIONAL_ENQUIRY_ENDPOINT=/professional-enquiry.php
```

An HTTPS external form service may also be explicitly configured, provided it implements the same validation and response contract and permits the site origin via its own CORS policy. A public endpoint URL is not an API secret. Never put mail credentials or service API keys in `NEXT_PUBLIC_*` values.

The website remains a static export and does not add a Next.js API route or require a persistent Node server.

## Request and response contract

The form sends a JSON POST with credentials omitted and a 15-second timeout. Example shape (the actual reference must come from the committed product dataset):

```json
{
  "kind": "professional",
  "purpose": "information",
  "contactName": "Example Professional",
  "company": "Example Clinic",
  "country": "Germany",
  "email": "professional@example.com",
  "phone": "",
  "product": "smart",
  "diameter": 3.5,
  "length": 10,
  "reference": null,
  "quantity": 2,
  "message": "Please send product documentation.",
  "consent": true,
  "honeypot": "",
  "locale": "en"
}
```

For an unconfigured size, `diameter`, `length` and `reference` must all be `null`. Quantity may be `null`; otherwise it must be an integer from 1 to 100,000. Required fields are full name, clinic/company, country, valid email, product and consent. A real reference must exactly match the selected allowlisted variant. Catalogue records do not establish current commercial availability.

A successful HTTP status alone is insufficient. Only JSON `{"accepted":true}` is treated as acceptance; an optional string `reference` is displayed as the receiving service's reference. Malformed JSON, `success:true`, `accepted:false`, HTTP failures and network errors produce a clear error and preserve the draft. An acknowledgement by a service is not a claim of recipient inbox delivery.

## Optional standalone PHP receiver

`deployment/server/professional-enquiry.php.example` is an opt-in PHP 8.1+ example, outside the static public export. It is not enabled or deployed automatically. Configure a separate professional inbox and verify local mail transport and privacy terms before enabling.

Required **server-side** environment settings:

- `BIOVENT_PROFESSIONAL_ALLOWED_ORIGIN`: exact site origin, e.g. `https://biovent-implant.com`.
- `BIOVENT_PROFESSIONAL_TO`: verified professional enquiry recipient.
- `BIOVENT_PROFESSIONAL_FROM`: mail sender accepted by the host.
- `BIOVENT_PROFESSIONAL_RATE_DIRECTORY`: writable private directory outside the public document root.
- `BIOVENT_PROFESSIONAL_VARIANTS_FILE`: absolute path to a trusted copy of `data/product-variants.json`, also outside the public document root.

Copy the registry from the same source release when deploying the optional receiver. It is the same canonical JSON used by `data/product-knowledge.ts`; no second SKU or dimension table is maintained. Treat this trusted server file as release configuration and keep its source SHA-256 with the release record. Missing or malformed configuration fails closed.

The example validates JSON shape, all required fields, locale, professional intent, consent, honeypot, size pair, exact reference, quantity, character limits and line breaks. It checks the exact browser origin and JSON content type, rejects bodies over 16 KiB, and limits submissions to one per minute and five per hour per trusted peer IP using locked private rate files. It does not trust forwarding headers or browser-supplied mail destinations. No API secrets are embedded in frontend code.

The example uses the host's `mail()` transport. `accepted:true` means that local transport accepted the message; it does not prove inbox delivery. A deployment must test the actual recipient/routing, SPF/DKIM and service operation separately. No real message was sent during development.

Do not route this form to the distributor receiver: that has a different payload, recipient and consent workflow. Do not publish the example or the private registry merely to make the default preview appear live.

## Validation evidence and limits

- `node tests/professional-enquiry-v11.cjs`: actual catalogue resolver, held/unlisted configuration rejection, reference/URL/storage tampering, preview zero-network behaviour, payload guards, acknowledgement/error cases; network mocked only.
- `node tests/professional-form-v11.cjs`: actual exported browser form, prefills, allowed lengths, consent/error focus, DE language switch and tab draft persistence, text download, invalid incoming configurations, four-language responsive layouts, separate distributor storage, and no external POST. Requires an exported site served at `BIOVENT_TEST_URL` (default `http://127.0.0.1:3100`).
- The PHP runtime was not present in this execution environment when this example was authored; PHP lint, real mail delivery and live Natro/JetPress behaviour are not claimed. The endpoint and real destination credentials remain unconfigured.
