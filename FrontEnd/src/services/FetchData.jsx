const fetchData = async (url, method = 'GET', data = null) => {
    try {
        const options = {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
        };

        if (data) {
            options.body = JSON.stringify(data);
        }

        const response = await fetch(url, options);

        if (!response.ok) {
            let errorMessage = 'Something went wrong!';
            try {
                // Attempt to parse JSON error message
                const errorData = await response.json();
                errorMessage = errorData.message || errorMessage;
            } catch (jsonError) {
                // If parsing JSON fails, use text response
                errorMessage = await response.text() || errorMessage;
            }
            throw new Error(errorMessage);
        }

        try {
            return await response.json();
        } catch (jsonError) {
            // If response is not JSON, handle as text
            const text = await response.text();
            console.warn('Response is not JSON:', text);
            return text;
        }

    } catch (error) {
        console.error('Fetch error:', error.message);
        throw error;
    }
};

export default fetchData;
