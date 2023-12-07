// http.ts
export default class HTTP {
    static async request(method: string, url: string, data?: any): Promise<any> {
        const headers: HeadersInit = {
            'Content-Type': 'application/json'
        };

        const config: RequestInit = {
            method,
            headers
        };

        if (data) {
            config.body = JSON.stringify(data);
        }

        const response = await fetch(url, config);
        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || 'Erro na requisição');
        }

        return result;
    }
}
