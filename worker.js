export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.hostname === 'studio.anabhidev.com') {
      const studioUrl = new URL(request.url);
      studioUrl.pathname = '/Studio/index.html';
      return env.ASSETS.fetch(new Request(studioUrl.toString(), request));
    }

    return env.ASSETS.fetch(request);
  }
};
