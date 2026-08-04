#set page(
  paper: "a4",
  margin: (x: 2.2cm, y: 2cm),
  numbering: "1",
)

#set text(font: "New Computer Modern", size: 10.5pt)
#set par(justify: true, leading: 0.65em)
#set heading(numbering: "1.1")

#let label-box(title, body) = block(
  inset: 10pt,
  radius: 4pt,
  fill: rgb("f7f9fc"),
  stroke: rgb("cfd8e3"),
  width: 100%,
)[
  #text(weight: "bold", fill: rgb("1f4f7a"))[#title]
  #v(4pt)
  #body
]

#let evidence-box(title, note: []) = block(
  inset: 14pt,
  radius: 4pt,
  stroke: rgb("b8c2cc"),
  fill: rgb("fbfbfc"),
  width: 100%,
  height: 5.2cm,
)[
  #align(center + horizon)[
    #text(weight: "bold")[#title]
    #v(6pt)
    #text(fill: rgb("6b7280"))[Insert screenshot / proof image here]
    #if note != [] [
      #v(6pt)
      #note
    ]
  ]
]

#let finding-meta(id, severity, category, affected) = table(
  columns: (1.2fr, 1fr, 1fr, 2.3fr),
  inset: 6pt,
  stroke: rgb("d5dbe3"),
  table.header(
    [*ID*], [*Severity*], [*Category*], [*Affected Area*],
  ),
  [#id], [#severity], [#category], [#affected],
)

#align(center)[
  #text(size: 22pt, weight: "bold")[SDAD Vibe Penetration Testing Report]
  #v(12pt)
  #text(size: 14pt)[SAST and DAST Assessment]
  #v(20pt)
  #text[
    Module: Secure Software Design and Development \
    Target: `sdad-vibe` \
    Date: 2026-08-04 \
    Author: _[Insert Name / Group]_
  ]
]

#v(1.5cm)

= Executive Summary

This report documents a controlled academic penetration-testing exercise performed on the `sdad-vibe` application. The assessment was split into two stages:

- *SAST* to review the source code for insecure patterns, hidden trust assumptions, and sensitive-data handling issues.
- *DAST* to validate whether those issues were reachable and exploitable while the application was running.

Several vulnerabilities already existed in the base project, especially around client-controlled authorisation and insecure handling of order data. To make the assignment demonstrable end to end, a few additional intentional weaknesses were introduced into the codebase. These added issues are simple enough to reproduce during a lab session but non-trivial enough to discuss properly in a report.

#label-box([Assessment Scope], [
  This environment is intentionally vulnerable and should be used only for local testing, screenshots, and report evidence. No production deployment or real customer data should be involved.
])

#outline(title: [Table of Contents])

= Introduction

The aim of this assessment is to identify and demonstrate software weaknesses using both static and dynamic techniques. Static analysis focuses on the code itself, while dynamic analysis focuses on observable behaviour in the running application.

The target application is a small e-commerce style system with:

- client-side React pages for login, checkout, payment, and admin order viewing;
- server-side Express routes for authentication, orders, payment, and admin functions; and
- in-memory stores for users and orders.

This report is organised into separate SAST and DAST chapters so that findings can be mapped clearly from source code to live exploitation.

= Test Setup

== Environment

- Application name: `sdad-vibe`
- Frontend: React + Vite
- Backend: Express
- Storage model: in-memory data structures
- Intended assessment mode: local development instance

== Stages Performed

1. Read and map the code structure.
2. Identify insecure code paths and trust boundaries.
3. Run the application and verify exploitability through browser and HTTP requests.
4. Capture screenshots and proof images for each confirmed issue.
5. Summarise impact and propose remediations.

= SAST

== SAST Methodology

The SAST stage focused on direct code inspection of the frontend and backend. The main goals were to locate:

- hardcoded secrets or backdoors;
- insecure authentication or authorisation logic;
- unsafe data storage patterns;
- debug features exposed to untrusted users; and
- user-controlled data rendered without sanitisation.

== SAST-01 Hardcoded Support Backdoor

#finding-meta(
  "SAST-01",
  "High",
  "Authentication",
  "`server/controllers/authController.js`",
)

The login controller contains a hardcoded `supportCode` value, `support-root-2026`. When this value is supplied, the server returns the admin user without validating the supplied email or password.

*Why it matters:* this creates an intentional authentication backdoor. Anyone who discovers the code path can log in as an administrator.

*Static proof points:*

- locate the conditional branch that checks `supportCode`;
- confirm the branch returns the admin account directly; and
- show that no password verification happens in that branch.

#evidence-box([Placeholder: SAST-01 Source Code Screenshot])

#evidence-box([Placeholder: SAST-01 Annotated Proof Image], note: [
  Suggested annotation: highlight the hardcoded support code and the direct admin account return.
])

*Remediation:* remove the backdoor completely, store secrets outside source control, and require normal authentication for all admin access.

== SAST-02 Plaintext Credential Exposure in Debug Diagnostics

#finding-meta(
  "SAST-02",
  "High",
  "Sensitive Data Exposure",
  "`server/controllers/adminController.js`, `server/models/userStore.js`",
)

The application exposes a debug diagnostics route that returns raw users and orders. The raw users include plaintext passwords from the in-memory store.

*Why it matters:* source review shows both the presence of plaintext passwords and a debug function capable of returning them to a client.

*Static proof points:*

- identify that `getAllRaw()` returns the unsanitised user list;
- confirm user objects contain plaintext passwords; and
- show the diagnostics controller returns those raw objects in a response.

#evidence-box([Placeholder: SAST-02 Source Code Screenshot])

#evidence-box([Placeholder: SAST-02 Proof Image])

*Remediation:* never store plaintext passwords, remove debug data dumps from runtime routes, and return only sanitised objects.

== SAST-03 Sensitive Payment Data Stored in Order Objects

#finding-meta(
  "SAST-03",
  "Medium",
  "Sensitive Data Handling",
  "`server/controllers/c4.paymentController.js`",
)

The payment controller stores the full cardholder name and full card number in `lastPaymentAttempt` on the order object.

*Why it matters:* even in a mock system, storing full payment data in application memory is a serious insecure-data-handling pattern. If any debug or order export endpoint leaks the order object, card data is exposed.

*Static proof points:*

- show the full card number is normalised and stored without masking;
- confirm both successful and failed payment paths persist the same sensitive values; and
- link this storage to any endpoint that can later reveal order objects.

#evidence-box([Placeholder: SAST-03 Source Code Screenshot])

*Remediation:* do not persist full PAN values; if logging or audit is required, store only masked metadata such as the last four digits.

== SAST-04 Client-Controlled Authorisation Trust

#finding-meta(
  "SAST-04",
  "High",
  "Authorisation",
  "`client/src/services/api.js`, `server/controllers/adminController.js`",
)

The client reads user role data from local storage and sends it as `X-User-Role` and `X-User-Id` headers. The server trusts these headers directly when deciding whether admin data should be returned.

*Why it matters:* source-level review shows that a user can elevate privileges simply by changing client-controlled data.

*Static proof points:*

- confirm headers are built from browser local storage;
- confirm there is no session signature or token verification; and
- show the admin controller checks only `req.headers['x-user-role']`.

#evidence-box([Placeholder: SAST-04 Source Code Screenshot])

*Remediation:* replace client-controlled headers with server-verified sessions or signed tokens, and enforce authorisation on the server side only.

= DAST

== DAST Methodology

The DAST stage verified whether the identified weaknesses were reachable through normal browser usage, developer tools, or crafted HTTP requests against the running application.

The following evidence should be collected for each confirmed issue:

- one screenshot of the input or request;
- one screenshot of the vulnerable result; and
- one proof image that clearly links the result to the finding.

== DAST-01 Stored XSS Through Special Instructions

#finding-meta(
  "DAST-01",
  "High",
  "Stored XSS",
  "`/checkout`, `/confirmation/:orderId`, `/admin/orders`",
)

An order can be created with attacker-controlled HTML or script-like content in the `Special Instructions` field. That content is later rendered with `dangerouslySetInnerHTML` in the confirmation view and the admin orders page.

*Dynamic validation approach:*

1. Add a product to the cart and proceed to checkout.
2. Enter a harmless XSS test payload into `Special Instructions`.
3. Submit the order and open the confirmation page.
4. Log in as admin or bypass admin checks in the local test environment.
5. Open the admin orders page and verify the payload executes or renders as active HTML.

*Expected result:* attacker-controlled content is executed or interpreted by the browser instead of being shown as plain text.

#evidence-box([Placeholder: DAST-01 Payload Entry Screenshot])

#evidence-box([Placeholder: DAST-01 Confirmation Page Screenshot])

#evidence-box([Placeholder: DAST-01 Admin View Screenshot])

*Remediation:* treat all user content as text by default, remove unsafe HTML sinks, and sanitise rich content strictly when rich rendering is truly required.

== DAST-02 Insecure Direct Object Reference on Order Retrieval

#finding-meta(
  "DAST-02",
  "High",
  "IDOR",
  "`GET /api/orders/:orderId`, `/confirmation/:orderId`",
)

Orders are retrieved directly by order ID, and the identifiers follow a predictable pattern such as `CC-1001`, `CC-1002`, and so on. No ownership check is performed before returning the order details.

*Dynamic validation approach:*

1. Create one or more orders from different sessions or browsers.
2. Observe the generated order ID format.
3. Request another user’s order by replacing the path parameter with a nearby sequential value.
4. Confirm that the application returns customer details, item data, and payment status without authenticating ownership.

*Expected result:* unauthorised users can view other customers’ order information by guessing IDs.

#evidence-box([Placeholder: DAST-02 Request Screenshot])

#evidence-box([Placeholder: DAST-02 Response Screenshot])

*Remediation:* bind orders to authenticated users and enforce per-order ownership checks before returning order data.

== DAST-03 Admin Access Bypass Through Forged Client State

#finding-meta(
  "DAST-03",
  "High",
  "Privilege Escalation",
  "`/admin/orders`, `GET /api/admin/orders`",
)

Admin access can be reached by modifying browser local storage or by sending forged `X-User-Role: admin` headers directly in a request. The server does not verify that the caller is a real admin user.

*Dynamic validation approach:*

1. Log in as a normal user or stay unauthenticated.
2. Modify the stored user object in browser local storage or intercept the request.
3. Set the role to `admin`.
4. Reload the admin page or resend the request.
5. Confirm that the order list is returned.

*Expected result:* a non-admin user receives admin-only data.

#evidence-box([Placeholder: DAST-03 Local Storage or Request Edit Screenshot])

#evidence-box([Placeholder: DAST-03 Admin Orders Access Screenshot])

*Remediation:* remove client-authoritative roles and validate admin privileges using server-side identity only.

== DAST-04 Debug Diagnostics Data Leak

#finding-meta(
  "DAST-04",
  "High",
  "Sensitive Data Exposure",
  "`GET /api/admin/diagnostics?debug=audit-mode`",
)

The diagnostics endpoint exposes raw user and order data when accessed with a weak hardcoded debug token in the query string.

*Dynamic validation approach:*

1. Send a request to `/api/admin/diagnostics?debug=audit-mode`.
2. Inspect the response body.
3. Verify that user records, plaintext passwords, order data, and any stored payment attempt data are disclosed.

*Expected result:* highly sensitive internal data is returned without real administrator authentication.

#evidence-box([Placeholder: DAST-04 Request Screenshot])

#evidence-box([Placeholder: DAST-04 JSON Response Screenshot])

*Remediation:* remove runtime debug endpoints from deployed builds and require strong authenticated admin-only access for any diagnostics features that must remain.

== DAST-05 Backdoor Login Validation

#finding-meta(
  "DAST-05",
  "High",
  "Authentication Bypass",
  "`POST /api/auth/login`",
)

The hardcoded support code identified during SAST should also be validated dynamically by sending a login request that includes the backdoor value.

*Dynamic validation approach:*

1. Send a login request with any email value, any password value, and the backdoor `supportCode`.
2. Inspect the JSON response.
3. Verify that the returned user has the admin role.

*Expected result:* the login succeeds as admin without valid credentials.

#evidence-box([Placeholder: DAST-05 Request Screenshot])

#evidence-box([Placeholder: DAST-05 Successful Response Screenshot])

*Remediation:* remove the backdoor and review commit history to ensure the secret was not reused elsewhere.

= Risk Summary

#figure(
  table(
    columns: (1fr, 2.1fr, 0.9fr, 1.1fr),
    inset: 6pt,
    stroke: rgb("d5dbe3"),
    table.header([*ID*], [*Finding*], [*Stage*], [*Severity*]),
    [SAST-01], [Hardcoded support backdoor], [SAST], [High],
    [SAST-02], [Plaintext credential exposure in diagnostics], [SAST], [High],
    [SAST-03], [Sensitive payment data stored in memory], [SAST], [Medium],
    [SAST-04], [Client-controlled authorisation trust], [SAST], [High],
    [DAST-01], [Stored XSS in special instructions], [DAST], [High],
    [DAST-02], [IDOR on order retrieval], [DAST], [High],
    [DAST-03], [Admin access bypass], [DAST], [High],
    [DAST-04], [Debug diagnostics leak], [DAST], [High],
    [DAST-05], [Backdoor login validation], [DAST], [High],
  ),
  caption: [Consolidated findings summary.],
)

= Recommendations

The most important fixes are architectural rather than cosmetic:

1. Remove all hardcoded backdoors, debug switches, and insecure demo shortcuts.
2. Replace client-controlled role headers with server-verified authentication.
3. Enforce object-level access control on orders and other user data.
4. Stop storing plaintext passwords and full payment card data.
5. Render user input as plain text unless a strictly sanitised rich-text pipeline is required.

= Appendix: Evidence Checklist

Use this section to track collected proof material before submission.

#figure(
  table(
    columns: (1fr, 2.3fr, 1fr),
    inset: 6pt,
    stroke: rgb("d5dbe3"),
    table.header([*Finding*], [*Required Evidence*], [*Status*]),
    [SAST-01], [Source code screenshot of backdoor branch], [Pending],
    [SAST-02], [Source code screenshot of raw credential exposure], [Pending],
    [SAST-03], [Source code screenshot of card data storage], [Pending],
    [SAST-04], [Source code screenshot of client-controlled role usage], [Pending],
    [DAST-01], [Payload input + triggered result], [Pending],
    [DAST-02], [Unauthorised order request + response], [Pending],
    [DAST-03], [Forged client state + admin page access], [Pending],
    [DAST-04], [Diagnostics request + leaked JSON response], [Pending],
    [DAST-05], [Backdoor login request + admin response], [Pending],
  ),
  caption: [Checklist for screenshots and proof images.],
)
