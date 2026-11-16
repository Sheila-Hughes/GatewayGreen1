# Gateway Green Recycling

Plain HTML, CSS and JavaScript. Existing routes are /, /company, /expertise, /solutions and /contact. Images currently load from the public Wix CDN. The placeholder Media Center and Careers links on the reference site led to the homepage and were omitted.

## Vercel deployment

1. Extract the archive. Open a terminal in the extracted folder, run `npx vercel login`, then run `npx vercel deploy` and create a new preview project. Alternatively, commit the extracted files to a Git repository and import it into Vercel using the Other framework preset. Leave the build and output overrides off.
2. Set `RESEND_API_KEY`, `CONTACT_FROM` (a verified Resend sender) and `CONTACT_TO` (the Gateway Green enquiry inbox) in the Vercel project for the relevant environments. Redeploy and verify delivery to the inbox with a test enquiry.
3. Verify photos and partner logos in the preview. Copy approved originals into the project and update their URLs if retiring Wix or removing its media.
4. Once approved, use `npx vercel deploy --prod`. To move the existing domain, add it in Vercel and apply the DNS records shown in the dashboard. Keep existing email-related DNS records in place.

## About page video

The About page places “Bringing Our Vision to Life” below the Edmonton plant introduction.
For public playback, upload the MP4 to the approved public video host and replace the
data-vision-media contents in company.html with a controls-enabled video player or
the host's accessible embed. The offline review copy links to the existing video file.
