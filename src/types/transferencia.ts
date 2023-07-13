export type Transferencia = {
    id: number,
    dataTransferencia: string,
    valor: number,
    tipo: string,
    nomeOperadorTransacao: string
}

export type TransferenciaPage = {
    content?: Transferencia[];
    last: boolean;
    totalPages: number;
    totalElements: number;
    size?: number;
    number: number;
    first: boolean;
    numberOfElements?: number;
    empty?: boolean;
}