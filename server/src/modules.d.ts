declare namespace NodeJS {
    export interface ProcessEnv {
        MYSQL_DBNAME: string;
        MYSQL_USER: string;
        MYSQL_PASS: string;
        MYSQL_HOST: string;
    }
}