export type VOTE_ANSWER = {
    value: string;
    count: number;
    id: number;
}

export interface I_VOTE_CONF {
    STORE: {
        GENERAL: {
            USER_NAME: string | null
        }
    }
}