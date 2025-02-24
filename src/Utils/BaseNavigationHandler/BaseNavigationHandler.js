export const BaseNavigationHandler = (href) => {
  if (href === "/") {
    window.location.href = href;
  }
  window.location.href = `/${href}`;
};
