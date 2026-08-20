import type { NextApiRequest, NextApiResponse } from 'next';

type ContactBody = {
    firstName?: string;
    lastName?: string;
    email?: string;
    message?: string;
};

function isValidEmail(value: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<{ error?: string; success?: boolean }>,
) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST');
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { firstName, lastName, email, message } = (req.body || {}) as ContactBody;
    if (!firstName?.trim() || !lastName?.trim() || !email?.trim() || !message?.trim() || !isValidEmail(email)) {
        return res.status(400).json({ error: 'Please provide valid contact details.' });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
        return res.status(500).json({ error: 'Email service is not configured.' });
    }

    const resendResponse = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            from: process.env.CONTACT_FORM_EMAIL || process.env.CONTACT_FROM_EMAIL || 'Shifaa website <onboarding@resend.dev>',
            to: [process.env.recipient],
            reply_to: email.trim(),
            subject: `رسالة تواصل جديدة من ${firstName.trim()} ${lastName.trim()}`,
            text: `الاسم: ${firstName.trim()} ${lastName.trim()}\nالبريد: ${email.trim()}\n\nالرسالة:\n${message.trim()}`,
        }),
    });

    if (!resendResponse.ok) {
        const providerResult = await resendResponse.json().catch(() => null) as { message?: string; name?: string } | null;
        const providerMessage = providerResult?.message || providerResult?.name;
        return res.status(502).json({
            error: providerMessage
                ? `Resend: ${providerMessage}`
                : `خدمة البريد رفضت الرسالة (رمز الخطأ: ${resendResponse.status}).`,
        });
    }

    return res.status(200).json({ success: true });
}
