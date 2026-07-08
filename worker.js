export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.hostname === 'studio.anabhidev.com') {
      return Response.redirect('https://anabhidev.com/studio/', 301);
    }

    return env.ASSETS.fetch(request);
  }
};
