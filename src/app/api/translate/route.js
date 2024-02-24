import { NextResponse } from 'next/server'
import { translate } from '@vitalets/google-translate-api';

export async function POST(req, res) {

    try {

        const { text } = await req.json();
        if (!text) {
            return NextResponse.json({ status: 400, error: 'Invalid request body. Missing "text" key.' });
        }

        const resp = await translate(text, { from: 'en', to: 'fr' });

        return NextResponse.json({ status: 200, translation: resp.text });
    } catch (error) {
        if (error.name === 'TooManyRequestsError') {
            return NextResponse.json({ status: 429, error: 'Your free Quota has been finished! ' });
        }
        console.error(error);
        return NextResponse.json({ status: 500, error: 'Internal Server Error' });
    }
}

export function GET(req, res) {
    return NextResponse.json({ message: "Please make a POST req to this same endpoint from Postman or cUrl" })
}
