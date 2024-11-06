import bcrypt from "bcrypt";
export const hashPassword = async (password: string) => {
  const saltRounds = 10;
  const hashed = await bcrypt.hash(password, saltRounds);
  return hashed;
};

export const comparePassword = async (password: string, dbPassword: string) => {
  const isPasswordValid = await bcrypt.compare(password, dbPassword);
  return isPasswordValid;
};
