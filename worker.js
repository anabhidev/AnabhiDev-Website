export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    
    if (url.hostname === 'studio.anabhidev.com') {
      // Selalu serve studio/index.html untuk semua path di subdomain ini
      const studioUrl = new URL(request.url);
      studioUrl.hostname = url.hostname;
      studioUrl.pathname = '/studio/index.html';
      return env.ASSETS.fetch(new Request(studioUrl.toString(), request));
    }
    
    // Default — serve seperti biasa untuk anabhidev.com
    return env.ASSETS.fetch(request);
  }
};
