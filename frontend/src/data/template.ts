import type { Template } from '../types/resume';
import Template1 from '../templates/Template1';
import Template2 from '../templates/Template2';
import Template3 from '../templates/Template3';
import Template4 from '../templates/Template4';
import Template5 from '../templates/Template5';
import Template6 from '../templates/Template6';
import Template7 from '../templates/Template7';
import Template8 from '../templates/Template8';
import Template9 from '../templates/Template9';
import Template10 from '../templates/Template10';

export const templates: Template[] = [
  {
    id: 'template-1',
    name: 'Classic Professional',
    previewImg: 'https://cdn-images.zety.com/templates/zety/iconic-9-classic-silver-dark-276@1x.png',
    component: Template1
  },
  {
    id: 'template-2',
    name: 'Attorney Modern',
    previewImg: 'https://cdn.create.microsoft.com/catalog-assets/en-us/33449d14-b590-4c13-929a-4931b797f8f9/thumbnails/616/attorney-resume-green-modern-simple-2-1-e1ac26061abc.webp',
    component: Template2
  },
  {
    id: 'template-3',
    name: 'Creative Designer',
    previewImg: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0TGJvOy35cs17yunh7vTEWe74NXUeYNyKZw&s',
    component: Template3
  },
  {
    id: 'template-4',
    name: 'Executive Classic',
    previewImg: 'https://responsive-muse.com/wp-content/uploads/2018/05/free-resume-word-template-3.jpg',
    component: Template4
  },
  {
    id: 'template-5',
    name: 'Ocean Blue',
    previewImg: 'https://instaresume.io/template-preview/200kb/OceanPreview_200kb.png',
    component: Template5
  },
  {
    id: 'template-6',
    name: 'Minimalist Beige',
    previewImg: 'https://marketplace.canva.com/EAFGNR7sigU/3/0/1131w/canva-beige-and-brown-simple-accountant-minimalist-resume-3sWtZ7q2WE8.jpg',
    component: Template6
  },
  {
    id: 'template-7',
    name: 'Berlin Professional',
    previewImg: 'https://s3.resume.io/cdn-cgi/image/width=380,dpr=2,format=auto/uploads/local_template_image/image/160/persistent-resource/berlin-resume-templates.jpg?v=1627385633',
    component: Template7
  },
  {
    id: 'template-8',
    name: 'Influx Modern',
    previewImg: 'https://cdn-images.zety.com/templates/zety/influx-8-duo-silver-dark-971@1x.png',
    component: Template8
  },
  {
    id: 'template-9',
    name: 'Teaching Stylish',
    previewImg: 'https://cdn.create.microsoft.com/catalog-assets/en-us/a32a147f-1f69-4fd5-8a39-c25b2a0093e8/thumbnails/616/stylish-teaching-resume-red-modern-simple-2-1-86dfc2cb0037.webp',
    component: Template9
  },
  {
    id: 'template-10',
    name: 'Santiago Elegant',
    previewImg: 'https://s3.resume.io/cdn-cgi/image/width=380,format=auto/uploads/local_template_image/image/383/persistent-resource/santiago-resume-templates.jpg?v=1656070649',
    component: Template10
  }
];