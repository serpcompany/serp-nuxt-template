export default defineNuxtRouteMiddleware((to) => {
  if (to.path !== '/' && !to.path.endsWith('/')) {
    const { path, query, hash } = to;
    const nextPath = path + '/';
    const nextRoute = { path: nextPath, query, hash };
    return navigateTo(nextRoute, { redirectCode: 301 });
  }
});
