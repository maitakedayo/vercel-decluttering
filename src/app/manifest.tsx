import { MetadataRoute } from 'next'


export default function manifest(): MetadataRoute.Manifest {
  return {
    "theme_color": "#f69435",
    "background_color": "#f69435",
    "display": "standalone",
    "scope": "/",
    "start_url": "/",
    "name": "decluttering pwa",
    "short_name": "pwa",
    "description": "This is a declutteringApp to create PWA with next",
    "icons": [
      {
        "src": "/images/sora.png",
        "sizes": "192x192",
        "type": "image/png",
        //"purpose": "decluttering"
      }
    ]
  }
}

