import { defineEventHandler, readBody, createError, sendRedirect } from 'file:///home/runner/work/immaculate/immaculate/node_modules/h3/dist/index.mjs';

const signUp_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  console.log("body: ", body);
  if (!body.email) {
    throw createError({
      statusCode: 400,
      statusMessage: "Email not found"
    });
  }
  return sendRedirect(event, "/", 302);
});

export { signUp_post as default };
//# sourceMappingURL=sign-up.post.mjs.map
