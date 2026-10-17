import type { AlbumCategory, GalleryStats, PhotoItem } from '../types/gallery';
import syncedPhotos from './userPhotos.json';

export const HERO_IMAGE_SRC = '/images/hero/hero-couple.jpg';
export const HERO_IMAGE_WEBP = '/images/hero/hero-couple.webp';

export const ALL_PHOTOS: PhotoItem[] = syncedPhotos as PhotoItem[];

export const GALLERY_META: GalleryStats = {
  totalPhotos: ALL_PHOTOS.length,
  favoritesCount: 0,
  albumName: 'WEDDING CAM2',
  clientNames: 'AARAV & ANJALI',
  weddingDate: '2026-06-22',
  photographerName: 'VELOCITI AGENCY',
  expiresOn: 'December 7, 2027',
};

export const ALBUM_CATEGORIES: AlbumCategory[] = [
  {
    id: 'best-photos',
    slug: 'best-photos',
    name: 'BEST PHOTOS',
    photoCount: ALL_PHOTOS.filter((p) => p.categories?.includes('best-photos') || p.category === 'best-photos' || p.isUserUploaded).length,
  },
  {
    id: 'wedding-cam2',
    slug: 'wedding-cam2',
    name: 'WEDDING CAM2',
    photoCount: ALL_PHOTOS.filter((p) => p.categories?.includes('wedding-cam2') || p.category === 'wedding-cam2').length,
  },
  {
    id: 'wedding-cam1',
    slug: 'wedding-cam1',
    name: 'WEDDING CAM1',
    photoCount: ALL_PHOTOS.filter((p) => p.categories?.includes('wedding-cam1') || p.category === 'wedding-cam1').length,
  },
  {
    id: 'pre-wedding',
    slug: 'pre-wedding',
    name: 'PRE WEDDING',
    photoCount: ALL_PHOTOS.filter((p) => p.categories?.includes('pre-wedding') || p.category === 'pre-wedding').length,
  },
  {
    id: 'sangeeth-best',
    slug: 'sangeeth-best',
    name: 'SANGEETH & CELEBRATION',
    photoCount: ALL_PHOTOS.filter((p) => p.categories?.includes('sangeeth-best') || p.categories?.includes('sangeeth') || p.category === 'sangeeth-best' || p.category === 'sangeeth').length,
  },
  {
    id: 'all',
    slug: 'all',
    name: 'ALL CAPTURES',
    photoCount: ALL_PHOTOS.length,
  },
];
