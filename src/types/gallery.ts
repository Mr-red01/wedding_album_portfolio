export interface PhotoItem {
  id: string;
  title: string;
  src: string;
  webpSrc?: string;
  thumbnailSrc?: string;
  aspectRatio: number; // width / height, e.g. 1.5 for 3:2 landscape, 0.67 for 2:3 portrait
  width: number;
  height: number;
  category: string;
  categories?: string[];
  captionTitle?: string;
  alt?: string;
  isUserUploaded?: boolean;
  date?: string;
  description?: string;
  tags?: string[];
}

export interface AlbumCategory {
  id: string;
  slug: string;
  name: string;
  photoCount?: number;
}

export interface GalleryStats {
  totalPhotos: number;
  favoritesCount: number;
  albumName: string;
  clientNames: string;
  weddingDate: string;
  photographerName: string;
  expiresOn: string;
}
