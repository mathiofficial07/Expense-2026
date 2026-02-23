import fetch from 'node-fetch';

const testRegister = async () => {
    const url = 'http://localhost:5000/api/auth/register';
    const body = {
        name: 'Test User',
        email: 'test' + Date.now() + '@example.com',
        password: 'password123'
    };

    try {
        const res = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });

        const data = await res.json();
        console.log('Status:', res.status);
        console.log('Response:', data);
    } catch (err) {
        console.error('Test failed:', err);
    }
};

testRegister();
