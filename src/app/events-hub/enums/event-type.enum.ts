export enum EventType {
  // subscription
  SubscriptionUpdated = 'subscription.updated',
  SubscriptionDeleted = 'subscription.deleted',

  // invoices
  InvoicePaid = 'invoice.payment.paid',
  InvoiceFailed = 'invoice.payment.failed',

  // Words Limits
  WordLimitReached = 'usage.words.limit_reached',
  WordLimitUpdated = 'usage.words.user.limit_updated',
  WordLimitApproaching = 'usage.words.limit_approaching',
  WordLimitMonthlyUsageResetAllUsers = 'usage.words.reset_all_users',

  // authentication
  VerificationCode_Send = 'authentication.send_code',

  // stripe
  StripeIncomingWebhookError = 'stripe.incoming_webhook.error',
  StripeEventHandleError = 'stripe.event_handle.error',

  // Registration
  SignUp = 'signup',

  // notifications
  NotificationNew = 'notifications.new',
}
