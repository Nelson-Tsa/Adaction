// user.model.ts

export class User {
  id?: number | null;
  username?: string | null;
  email?: string | null;

  constructor(init?: Partial<User>) {
    Object.assign(this, init);
  }
}
