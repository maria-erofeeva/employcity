export interface IProduct {
  C: number;
  G: number;
  T: number;
  P: number;
}

export interface ICart {
  [productId: string]: number;
}

export interface IGroup {
  G: string;
  B: {
    [key: string]: {
      N: string;
      T: number;
    };
  };
}
