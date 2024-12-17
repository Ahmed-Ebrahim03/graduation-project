export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phoneNumber: string;
}

export interface Summary {
  _id: string;
  title: string;
  summary: string;
  questions: [string];
  fileUrl?: string;
  createdAt: string;
  userId: string;
}

// export interface Question {
//   id: string;
//   question: string;
//   summaryId: string;
//   createdAt: string;
// }