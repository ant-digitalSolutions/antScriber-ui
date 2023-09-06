export interface IOpenAiChoice {
    content: IOpenAiMessage;
    index: number;
    finish_reason: 'stop' | string;
}

export interface IOpenAiMessage {
    content: string;

    role: string;
}
