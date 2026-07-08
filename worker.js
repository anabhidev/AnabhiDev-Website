export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.hostname === 'studio.anabhidev.com') {
      // Buat request baru dengan path ke studio/index.html
      // menggunakan URL asli tapi ganti pathname
      const newRequest = new Request(
        'https://anabhidev.com/studio/index.html',
        request
      );
      return env.ASSETS.fetch(newRequest);
    }

    return env.ASSETS.fetch(request);
  }
};
