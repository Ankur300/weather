export default async location => {
    try {
        const result = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=d4f917a04f8fa1efe6d3ee84a16bda39`,
        );

        if (result.status === 200) {
            return { success: true, data: await result.json() };
        }

        return { success: false, error: result.statusText };
    } catch (ex) {
        return { success: false, error: ex.message };
    }
};
