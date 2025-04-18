import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {path: 'products-details/:pDid', renderMode: RenderMode.Server},
  {path: 'address/:cartId', renderMode: RenderMode.Server},
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
