export interface creditCard {
    Number: number[];
    CardHolder: string | null;
    ExpMonth: string | null;
    ExpYear: string | null;
    cvv?: string | null;
}
