export interface ChatRoom {
  title: string;
  password: string;
  id: string;
  createdAt: number;
  creator: string;
  authenticatedPeople: string[];
}
export interface Chat {
  content: string;
  uid: string;
  createdAt: number;
  id?: string;
  liked: boolean;
  emojis: { [key: string]: { [uid: string]: boolean } };
}

export interface LivePerson {
  nickName: string;
  uid: string;
  liveAt: number;
}
