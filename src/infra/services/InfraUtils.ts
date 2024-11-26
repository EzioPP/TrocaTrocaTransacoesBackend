export function isNumber(str: string): boolean {
    return !isNaN(Number(str));
}

export function isEmail(email: string) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
}
