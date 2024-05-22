// fetchHistory.js

const fetchHistoryData = async () => {
    try {
        const ra = localStorage.getItem('ra');
        const response = await fetch(
            `http://localhost:8080/pedidos/find-all/${ra}`
        );
        if (response.ok) {
            const data = await response.json();
            console.log('fetch function: ', data);
            return data;
        } else {
            throw new Error('Request failed with status: ' + response.status);
        }
    } catch (error) {
        console.error(error);
        return null;
    }
};

export default fetchHistoryData;
