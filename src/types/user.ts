export interface User {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    is_active: boolean;
}

export interface NestedUser {
    user_id: string;
    user_first_name: string;
    user_last_name: string;
}
