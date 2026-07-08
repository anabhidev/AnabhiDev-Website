export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.hostname === 'studio.anabhidev.com') {
      return fetch('https://anabhidev.com/studio/index.html');
    }

    return env.ASSETS.fetch(request);
  }
};
