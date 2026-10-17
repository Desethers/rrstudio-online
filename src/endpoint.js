// Where request forms are posted (the "Let's talk" dialog on the home page and the
// Contact page form): the /api/contact serverless function (api/contact.js), which
// emails the request through Resend. If it is ever left empty, the forms fall back to
// a prefilled email so no request is lost.
export const ACCESS_ENDPOINT = "/api/contact";
