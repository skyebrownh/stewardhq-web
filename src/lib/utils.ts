export const getCurrentMonthAndYear = () => {
    const now = new Date();
    return {
        month: now.getMonth() + 1,
        year: now.getFullYear()
    };
};

export const capitalizeString = (str: string) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
