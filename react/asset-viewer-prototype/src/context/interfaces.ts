export interface Shoe {
  id: number;
  name: string;
  brand: string;
  image_url: string;
  assets_url: string;
  model_url: string;
  shop_button_url: string;
  order: number;
  date_created: number;
  last_updated: number;
}

export interface PhotoData {
  dataURL: string;
  height: number;
  width: number;
}
