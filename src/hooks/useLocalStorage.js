export function useLocalStorage() {
    const check = (key) => {
        return !!localStorage.getItem(key);
    }

    const get = (key) => {
        if (check(key)) {
            return JSON.parse(localStorage.getItem(key))
        }
    }

    const set = (key, value) => {
        localStorage.setItem(key, JSON.stringify(value));
    }

    return {
        get, set, check,
    }
}