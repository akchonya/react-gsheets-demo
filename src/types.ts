interface Item {
  name: string;
  category: string;
  photo: string;
  description: string;
  price: number;
}

interface GoogleSheetResponse {
  table: {
    rows: {
      c: Array<{
        v: string | number | null;
      }>;
    }[];
  };
}

export type { Item, GoogleSheetResponse }; 