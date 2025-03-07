export interface IMail {
    payload: any;
    to: string;
    subject: string;
    template: string;
    html?: string;
};