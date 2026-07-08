export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.hostname === 'studio.anabhidev.com') {
      const workerUrl = new URL(request.url);
      workerUrl.hostname = 'anabhidev-website.anabhi-dev.workers.dev';
      workerUrl.pathname = '/studio/';
      return fetch(workerUrl.toString(), {
        headers: request.headers,
        method: request.method,
      });
    }

    return env.ASSETS.fetch(request);
  }
};
