export const extensionId = async ({ context }, use) => {
  let [background] = context.serviceWorkers();
  if (!background) background = await context.waitForEvent("serviceworker");

  const extensionId = background.url().split("/")[2];
  await use(extensionId);
};
