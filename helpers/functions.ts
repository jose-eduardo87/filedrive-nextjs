export const nameValidator = (name: string) => name.trim() !== "";

export const emailValidator = (email: string) =>
  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);

export const passwordValidator = (password: string) => password.length >= 6;

export const roundFileSizeToCorrectUnit = (value: number) => {
  if (value >= 1024000) {
    return `${(value / 1024000).toFixed(2)} MB`;
  } else if (value >= 1024 && value < 1024000) {
    return `${(value / 1024).toFixed(2)} KB`;
  }

  return `${value.toFixed(2)} B`;
};
