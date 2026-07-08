export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.hostname === 'studio.anabhidev.com') {
      // Gunakan env.ASSETS langsung dengan URL yang dimodifikasi
      // Trick: buat request ke domain root tapi dengan path /studio/
      const modifiedUrl = new URL('https://anabhidev.com/studio/index.html');
      return env.ASSETS.fetch(modifiedUrl.toString());
    }

    return env.ASSETS.fetch(request);
  }
};
