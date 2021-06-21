interface UserProfile {
  profilePic: string;
  name: string;
  phoneNumber: string;
}
interface ContactList {
  email: string;
  name: string;
  picUrl?: string;
}

interface Message {
  createdAt: number;
  displayName: string;
  email: string;
  photoURL: string;
  text: string;
  userUID: string;
}

interface Preview {
  end: number;
  href: string;
  isLink: boolean;
  start: number;
  type: string;
  value: string;
}

export { UserProfile, ContactList, Preview };
