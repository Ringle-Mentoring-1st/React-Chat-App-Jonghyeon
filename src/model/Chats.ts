export interface ChatRoom {
  title: string;
  password: string;
  id: string;
}
export interface Chat {
  content: string;
  uid: string;
  createdAt: number;
  id?: string;
  liked: boolean;
}
