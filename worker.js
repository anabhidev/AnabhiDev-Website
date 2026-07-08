export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    
    // Kalau request dari studio.anabhidev.com
    // serve studio/index.html
    if (url.hostname === 'studio.anabhidev.com') {
      url.pathname = '/studio' + (url.pathname === '/' ? '/index.html' : url.pathname);
      return env.ASSETS.fetch(new Request(url.toString(), request));
    }
    
    // Default — serve seperti biasa
    return env.ASSETS.fetch(request);
  }
};
