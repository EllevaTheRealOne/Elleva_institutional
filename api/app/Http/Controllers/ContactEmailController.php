<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Validation\Rule;
use Throwable;

class ContactEmailController extends Controller
{
    public function send(Request $request): JsonResponse
    {
        // Simple honeypot. Never send mail if a bot fills the hidden field.
        if (trim((string) $request->input('website', '')) !== '') {
            return response()->json([
                'success' => true,
                'message' => 'Your message has been received.',
            ]);
        }

        $validated = $request->validate([
            'name' => ['required', 'string', 'min:2', 'max:100', 'not_regex:/[\r\n]/'],
            'email' => ['required', 'string', 'email:rfc', 'max:254'],
            'topic' => ['required', 'string', Rule::in([
                'general', 'business', 'institutional', 'privacy', 'support', 'account',
            ])],
            'message' => ['required', 'string', 'min:5', 'max:5000'],
            'website' => ['nullable', 'string', 'max:200'],
        ]);

        $subjects = [
            'general' => 'General inquiry',
            'business' => 'Business / Partnership inquiry',
            'institutional' => 'Institutional inquiry',
            'privacy' => 'Privacy / Legal inquiry',
            'support' => 'Platform support request',
            'account' => 'Account / Access request',
        ];

        $isSupport = in_array($validated['topic'], ['support', 'account'], true);
        $recipient = $isSupport
            ? (string) config('services.elleva_mail.support_email', 'support@elleva.me')
            : (string) config('services.elleva_mail.contact_email', 'contact@elleva.me');

        $subject = '[Elleva Website] ' . $subjects[$validated['topic']];
        $body = "New message submitted through the Elleva website contact form.\n\n"
            . 'Name: ' . $validated['name'] . "\n"
            . 'Email: ' . $validated['email'] . "\n"
            . 'Topic: ' . $subjects[$validated['topic']] . "\n\n"
            . "Message:\n" . $validated['message'] . "\n";

        try {
            Mail::raw($body, function ($mail) use ($recipient, $subject, $validated): void {
                $mail->to($recipient)
                    ->replyTo($validated['email'], $validated['name'])
                    ->subject($subject);
            });
        } catch (Throwable $exception) {
            report($exception);

            return response()->json([
                'success' => false,
                'message' => 'We could not send your message right now. Please try again later.',
            ], 500);
        }

        return response()->json([
            'success' => true,
            'message' => 'Your message has been sent successfully.',
        ]);
    }
}
