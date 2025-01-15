export interface User {
  id?: string;
  first_name: string;
  last_name: string;
  full_name: string;
  name: string;
  email: string;
  password: string;
  image_url: string;
  file?: Blob | File;
}
