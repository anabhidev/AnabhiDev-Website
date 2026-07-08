export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.hostname === 'studio.anabhidev.com') {
      // Redirect ke path Studio di domain utama
      return Response.redirect('https://anabhidev.com/Studio/', 302);
    }

    // Default — serve static assets seperti biasa
    return env.ASSETS.fetch(request);
  }
};
