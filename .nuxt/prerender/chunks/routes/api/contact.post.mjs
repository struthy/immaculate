import { defineEventHandler, readBody, createError, sendRedirect } from 'file://C:/webdev/Tutorials/nuxt-blog/node_modules/h3/dist/index.mjs';

const contact_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  console.log("body: ", body);
  if (!body.name || !body.email || !body.message) {
    throw createError({
      statusCode: 400,
      statusMessage: "One or more of the following not found: name, email, message"
    });
  }
  return sendRedirect(event, "/", 302);
});

export { contact_post as default };
//# sourceMappingURL=contact.post.mjs.map
