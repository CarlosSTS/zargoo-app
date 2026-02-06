type StatusVehicle = 'APPROVED' | 'PENDING' | 'REJECTED';

export interface Driver {
  id: number;
  user_id: number;
  cnh: string;
  cnh_img_url: string;
  latitude: number | null;
  longitude: number | null;
  is_available: boolean;
  category: string | null;
  city: string;
  state: string;
  status: StatusVehicle;
  status_message: string | null;
  is_active: boolean;
  wallet_id: number | null;
  deleted_at: string | null;
}
