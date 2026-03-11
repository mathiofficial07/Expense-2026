import fetch from 'node-fetch';

const checkConnection = async () => {
    const url = 'https://backend-app-c6xh.onrender.com/api/health';
    console.log(`Checking connection to: ${url}`);
    try {
        const res = await fetch(url);
        const data = await res.json();
        console.log('Status:', res.status);
        console.log('Response:', data);
        if (data.status === 'ok') {
            console.log('✅ Connection to production backend successful!');
        } else {
            console.log('❌ Unexpected response from production backend.');
        }
    } catch (err) {
        console.error('❌ Failed to connect to production backend:', err.message);
    }
};

checkConnection();
