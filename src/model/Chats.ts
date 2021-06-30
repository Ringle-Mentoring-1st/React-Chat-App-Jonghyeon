export interface ChatRoom {
  title: string;
  password: string;
  id: string;
}
export interface Chat {
  content: string;
  uidOfUser: string;
  createdAt: number;
  id?: string;
}
