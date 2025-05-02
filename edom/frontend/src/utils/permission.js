export function can(user, perm) {
    return user?.permissions?.includes(perm);
}