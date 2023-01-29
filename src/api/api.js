const BASE_URL = 'http://localhost:8080/math/examples';
export const ExamplesApi = {
    getExamplesByCount(count) {
        const url = BASE_URL + "?count=" + count;
        return fetch(url, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .catch(error => alert(error))
    }
}