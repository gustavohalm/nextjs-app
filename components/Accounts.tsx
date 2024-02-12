export type AccountProps = {
    id: BigInteger;
    fund: BigInteger;
    userId: BigInteger;
    user: {
      id: BigInteger;
      name: string;
      email: string;
    };
};