export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.hostname === 'studio.anabhidev.com') {
      const assetUrl = new URL(request.url);
      assetUrl.hostname = 'anabhidev-website.anabhi-dev.workers.dev';
      assetUrl.pathname = '/studio/';
      return fetch(assetUrl.toString());
    }

    return env.ASSETS.fetch(request);
  }
};
