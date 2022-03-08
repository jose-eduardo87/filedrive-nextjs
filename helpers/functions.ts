export const nameValidator = (name: string) => name.trim() !== "";

export const emailValidator = (email: string) =>
  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);

export const passwordValidator = (password: string) => password.length >= 6;
